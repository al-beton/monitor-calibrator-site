# Monitor Calibrator

A tiny static website for visually comparing and tuning monitors.

Live site: <https://al-beton.github.io/monitor-calibrator-site/>

The current version focuses on simple full-screen test patterns:

- Grey and RGB channel steps for checking brightness, contrast, and color channel separation.
- Smooth grey and RGB ramps, plus combined RGB steps, for spotting banding and channel differences.
- Full-width vertical layouts that make it easier to compare the same Y position across multiple displays or browser windows.

## Use

Open the live site or open `index.html` locally in a browser.

For best results:

1. Open the page on each monitor you want to compare.
2. Use the orientation and pattern buttons to switch between vertical or horizontal grey steps and color ramps.
3. Use the browser's full-screen mode for the cleanest view.
4. Click `Hide` when you want the pattern to fill the whole viewport.

To tune a display, put it next to a reference screen whose image you already trust, such as a built-in laptop display or another monitor you like. Open the same pattern on both screens, line up the steps or ramps, then adjust the target display's brightness, contrast, gamma, gain, and color controls until the visible bands and gradients match the reference as closely as possible.

You do not need every pattern to match perfectly. Use the grey patterns for overall brightness, contrast, and gamma, then use the red, green, blue, and RGB patterns to check the color channels. Prioritize the ranges and colors that matter most for your own work.

## Inspiration

This project is inspired by the Flatpanels Online pure HTML monitor test tool: <https://tft.vanity.dk/MonitorTest_pureHTML.html>.

The goal is similar: provide simple browser-based monitor test patterns. This implementation is a small independent static page intended for open-source use and future customization.

## License

MIT. See `LICENSE`.
