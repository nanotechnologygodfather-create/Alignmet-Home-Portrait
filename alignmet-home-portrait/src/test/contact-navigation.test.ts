import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

const html = readFileSync("public/alignmet.html", "utf8");
const script = html.match(/<script id="standalone-navigation">([\s\S]*?)<\/script>/)?.[1];
if (!script) throw new Error("Standalone navigation script missing");

describe("Direct legal-page navigation", () => {
  it.each(["#privacy", "#terms", "#contact"])("opens %s through the contact-enabled wrapper before input", (hash) => {
    const window: { parent?: unknown } = {};
    window.parent = window;
    const replace = vi.fn();
    runInNewContext(script, { window, location: { search: "", hash, replace } });
    expect(replace).toHaveBeenCalledWith(`/${hash}`);
  });

  it("does not redirect the embedded website", () => {
    const replace = vi.fn();
    runInNewContext(script, { window: { parent: {} }, location: { search: "", hash: "#contact", replace } });
    expect(replace).not.toHaveBeenCalled();
  });
});