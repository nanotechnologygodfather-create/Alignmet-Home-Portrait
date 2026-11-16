<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public SMS consent information lives in a standalone TanStack content route, not the embedded homepage, so it is directly readable without login and has its own metadata.
- The public sitemap derives static paths from required per-route sitemap decisions; omit modification dates unless authoritative page-specific timestamps exist.
- The embedded contact form uses a same-origin, source-checked message bridge to a validated TanStack server function; forward to the unified inbox with the shared secret only on the server, and confirm success only after the inbox accepts it.
- Direct embedded-document visits redirect to the homepage wrapper before interaction, preserving the hash; the wrapper opens that view so legal-to-contact navigation always has the submission bridge.
