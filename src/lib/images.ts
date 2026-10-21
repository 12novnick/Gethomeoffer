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

// Intrinsic sizes of files in public/images, so every <img> reserves its space before loading.
export const IMAGE_SIZES: Record<string, { width: number; height: number }> = {
  '/images/hero-home.avif': { width: 4104, height: 2736 },
  '/images/situation-relocation.avif': { width: 2475, height: 3713 },
  '/images/program-cash.jpg': { width: 474, height: 1024 },
  '/images/program-agent.avif': { width: 3000, height: 4500 },
  '/images/founder-portrait.jpg': { width: 1024, height: 1024 },
  '/images/we-buy-houses-milwaukee.avif': { width: 4032, height: 2268 },
  '/images/kitchen-fixer-upper.jpg': { width: 960, height: 576 },
  '/images/kitchen-dated.jpg': { width: 960, height: 576 },
  '/images/kitchen-standard.jpg': { width: 960, height: 576 },
  '/images/kitchen-high-end.jpg': { width: 960, height: 576 },
  '/images/kitchen-luxury.jpg': { width: 960, height: 576 },
  '/images/bathroom-fixer-upper.jpg': { width: 960, height: 576 },
  '/images/bathroom-dated.jpg': { width: 960, height: 576 },
  '/images/bathroom-standard.jpg': { width: 960, height: 576 },
  '/images/bathroom-high-end.jpg': { width: 960, height: 576 },
  '/images/bathroom-luxury.jpg': { width: 960, height: 576 },
  '/images/number1-badge.png': { width: 584, height: 427 },
};
