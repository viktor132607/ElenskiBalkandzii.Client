import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("out");
const siteUrl = "https://elenskibalkandzii-client.onrender.com";

const pages = [
  { route: "/", canonical: "/", bg: "/", en: "/en" },
  { route: "/products", canonical: "/products", bg: "/products", en: "/en/products" },
  { route: "/about", canonical: "/about", bg: "/about", en: "/en/about" },
  { route: "/contact", canonical: "/contact", bg: "/contact", en: "/en/contact" },
  { route: "/en", canonical: "/en", bg: "/", en: "/en" },
  { route: "/en/products", canonical: "/en/products", bg: "/products", en: "/en/products" },
  { route: "/en/about", canonical: "/en/about", bg: "/about", en: "/en/about" },
  { route: "/en/contact", canonical: "/en/contact", bg: "/contact", en: "/en/contact" },
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

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const page of pages) {
  const html = await readRouteHtml(page.route);

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

console.log(`SEO regression check passed for ${pages.length} public routes plus /project.`);
