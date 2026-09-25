import { access, readFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("out");
const siteUrl = "https://elenskibalkandzii-client.onrender.com";

const pages = [
  {
    route: "/",
    canonical: "/",
    bg: "/",
    en: "/en",
    title: "Еленски Балканджии | Месо и мезета",
    description: "Еленски Балканджии — магазин за месо, мезета и традиционни български вкусове.",
    image: "elenski-balkandzhii-traditional-products.jpg",
    schema: ["Organization", "WebSite"],
  },
  {
    route: "/products",
    canonical: "/products",
    bg: "/products",
    en: "/en/products",
    title: "Продукти | Еленски Балканджии",
    description: "Разгледайте продуктите на Еленски Балканджии — месо, мезета, сушени деликатеси и сирена с традиционен български вкус.",
    image: "elenski-balkandzhii-traditional-products.jpg",
    schema: ["Organization", "WebSite", "BreadcrumbList"],
  },
  {
    route: "/about",
    canonical: "/about",
    bg: "/about",
    en: "/en/about",
    title: "За нас | Еленски Балканджии",
    description: "Научете повече за Еленски Балканджии — продукти от Еленския Балкан, приготвени с българско месо и натурални подправки.",
    image: "elenski-balkandzhii-traditional-products.jpg",
    schema: ["Organization", "WebSite", "BreadcrumbList"],
  },
  {
    route: "/contact",
    canonical: "/contact",
    bg: "/contact",
    en: "/en/contact",
    title: "Контакти | Еленски Балканджии",
    description: "Контакти и работно време на магазин Еленски Балканджии в Русе — адрес, телефон и информация за посещение.",
    image: "elenski-balkandzhii-store-ruse.jpg",
    schema: ["Organization", "WebSite", "BreadcrumbList", "LocalBusiness"],
  },
  {
    route: "/en",
    canonical: "/en",
    bg: "/",
    en: "/en",
    title: "Elenski Balkandzhii | Meat and Delicacies",
    description: "Elenski Balkandzhii — meat, delicacies, cheese and traditional Bulgarian flavours.",
    image: "elenski-balkandzhii-traditional-products.jpg",
    schema: ["Organization", "WebSite"],
  },
  {
    route: "/en/products",
    canonical: "/en/products",
    bg: "/products",
    en: "/en/products",
    title: "Products | Elenski Balkandzhii",
    description: "Explore Elenski Balkandzhii products — meat, dried delicacies and cheese with traditional Bulgarian flavour.",
    image: "elenski-balkandzhii-traditional-products.jpg",
    schema: ["Organization", "WebSite", "BreadcrumbList"],
  },
  {
    route: "/en/about",
    canonical: "/en/about",
    bg: "/about",
    en: "/en/about",
    title: "About us | Elenski Balkandzhii",
    description: "Learn more about Elenski Balkandzhii — products from the Elena Balkan region made with Bulgarian meat and natural spices.",
    image: "elenski-balkandzhii-traditional-products.jpg",
    schema: ["Organization", "WebSite", "BreadcrumbList"],
  },
  {
    route: "/en/contact",
    canonical: "/en/contact",
    bg: "/contact",
    en: "/en/contact",
    title: "Contacts | Elenski Balkandzhii",
    description: "Contact details and opening hours for the Elenski Balkandzhii store in Ruse, Bulgaria.",
    image: "elenski-balkandzhii-store-ruse.jpg",
    schema: ["Organization", "WebSite", "BreadcrumbList", "LocalBusiness"],
  },
];

const toAbsolute = (route) => route === "/" ? siteUrl : `${siteUrl}${route}`;

async function firstExisting(candidates) {
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next static-export shape.
    }
  }

  throw new Error(`Missing exported file. Tried: ${candidates.join(", ")}`);
}

async function readRouteHtml(route) {
  if (route === "/") {
    return readFile(await firstExisting([path.join(outDir, "index.html")]), "utf8");
  }

  const clean = route.replace(/^\//, "");
  const file = await firstExisting([
    path.join(outDir, `${clean}.html`),
    path.join(outDir, clean, "index.html"),
  ]);

  return readFile(file, "utf8");
}

function getAttributes(tag) {
  const attributes = {};
  const pattern = /([:\w-]+)=["']([^"']*)["']/g;
  let match;

  while ((match = pattern.exec(tag))) {
    attributes[match[1].toLowerCase()] = match[2];
  }

  return attributes;
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
}

function findLink(html, predicate) {
  for (const tag of getTags(html, "link")) {
    const attrs = getAttributes(tag);
    if (predicate(attrs)) return attrs;
  }

  return null;
}

function findMeta(html, predicate) {
  for (const tag of getTags(html, "meta")) {
    const attrs = getAttributes(tag);
    if (predicate(attrs)) return attrs;
  }

  return null;
}

function getTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? null;
}

