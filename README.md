# Hours of Freedom

See how many hours of work a purchase really costs, and how much sooner you could retire if you invested that money instead.

You type a price. The app turns it into hours of work at your take-home pay, then estimates the freedom you would buy back by investing it. The first visit asks four questions — salary, state, what you have invested, and what you invest each month — and starts blank. Everything after that stays in this browser (`localStorage`). Nothing is sent anywhere.

This is an estimate, not financial advice.

## Run it locally

The live site is served from a `/hours-of-freedom/` subpath. The manifest, icons, and service worker use relative paths, so the same files also work at the root of a server.

From the repo root:

```bash
mkdir -p /tmp/hof-site
ln -sfn "$PWD" /tmp/hof-site/hours-of-freedom
python3 -m http.server 8080 --directory /tmp/hof-site
```

Open http://localhost:8080/hours-of-freedom/

Install and offline mode need a local server. Service workers do not run from a `file://` URL.

## Install

- **Android (Chrome):** open the site, then choose **Install app** or **Add to Home screen** from the browser menu.
- **iPhone (Safari):** open the site, tap **Share**, then **Add to Home Screen**.

Installed, the app opens on its own and keeps working offline.

## Publish on GitHub Pages

Merging to `main` runs [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which publishes the static site with GitHub Actions.

The workflow does not turn Pages on. After the merge, enable it once:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

The site will be at https://taylormarrbuilds.github.io/hours-of-freedom/

Until that setting is saved, the deploy has nowhere to publish and the workflow will fail.

## Fonts

Inter and JetBrains Mono ship in `fonts/` so the page does not call out to Google, and so offline mode still uses the same type. Both are under the SIL Open Font License. See `fonts/LICENSE-inter.txt` and `fonts/LICENSE-jetbrains-mono.txt`.
