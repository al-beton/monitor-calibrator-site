# Monitor Calibrator

A tiny static website for visually comparing and tuning monitors.

The current version focuses on simple full-screen test patterns:

- Grey steps for checking brightness and contrast separation.
- Smooth grey and RGB ramps for spotting banding.
- Full-width vertical layouts that make it easier to compare the same Y position across multiple displays or browser windows.

## Use

Open `index.html` in a browser. No build step, package install, backend, or network access is required.

For best results:

1. Open the page on each monitor you want to compare.
2. Use the pattern buttons to switch between grey steps and color ramps.
3. Use the browser's full-screen mode for the cleanest view.
4. Click `Hide` when you want the pattern to fill the whole viewport.

## Publish

This project is intentionally static. Any static host should work, including GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a plain web server.

If publishing with GitHub Pages, serve the repository root and use `index.html` as the entry point.

## Inspiration

This project is inspired by the Flatpanels Online pure HTML monitor test tool: <https://tft.vanity.dk/MonitorTest_pureHTML.html>.

The goal is similar: provide simple browser-based monitor test patterns. This implementation is a small independent static page intended for open-source use and future customization.

## License

MIT. See `LICENSE`.
