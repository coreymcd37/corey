# coreymcdaniel.com

The portfolio site of **Corey McDaniel**: projects, tools and writing, built as a fast static site.

**Live site:** [coreymcdaniel.com](https://coreymcdaniel.com/)

## What's here

- **Home** – an entry terminal at `/` and the main portfolio at [`/home/`](https://coreymcdaniel.com/home/).
- **Project pages** – case studies and working demos under [`/projects/`](https://coreymcdaniel.com/projects/), including:
  - [Solar Site & Calculator](https://coreymcdaniel.com/projects/solar-site/) – bilingual (English/Spanish) solar site with a savings calculator and homeowner report
  - [CMD-R](https://coreymcdaniel.com/projects/cmd-r/) – one-minute browser arcade game
  - [Cognitive Prism](https://coreymcdaniel.com/projects/cognitive-prism/) – a synesthetic thought engine
  - [Government Funding Pathways](https://coreymcdaniel.com/projects/funding-gateway/) – nonprofit grant and business financing guide
  - [Credit Reset Planner](https://coreymcdaniel.com/projects/credit-reset-planner/), [Research Finder](https://coreymcdaniel.com/projects/research-finder/), [Patient Evidence Navigator](https://coreymcdaniel.com/projects/patient-evidence-navigator/), [Vacation Property Matchmaker](https://coreymcdaniel.com/projects/vacation-matchmaker/), [Brothers Brands](https://coreymcdaniel.com/projects/brothers-brands/), [Clothing Design Studio](https://coreymcdaniel.com/projects/clothing/), [CMD Health Food Guide](https://coreymcdaniel.com/projects/cmd-health-food-guide/) and [The Healing Table](https://coreymcdaniel.com/projects/healing-table/)
- **Utilities Toolkit** – [`/utilities/`](https://coreymcdaniel.com/utilities/): 127 privacy-first browser tools across 16 category workbenches (SEO, diagnostics, text, encoding, design, images, calculators and more). No account needed, and processing happens on your device.
- **Works, quotes and legal** – `/works/`, `/quotes/`, `/legal/`.

## Features

- Static HTML, CSS and JavaScript with no build step and no server
- Responsive, mobile-first layouts
- SEO basics: per-page titles and descriptions, structured data, `sitemap.xml`, `robots.txt` and `llms.txt`
- Web app manifest and a custom 404 page
- Client-side only: tools and calculators run in the browser

## Structure

```
index.html          entry terminal
home/               main portfolio page
projects/<name>/    project pages and demos
utilities/          utilities toolkit (shipped minified)
works/ quotes/      showcase pages
legal/              terms
css/ js/ img/ media/ shared assets
sitemap.xml robots.txt llms.txt site.webmanifest CNAME
```

## Run locally

No install needed. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

The site is hosted on GitHub Pages from `main`, with the custom domain set in `CNAME`. Pushing to `main` publishes it.

## How I work

I build in an AI-assisted workflow that I direct: I set the goals, review the code, test in real browsers on phone and desktop, and decide what ships.

## License

The source in this public repo is proprietary. Viewing the live site is welcome; copying, redistributing or republishing the code or the toolkit is not. Utilities JavaScript is shipped minified, and the readable source is kept private. See [`LICENSE`](./LICENSE).

© 2026 Corey McDaniel
