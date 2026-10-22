# ADR-0008: Cloudflare R2 for media and private documents

- Status: Accepted · Date: 2026-10-20

## Context
The site is image- and video-heavy (Himalayan photography, drone footage, 3D terrain tiles). The portal (Phase 3) stores sensitive traveler documents such as passport scans, insurance and permits. We want no egress fees and an S3-compatible API for portability.

## Decision
- Two buckets per environment:
  - **`ok-media`**: public assets. Served through a custom domain `media.outdoorking.com` (Cloudflare cache, `Cache-Control: public, max-age=31536000, immutable`, content-hashed keys).
  - **`ok-private`**: traveler documents. No public access. Uploads and downloads use **presigned URLs** with a 5-minute TTL, issued only after the `can()` RBAC check, and every access is audit-logged.
- Payload integration: **`@payloadcms/storage-s3`** with the R2 S3 endpoint, `region: 'auto'`, `forcePathStyle: true`, `generateFileURL` built from `R2_PUBLIC_URL`, and `clientUploads: true` (avoids Vercel's 4.5 MB body limit). R2 CORS allows `PUT` from site origins with `If-None-Match`. `@payloadcms/storage-r2` is not used because it targets Workers bindings only.
- Uploads: MIME sniffing and allowlist (jpeg/png/webp/avif/pdf, plus mp4 for staff), 25 MB per image, 10 MB per document, EXIF/GPS stripped from public images via `sharp`. Private documents are malware-scanned (ClamAV container or a Cloudflare scanner, Phase 3) before they become visible to staff.
- Private documents also get **application-level envelope encryption** before upload (see [security.md](../security.md)). R2's at-rest encryption is not considered sufficient for passport scans.
- Video: Cloudflare Stream or Mux is deferred. Phase 1 uses short MP4/WebM loops in `ok-media` with poster images.
- Local dev uses MinIO in docker-compose with the same S3 API.
- Lifecycle: `ok-private` objects are deleted 24 months after trip end unless legal retention applies (GDPR storage limitation). Deletion is driven by the retention job.

## Consequences
- \+ Zero egress, cheap storage, S3 portability (the self-hosted path is MinIO or any S3).
- − Two image pipelines (Next image optimizer and pre-generated Payload sizes). Use Payload `imageSizes` for art-directed crops and `next/image` for responsive delivery.
