# Bunny Storage Hosting Implementation Plan

> **For agentic workers:** Execute inline using superpowers:executing-plans.

**Goal:** Upload the entire static site to Bunny Storage and serve through Bunny CDN.

**Architecture:** Use Bunny CLI static sites for Storage, CDN, immutable releases,
cache purges, and rollback. Keep rsync deployment available for the existing server.

**Tech Stack:** Astro, npm, Bunny CLI 0.22.0.

**Spec:** User selected uploading `dist/` to Bunny Storage so cache misses do not
depend on the current server. Test the Bunny endpoint before changing public DNS.

## Constraints and review focus

- Preserve `SITE_URL=stefkorporaal.is` and existing server deployment.
- Use static routing; verify a recipe route and a missing route.
- Upload all generated assets; compare deployed responses with the local build.
- Do not put credentials in source control.
- Keep wildcard subdomain and mail DNS records intact.

## Tasks

- [x] Add `bunny.jsonc`, npm deployment command, local link ignore, and documentation.
- [x] Build with `npm run build`; inspect output and validate configuration.
- [x] Provision `stefkorporaal` in DE and deploy `dist/` using Bunny CLI.
- [x] Verify HTTPS, homepage, nested recipe route, assets, and missing routes.
- [x] Attach production hostname and TLS after verification; check DNS and responses.
- [x] Review diff and report deployment URL and any unfinished cutover steps.

## Verification and operational notes

- `npm run deploy:bunny` succeeded from `/tmp/skorporaal-bunny.314ED7`,
  building 66 pages and publishing 202 files (3,629,133 bytes).
- Live release: `7e1fb0b7a46a`; Storage `2078748`, pull zone `7067512`.
- HTTPS production-hostname checks at Bunny matched local HTML, recipe,
  JPEG, and CSS bytes; missing route returned 404; HTML returned cache HIT.
- Google public DNS returned Bunny's address. The local resolver still held
  the previous origin address during verification, so final checks used
  Bunny's IP with the production hostname and full TLS verification.
- Apex A record `19439695` was replaced with PullZone record `36369697`
  (TTL 300); wildcard and mail records were preserved. The API does not
  support changing an existing record's type in place.
- Existing generated `dist/` and `node_modules/.astro/` are owned by
  `nobody`, blocking local builds. No permissions were changed; a temporary
  copy was used. README includes the one-time ownership repair command.
- Independent review found no correctness issues; `git diff --check` passed.
- Source changes remain uncommitted. No Caddy configuration changes needed.
