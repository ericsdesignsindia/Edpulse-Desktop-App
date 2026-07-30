# EDPulse Desktop OS & Marketing Engine

An integrated marketing operating system featuring desktop navigation, 8 service pillars, interactive marketing tools, and Gemini AI backend capabilities.

---

## 🚀 Why Your App Might Not Load on GitHub & How to Fix It

If you uploaded this project to GitHub and saw a **blank white page** or **asset 404 errors**, here is why and how it has been fixed for you:

### 1. Relative Asset Paths (`base: './'`) — **FIXED**
* **The Issue**: GitHub Pages hosts sites under a subpath like `https://username.github.io/repository-name/`. Standard absolute paths (`/assets/...`) look at the root domain (`https://username.github.io/assets/...`), resulting in `404 Not Found` for scripts and styles (blank screen).
* **The Solution**: `vite.config.ts` now uses `base: './'`. All built CSS and JS files use relative pathing, ensuring they load anywhere.

### 2. Static GitHub Pages vs. Node.js Express Server — **HANDLED**
* **The Issue**: GitHub Pages only serves static frontend files (`index.html`, `js`, `css`). It cannot run Node.js/Express backend code (`server.ts`).
* **The Solution**: The frontend now includes **built-in static fallback engines** for all AI tools (Content Calendar, Email Drip Builder, SEO Auditor, and Strategy Blueprint). If `/api/*` endpoints are not reachable (such as on static GitHub Pages), the app seamlessly falls back to client-side simulations so every single button and feature works without crashing or hanging!

---

## 🛠️ Deployment Options

### Option A: Automatic GitHub Pages Deployment (Recommended)
This repository includes a pre-configured **GitHub Actions Workflow** (`.github/workflows/deploy.yml`) and `gh-pages` build scripts.

1. **Push your code** to GitHub (`main` or `master` branch).
2. Go to your repository on GitHub -> **Settings** -> **Pages**.
3. Under **Source**, select **Deploy from a branch** and pick `gh-pages` / `/ (root)`.
4. Click **Save**. GitHub will automatically build and publish your site!

#### Manual GitHub Pages Deploy from Command Line:
```bash
npm install
npm run deploy
```

---

### Option B: Full Server-Side Deployment (Render / Vercel / Railway / Cloud Run)
To run the full Node.js backend with live Gemini AI API endpoints:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```

3. **Build and Run the Node Server**:
   ```bash
   npm run build
   npm start
   ```

---

## 💻 Local Development

Run the development server locally (with Vite + Express backend):

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Project Scripts Summary

* `npm run dev` — Starts local development server on port 3000
* `npm run build` — Builds Vite static assets and bundles `server.ts` into `dist/server.cjs`
* `npm start` — Runs the compiled Node.js backend
* `npm run deploy` — Builds static assets and publishes directly to GitHub Pages (`gh-pages` branch)
* `npm run lint` — Validates TypeScript types
