import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const html = readFileSync("public/alignmet.html", "utf8");
const clause = html.match(/<h3>Governing Law<\/h3><p>(.*?)<\/p>/)?.[1];

describe("Terms jurisdiction", () => {
  it("uses Florida governing law", () => {
    expect(clause).toContain("governed by the laws of Florida");
  });
  it("uses Florida courts for disputes", () => {
    expect(clause).toContain("resolved in the courts of Florida");
  });
});