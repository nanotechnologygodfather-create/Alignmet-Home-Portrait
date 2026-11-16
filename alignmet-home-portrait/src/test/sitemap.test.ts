import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";

describe("Public sitemap", () => {
  it("includes the homepage and public SMS consent page but not the sitemap endpoint", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(sitemapStaticPaths(router)).toEqual(["/", "/sms-opt-in"]);
  });

  it("uses the public domain without invented modification dates", () => {
    const xml = sitemapXML("https://alignmet.com", [{ path: "/" }, { path: "/sms-opt-in" }]);
    expect(xml).toContain("<loc>https://alignmet.com/sms-opt-in</loc>");
    expect(xml).not.toContain("<lastmod>");
  });
});