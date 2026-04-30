import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://fenrir.github.io/sitemap-index.xml`,
    { headers: { 'Content-Type': 'text/plain' } },
  )
}
