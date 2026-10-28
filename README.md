# Hours of Freedom

One sentence: spending an amount pushes your retirement back, investing it pulls retirement forward, given your assumptions.

Type an amount, tap the first word to switch between Spending and Investing, and tap the frequency to cycle from one time to annually. Tap "your assumptions" to change salary, state, age, investments, return, and withdrawal rate; it starts with generic defaults. The ⓘ button shows the math and a chart. Everything stays in this browser (`localStorage`). Nothing is sent anywhere.

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

Poppins ships in `fonts/` so the page does not call out to Google, and so offline mode still uses the same type. It is under the SIL Open Font License. See `fonts/LICENSE-poppins.txt`.