function getJsonLd(html) {
  const documents = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    try {
      documents.push(JSON.parse(match[1]));
    } catch (error) {
      throw new Error(`Invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return documents;
}

function flattenSchema(documents) {
  const entities = [];

  for (const document of documents) {
    if (Array.isArray(document)) {
      entities.push(...document);
      continue;
    }

    entities.push(document);

    if (Array.isArray(document?.["@graph"])) {
      entities.push(...document["@graph"]);
    }
  }

  return entities;
}

function hasSchemaType(entities, type) {
  return entities.some((entity) => {
    const value = entity?.["@type"];
    return Array.isArray(value) ? value.includes(type) : value === type;
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const page of pages) {
  const html = await readRouteHtml(page.route);

  assert(getTitle(html) === page.title, `${page.route}: title mismatch`);

  const description = findMeta(html, (attrs) => attrs.name === "description");
  assert(description?.content === page.description, `${page.route}: meta description mismatch`);

  const canonical = findLink(html, (attrs) => attrs.rel === "canonical");
  assert(canonical, `${page.route}: canonical link is missing`);
  assert(
    canonical.href === toAbsolute(page.canonical),
    `${page.route}: expected canonical ${toAbsolute(page.canonical)}, got ${canonical.href}`,
  );

  for (const [language, route] of Object.entries({
    "bg-BG": page.bg,
    en: page.en,
    "x-default": page.bg,
  })) {
    const alternate = findLink(
      html,
      (attrs) => attrs.rel === "alternate" && attrs.hreflang === language,
    );

    assert(alternate, `${page.route}: missing hreflang ${language}`);
    assert(
      alternate.href === toAbsolute(route),
      `${page.route}: hreflang ${language} expected ${toAbsolute(route)}, got ${alternate.href}`,
    );
  }

  const robots = findMeta(html, (attrs) => attrs.name === "robots");
  if (robots) {
    assert(
      !robots.content.toLowerCase().includes("noindex"),
      `${page.route}: public page unexpectedly contains noindex`,
    );
  }

  const ogTitle = findMeta(html, (attrs) => attrs.property === "og:title");
  const ogDescription = findMeta(html, (attrs) => attrs.property === "og:description");
  const ogUrl = findMeta(html, (attrs) => attrs.property === "og:url");
  const ogImage = findMeta(html, (attrs) => attrs.property === "og:image");

  assert(ogTitle?.content === page.title, `${page.route}: Open Graph title mismatch`);
  assert(ogDescription?.content === page.description, `${page.route}: Open Graph description mismatch`);
  assert(ogUrl?.content === toAbsolute(page.canonical), `${page.route}: Open Graph URL mismatch`);
  assert(ogImage?.content?.includes(page.image), `${page.route}: Open Graph image mismatch`);

  const twitterCard = findMeta(html, (attrs) => attrs.name === "twitter:card");
  const twitterTitle = findMeta(html, (attrs) => attrs.name === "twitter:title");
  const twitterDescription = findMeta(html, (attrs) => attrs.name === "twitter:description");
  const twitterImage = findMeta(html, (attrs) => attrs.name === "twitter:image");

  assert(twitterCard?.content === "summary_large_image", `${page.route}: Twitter card type mismatch`);
  assert(twitterTitle?.content === page.title, `${page.route}: Twitter title mismatch`);
  assert(twitterDescription?.content === page.description, `${page.route}: Twitter description mismatch`);
  assert(twitterImage?.content?.includes(page.image), `${page.route}: Twitter image mismatch`);

  const schemaDocuments = getJsonLd(html);
  assert(schemaDocuments.length > 0, `${page.route}: JSON-LD is missing`);
  const schemaEntities = flattenSchema(schemaDocuments);

  for (const type of page.schema) {
    assert(hasSchemaType(schemaEntities, type), `${page.route}: missing JSON-LD type ${type}`);
  }

  if (page.schema.includes("LocalBusiness")) {
    const business = schemaEntities.find((entity) => entity?.["@type"] === "LocalBusiness");
    assert(
      business?.["@id"] === `${siteUrl}/contact#store`,
      `${page.route}: LocalBusiness must use the shared store @id`,
    );
    assert(business?.telephone === "+359878788897", `${page.route}: LocalBusiness telephone mismatch`);
    assert(business?.address?.postalCode === "7012", `${page.route}: LocalBusiness postal code mismatch`);
    assert(business?.address?.addressCountry === "BG", `${page.route}: LocalBusiness country mismatch`);
  }
}

const legacyHtml = await readRouteHtml("/project");
const legacyCanonical = findLink(legacyHtml, (attrs) => attrs.rel === "canonical");
assert(
  legacyCanonical?.href === toAbsolute("/products"),
  `/project: canonical must point to ${toAbsolute("/products")}`,
);

const legacyRobots = findMeta(legacyHtml, (attrs) => attrs.name === "robots");
assert(legacyRobots, "/project: robots meta is missing");
assert(
  legacyRobots.content.toLowerCase().includes("noindex"),
  "/project: legacy page must remain noindex",
);

const robotsText = await readFile(path.join(outDir, "robots.txt"), "utf8");
assert(
  robotsText.includes("Sitemap: https://elenskibalkandzii-client.onrender.com/sitemap.xml"),
  "robots.txt: sitemap declaration is missing",
);

const sitemap = await readFile(path.join(outDir, "sitemap.xml"), "utf8");
for (const page of pages) {
  assert(
    sitemap.includes(toAbsolute(page.route)),
    `sitemap.xml: missing ${toAbsolute(page.route)}`,
  );
}

console.log(
  `SEO QA passed: ${pages.length} public routes validated for metadata, social cards, hreflang, JSON-LD, sitemap and legacy noindex.`,
);
