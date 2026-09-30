// Cloudflare Image Transformations resize on request. Requires Transformations enabled on the zone,
// so it's opt-in via VITE_IMAGE_CDN=cloudflare; otherwise images are served as uploaded.
const CDN_ENABLED = import.meta.env.VITE_IMAGE_CDN === 'cloudflare';

const WIDTHS = [480, 768, 1080, 1440, 1920, 2560];

function cdnUrl(src: string, width: number) {
  return `/cdn-cgi/image/width=${width},quality=80,format=auto,fit=scale-down${src}`;
}

export function responsiveImage(src: string) {
  if (!CDN_ENABLED || !src.startsWith('/')) return { src };
  return {
    src: cdnUrl(src, 1440),
    srcSet: WIDTHS.map((w) => `${cdnUrl(src, w)} ${w}w`).join(', '),
  };
}
