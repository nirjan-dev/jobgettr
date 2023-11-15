import puppeteer from 'puppeteer';

export default defineEventHandler(async function downloadResume(event) {
  const body = await readBody<{ resumeDetails: string }>(event);
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  await page.goto(
    `http://localhost:3000?import=${encodeURIComponent(body.resumeDetails)}`,
    { waitUntil: 'networkidle0' },
  );

  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1,
  });

  await page.emulateMediaType('print');

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: false,
    margin: {
      right: 5,
      left: 5,
      top: 10,
      bottom: 10,
    },
  });

  browser.close();

  setResponseHeaders(event, {
    'Content-Length': pdf.length,
    'Content-Type': 'application/pdf',
  });

  return pdf;
});
