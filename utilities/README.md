# All the Best Internet Utilities

Privacy-first standalone toolkit of browser utilities by **Corey McDaniel**.

## Live demo

- GitHub Pages: https://coreymcdaniel.com/utilities/
- Portfolio home: https://coreymcdaniel.com/

## License

© 2026 Corey McDaniel. Portfolio Source License: learn from it, reuse small snippets with credit; no cloning or republishing of the toolkit. See the root
[`LICENSE`](../LICENSE).

Shipped JavaScript in this folder is obfuscated or minified for casual-theft resistance.
Client-side code cannot be made truly unstealable.

## Architecture

- Static HTML, CSS, and JavaScript
- `js/catalog.js` — categories and tool index (minified)
- `js/core.js` — navigation, search, footer (obfuscated)
- `js/tools.js` — tool implementations (heavily obfuscated)
- Relative `css/` / `js/` paths; `BASE` auto-detects `/utilities` under project Pages or apex domain

## Privacy

Default processing is in-browser. The DNS tool is the only optional third-party call
(Cloudflare DoH, user-initiated). See [`privacy.html`](./privacy.html).
