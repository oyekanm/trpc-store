/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "utfs.io",
            port: "",
            // pathname: '/account123/**',
          },
        ],
      },
};
// "https://utfs.io/f/9ac760e7-6b4c-46a3-be86-f09ccbc4ca3f-jcmsnq.jpg"

export default config;

