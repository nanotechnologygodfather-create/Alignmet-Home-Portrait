import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef } from "react";
import { contactSchema } from "@/lib/contact-schema";
import { submitContact } from "@/lib/contact.functions";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "AlignMet — Find conversation partners across distance and language" },
      { name: "description", content: "AlignMet helps adults find conversation partners whose needs, skills and interests complement their own, with mutual opt-in and translated conversations." },
      { property: "og:title", content: "AlignMet — Find conversation partners across distance and language" },
      { property: "og:description", content: "Describe what you need or can offer. Explore AlignMet’s mutually accepted matches, translated conversations and interest-based groups for adults." },
      { property: "og:url", content: "https://alignmet.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://alignmet.com/" }],
  }),
  component: Index,
});

function Index() {
  const frame = useRef<HTMLIFrameElement>(null);
  const sendContact = useServerFn(submitContact);
  useEffect(() => {
    if (frame.current && window.location.hash) {
      frame.current.src = `/alignmet.html${window.location.hash}`;
    }
  }, []);
  useEffect(() => {
    let sending = false;
    const receive = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.type !== "alignmet-contact-submit") return;
      if (sending) return;
      const parsed = contactSchema.safeParse(event.data.payload);
      const reply = (result: { ok: boolean; error?: string }) => frame.current?.contentWindow?.postMessage({ type: "alignmet-contact-result", ...result }, window.location.origin);
      if (!parsed.success) { reply({ ok: false, error: "Please check your name, email, topic and message." }); return; }
      sending = true;
      try { reply(await sendContact({ data: parsed.data })); }
      catch { reply({ ok: false, error: "Your message was not sent. Please try again later." }); }
      finally { sending = false; }
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [sendContact]);
  return (
    <iframe
      ref={frame}
      src="/alignmet.html"
      title="AlignMet"
      className="fixed inset-0 h-screen w-screen border-0"
    />
  );
}
