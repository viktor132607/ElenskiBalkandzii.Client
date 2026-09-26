# ElenskiBalkandzii.Client

Next.js frontend for Elenski Balkandzii.

Admin login: `/adminlogin` (no public navigation link). After the API validates the password, it opens `/site-control`; without a valid session, the editor redirects back to `/adminlogin`. Set `NEXT_PUBLIC_API_URL` to the HTTPS origin of the API at build time in the Render static service. The API password must be configured on the API service; no password is stored in the client. Changes are saved in PostgreSQL and loaded by public pages on refresh. Because this is a static export, SEO metadata and structured data are generated at build time and are not editable through this panel.

The panel edits BG/EN page copy, catalog categories and products, contact information, opening hours and site images. Admins can add, reorder, hide and delete categories and products, edit descriptions, and upload JPEG, PNG or WebP images up to 5 MB to PostgreSQL. Uploading a new image requires a subsequent save to publish it. The assortment has no cart, checkout or online ordering.
