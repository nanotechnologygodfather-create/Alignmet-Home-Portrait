import { describe, expect, it, vi } from "vitest";
import { contactSchema, forwardContact } from "@/lib/contact-schema";

const message = { name: "Test Sender", email: "test@example.com", topic: "General question" as const, message: "Inbox integration test" };

describe("PlainHand contact forwarding", () => {
  it("forwards validated messages to the requested portal with server authentication", async () => {
    const send = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    expect(await forwardContact(message, "test-only-secret", send)).toEqual({ ok: true });
    expect(send).toHaveBeenCalledWith("https://plainhand.com/api/public/alignmet-inbox", expect.objectContaining({ method: "POST", headers: { "Content-Type": "application/json", "x-inbox-secret": "test-only-secret" }, body: JSON.stringify(message) }));
  });
  it("does not send without the shared secret", async () => {
    const send = vi.fn();
    expect((await forwardContact(message, undefined, send)).ok).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });
  it("does not report success for a rejected inbox request", async () => {
    const send = vi.fn().mockResolvedValue(new Response("Unauthorized", { status: 401 }));
    expect((await forwardContact(message, "test-only-secret", send)).ok).toBe(false);
  });
  it("rejects invalid input and unrecognized topics", () => {
    expect(contactSchema.safeParse({ ...message, email: "invalid" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...message, topic: "unknown" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...message, message: "x".repeat(5001) }).success).toBe(false);
  });
});