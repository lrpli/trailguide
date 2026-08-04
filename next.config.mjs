import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    // Trail stops carry audio/images that visitors need once out of cell range.
    runtimeCaching: [
      {
        urlPattern: /\/media\/.*$/,
        handler: "CacheFirst",
        options: {
          cacheName: "trail-media",
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 90 },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
