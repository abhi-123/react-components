# Multi‑app React Monorepo → GitHub Pages  (Using GitHub Actions)

Host multiple Vite + React sub‑apps (component demos, mini‑apps) from a single repo using **GitHub Actions**. Each app builds into `.dist/<app>` and is served at `https://<YOUR_GH_USERNAME>.github.io/<YOUR_REPO>/<app>/`.


---

## 0) Prerequisites

* Node.js **20+**
* GitHub repository (e.g., `<YOUR_REPO>`) under your account `<YOUR_GH_USERNAME>`

---

## 1) Create repo & scaffold folders

```bash
# on GitHub: create repo <YOUR_REPO>

# locally
git clone https://github.com/<YOUR_GH_USERNAME>/<YOUR_REPO>.git
cd <YOUR_REPO>
mkdir -p apps
```

If migrating an existing Vite app, move it into `apps/<app-name>`.

---

## 2) Initialize npm workspaces (monorepo)

Create/replace **package.json** at the repo root:

```json
{
  "name": "<YOUR_REPO>",
  "private": true,
  "workspaces": ["apps/*"],
  "scripts": {
    "build": "npm -ws --if-present run build",
    "clean": "rm -rf .dist"
  },
  "engines": { "node": ">=20" }
}
```

* `build` runs `build` in **every** workspace automatically.

Install once at the root:

```bash
npm install
```

---

## 3) Create sub‑apps (example: Vite + React)

```bash
npm create vite@latest apps/toast -- --template react
npm create vite@latest apps/search-filter -- --template react
```

Each app’s **package.json** should include scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173"
  }
}
```

Run locally (optional):

```bash
npm run -w apps/toast dev
```

---

## 4) Configure Vite per app (critical)

Set **base** (public path) and **build.outDir** (to `.dist/<app>`).

**apps/toast/vite.config.(js|ts)**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Served at https://<YOUR_GH_USERNAME>.github.io/<YOUR_REPO>/toast/
  base: '/<YOUR_REPO>/toast/',
  build: {
    outDir: '../../.dist/toast',
    emptyOutDir: false
  }
})
```

**apps/search-filter/vite.config.(js|ts)**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Served at https://<YOUR_GH_USERNAME>.github.io/<YOUR_REPO>/search-filter/
  base: '/<YOUR_REPO>/search-filter/',
  build: {
    outDir: '../../.dist/search-filter',
    emptyOutDir: false
  }
})
```

> If you use React Router: wrap the app with `<BrowserRouter basename="/<YOUR_REPO>/<app>/">`.

---

## 5) Add GitHub Actions workflow

Create **.github/workflows/pages.yml**:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install
        run: npm ci

      - name: Build all workspaces
        run: npm run build

      # SPA deep-link fallbacks: copy index.html -> 404.html per built app
      - name: Create SPA 404 fallbacks
        run: |
          if [ -d ".dist" ]; then
            for dir in .dist/*; do
              if [ -d "$dir" ] && [ -f "$dir/index.html" ]; then
                cp "$dir/index.html" "$dir/404.html"
              fi
            done
          fi

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then on GitHub: **Settings → Pages → Source: GitHub Actions**.

---

## 6) .gitignore (recommended)

Create **.gitignore** at repo root:

```gitignore
# dependencies
node_modules
*.log

# vite outputs (if any local builds)
dist
dist-ssr

# monorepo build output used by Pages
.dist/

# OS/editor
.DS_Store
.vscode/
.idea/
```

---

## 7) Commit & first deploy

```bash
git add .
git commit -m "chore: monorepo + apps + Pages workflow"
git branch -M main
git push -u origin main
```

GitHub Actions will build and publish.

---

## 8) URLs

```
https://<YOUR_GH_USERNAME>.github.io/<YOUR_REPO>/toast/
https://<YOUR_GH_USERNAME>.github.io/<YOUR_REPO>/search-filter/
```

---

## 9) Add another app later

```bash
npm create vite@latest apps/<new-app> -- --template react
# vite base: '/<YOUR_REPO>/<new-app>/'
# vite outDir: '../../.dist/<new-app>'

npm install
git add .
git commit -m "feat: add <new-app>"
git push
```

No workflow changes needed—the root `build` script runs in every workspace and the workflow auto‑creates `404.html` for each subfolder in `.dist`.

---

## 10) Troubleshooting

* **Blank page / assets 404** → `base` must be `/<YOUR_REPO>/<app>/` **with trailing slash**.
* **Refresh 404 on deep routes (React Router)** → ensure the workflow created `404.html` next to each app’s `index.html`.
* **Changed repo name** → update all `base` values (and router `basename`).
* **User/Org site repo (`<user>.github.io`)** → drop the repo segment in `base`, e.g. `base: '/toast/'`.

---

## 11) Local development tips

* Run individual app: `npm run -w apps/toast dev`
* Build locally (optional): `npm run build` → outputs to `.dist/`
* Preview a built app: `npm run -w apps/toast preview`

---

Happy shipping! 🚀
