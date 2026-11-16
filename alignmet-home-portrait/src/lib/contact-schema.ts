import { z } from "zod";

export const contactTopics = ["General question", "Report abuse or harassment", "Safety concern", "Media and press", "Partnerships and business", "Account help", "Orders and refunds", "Seller support", "Privacy or data request", "Legal", "Accessibility", "Report a bug", "Feedback"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  topic: z.enum(contactTopics),
  message: z.string().trim().min(1).max(5000),
}).strict();

export const inboxUrl = "https://plainhand.com/api/public/alignmet-inbox";

export async function forwardContact(data: z.infer<typeof contactSchema>, secret: string | undefined, send: typeof fetch = fetch) {
  const validated = contactSchema.parse(data);
  if (!secret) return { ok: false, error: "Contact delivery is not available yet. Please try again later." };
  try {
    const response = await send(inboxUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-inbox-secret": secret },
      body: JSON.stringify(validated),
      signal: AbortSignal.timeout(15000),
      redirect: "error",
    });
    if (!response.ok) return { ok: false, error: "Your message was not sent. Please try again later." };
    const result = await response.json();
    if (result?.ok !== true) return { ok: false, error: "Your message was not sent. Please try again later." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Your message was not sent. Please try again later." };
  }
}