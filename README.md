# ElenskiBalkandzii.Client

Next.js frontend for Elenski Balkandzii.

Admin page: `/site-control` (no public navigation link). Set `NEXT_PUBLIC_API_URL` to the HTTPS origin of the API at build time in the Render static service. The page requires a password configured on the API; a URL alone grants no write access. Changes are saved in PostgreSQL and loaded by public pages on refresh. Because this is a static export, SEO metadata and structured data are generated at build time and are not editable through this panel.

The panel edits BG/EN page copy, product categories and items, contact information, opening hours and three site images. Images can be uploaded as JPEG, PNG or WebP up to 5 MB and are stored in PostgreSQL. Uploading a new image requires a subsequent save to publish it.
