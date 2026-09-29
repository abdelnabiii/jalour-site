import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // The investor dashboard/tool route handlers read these HTML files at
  // runtime via process.cwd(). That read isn't statically analyzable, so on
  // Vercel's serverless tracer the files would be left out of the function
  // bundle and the routes would 500. Force them into the trace.
  outputFileTracingIncludes: {
    "/investor/dashboard": ["./src/content/nurv-dashboard.html"],
    "/investor/tool": ["./src/content/nurv-investor-tool.html"],
  },
};

export default nextConfig;
