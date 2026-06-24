import type { MetadataRoute } from "next";
import { getAllTemplates } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

// Canonical host — the www subdomain. Emitting absolute www URLs here means
// search engines crawl them directly instead of hitting the apex → www 301.
const BASE_URL = "https://www.pixelia.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/ai",
    "/pricing",
    "/templates",
    "/blog",
    "/contact",
    "/quote",
    "/faq",
    "/privacy",
    "/terms",
    "/accessibility",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/ai" ? 0.8 : 0.7,
  }));

  const templateRoutes = getAllTemplates().map((template) => ({
    url: `${BASE_URL}/templates/${template.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...templateRoutes, ...blogRoutes];
}
