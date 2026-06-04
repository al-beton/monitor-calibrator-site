const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const configPath = process.argv[2] || '.github/preview-screenshots.json';
const outputDir = process.argv[3] || 'preview-screenshots';
const previewUrl = process.env.PREVIEW_URL;
const repository = process.env.GITHUB_REPOSITORY;
const prNumber = process.env.PR_NUMBER;
const headSha = process.env.HEAD_SHA;

if (!previewUrl) {
  throw new Error('PREVIEW_URL must be set');
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
fs.mkdirSync(outputDir, { recursive: true });

function buildUrl(baseUrl, routePath) {
  if (!routePath || routePath === '/') {
    return baseUrl;
  }
  return new URL(routePath.replace(/^\/+/, ''), baseUrl).toString();
}

async function applyActions(page, actions = []) {
  for (const action of actions) {
    if (action.clickText) {
      await page.getByRole('button', { name: action.clickText }).click();
    } else if (action.waitForSelector) {
      await page.waitForSelector(action.waitForSelector);
    } else if (action.waitForTimeout) {
      await page.waitForTimeout(action.waitForTimeout);
    } else {
      throw new Error(`Unsupported screenshot action: ${JSON.stringify(action)}`);
    }
  }
}

(async () => {
  const browser = await chromium.launch();
  const screenshots = [];

  for (const scenario of config) {
    const page = await browser.newPage({ viewport: scenario.viewport });
    const scenarioUrl = buildUrl(previewUrl, scenario.path);
    const fileName = `${scenario.id}.png`;
    const filePath = path.join(outputDir, fileName);

    await page.goto(scenarioUrl, { waitUntil: 'networkidle' });
    await applyActions(page, scenario.actions);
    await page.screenshot({ path: filePath, fullPage: Boolean(scenario.fullPage) });
    await page.close();

    screenshots.push({
      id: scenario.id,
      label: scenario.label,
      path: fileName,
      url: scenarioUrl,
      viewport: scenario.viewport
    });
  }

  await browser.close();

  fs.writeFileSync(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify({ previewUrl, screenshots }, null, 2)
  );

  if (repository && prNumber && headSha) {
    const branchPath = `pulls/${prNumber}/${headSha}`;
    const rows = screenshots.map((screenshot) => {
      const imageUrl = `https://github.com/${repository}/blob/ci-screenshots/${branchPath}/${screenshot.path}?raw=true`;
      return `| ${screenshot.label} | [![${screenshot.label}](${imageUrl})](${imageUrl}) |`;
    });
    const markdown = [
      `Preview: ${previewUrl}`,
      '',
      'Screenshots:',
      '',
      '| Scenario | Screenshot |',
      '| --- | --- |',
      ...rows,
      ''
    ].join('\n');

    fs.writeFileSync(path.join(outputDir, 'comment.md'), markdown);
  }
})();
