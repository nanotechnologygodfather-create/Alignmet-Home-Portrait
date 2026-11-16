import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const title = "SMS consent — AlignMet | PlainHand LLC";
const description = "How users consent to AlignMet verification codes and account notifications. AlignMet, a product of PlainHand LLC.";

export const Route = createFileRoute("/sms-opt-in")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://alignmet.com/sms-opt-in" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "canonical", href: "https://alignmet.com/sms-opt-in" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500&display=swap" },
    ],
  }),
  component: SmsOptIn,
});

function SmsOptIn() {
  return (
    <div className="sms-consent min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-6 border-b border-border px-6 py-7 sm:px-10">
        <Link to="/" className="sms-serif text-2xl font-medium">AlignMet</Link>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft size={16} aria-hidden="true" /> Home
        </Link>
      </header>
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:px-10 sm:pt-24">
        <p className="text-sm text-muted-foreground">AlignMet, a product of PlainHand LLC</p>
        <h1 className="sms-serif mt-5 text-5xl font-light leading-tight sm:text-6xl">SMS consent</h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Verification codes and account notifications from AlignMet, operated by PlainHand LLC.
        </p>
        <div className="mt-14 grid gap-12 border-t border-border pt-10 sm:grid-cols-[1fr_2fr]">
          <h2 className="sms-serif text-3xl font-light">How you opt in</h2>
          <div className="space-y-5 text-base leading-8">
            <p>In the AlignMet app, you enter your phone number and review the SMS consent notice displayed beside the phone-number submission. By submitting your number with that notice, you agree to receive verification codes and account notifications from AlignMet.</p>
            <p className="text-muted-foreground">Consent is given inside the app. Visiting this page does not enroll you in texts, and this page does not collect your phone number.</p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 border-t border-border pt-10 sm:grid-cols-[1fr_2fr]">
          <h2 className="sms-serif text-3xl font-light">Messages you receive</h2>
          <div className="space-y-5 text-base leading-8">
            <p>SMS messages relate to phone verification and your AlignMet account. Message frequency varies with your verification requests and account activity.</p>
            <p>Message and data rates may apply.</p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 border-t border-border pt-10 sm:grid-cols-[1fr_2fr]">
          <h2 className="sms-serif text-3xl font-light">Questions & consent</h2>
          <div className="space-y-5 text-base leading-8">
            <p>For questions about SMS messages or withdrawing consent, contact <a className="underline underline-offset-4" href="mailto:support@alignmet.com">support@alignmet.com</a>.</p>
            <nav aria-label="SMS legal information" className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
              <a href="/alignmet.html#privacy" className="inline-flex items-center gap-2 underline underline-offset-4">Privacy Policy <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a href="/alignmet.html#terms" className="inline-flex items-center gap-2 underline underline-offset-4">Terms of Service <ArrowUpRight size={15} aria-hidden="true" /></a>
            </nav>
          </div>
        </div>
      </main>
      <footer className="mx-auto max-w-5xl border-t border-border px-6 py-8 text-sm leading-7 text-muted-foreground sm:px-10">
        <p>AlignMet, a product of PlainHand LLC.</p>
        <p>PlainHand LLC is the legal business responsible for AlignMet.</p>
      </footer>
    </div>
  );
}