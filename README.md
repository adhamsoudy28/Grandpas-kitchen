# Grandpa's Kitchen · Dahab

Website for Grandpa's Kitchen, a chef-owned restaurant on El Melil Street, Dahab,
South Sinai. Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

Any static host works. The simplest is GitHub Pages:

1. Push this repo to GitHub.
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site goes live at `https://<user>.github.io/<repo>/`.

Netlify and Vercel also work: point them at the repo root with no build command.

## Edit content

- **Text, menu, hours, phone:** `index.html`. Everything is plain text in sections marked with comments.
- **Photos:** drop files into `assets/` using the names listed in `assets/README.md`.
- **Colours and fonts:** the top of `css/styles.css` holds every colour token.
- **WhatsApp number:** search `wa.me/201116360361` in `index.html` and replace the digits (country code first, no plus or spaces).

## Structure

```
index.html        the single page
css/styles.css    styles, palette, responsive rules
js/main.js        sticky nav, mobile menu, scroll reveal, open/closed badge
assets/           favicon and photo slots
```
