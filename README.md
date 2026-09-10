# rwses website

A dependency-free, responsive marketing site for rwses, built to deploy directly to GitHub Pages.

## Preview locally

Any static file server will work. For example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages** in the GitHub repository.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The included `pages.yml` workflow publishes the static site on every push to `main`.

The stylesheet and script use relative paths, so the site works from both a custom domain and a repository subpath such as `username.github.io/rwses-platform/`.

## Before launch

- Replace `hello@rwses.com` in `index.html` if a different contact address should be used.
- Review product and security language against the actual rwses implementation.
- Add analytics, privacy, and legal pages if required.
- Configure a custom domain in GitHub Pages if desired.

## Files

- `index.html` — page structure and content
- `styles.css` — brand system, layouts, responsive states, and animation
- `script.js` — navigation, reveal motion, dashboard simulation, and revenue calculator
- `favicon.svg` — rwses browser icon
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow
