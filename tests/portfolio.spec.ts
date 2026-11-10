import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  // Exercise the demo locally without depending on external font services.
  await page.route('**/*', route =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

test('starts with one frame and retains a usable background after an image failure', async ({ page }) => {
  const frames: string[] = [];
  page.on('request', request => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith('/frames/')) frames.push(path);
  });
  await page.goto('/');
  await expect(page.getByText('Fictional portfolio demo · Created by Mohammad Ghorbani')).toBeVisible();
  await expect.poll(() => frames.length).toBe(1);
  expect(frames).toEqual(['/frames/ezgif-frame-001.jpg']);
  await expect(page.locator("img[src='/profile.jpg']")).toHaveJSProperty('naturalWidth', 480);

  await page.evaluate(() => window.scrollTo({
    top: document.documentElement.scrollHeight * 0.4,
    behavior: 'instant',
  }));
  const canvas = page.locator('canvas');
  await expect.poll(() => canvas.evaluate(element =>
    (element as HTMLCanvasElement).getContext('2d')!.getImageData(10, 10, 1, 1).data[3],
  )).toBe(255);
  expect(frames.length).toBeLessThanOrEqual(4);

  const pixel = () => canvas.evaluate(element => Array.from(
    (element as HTMLCanvasElement).getContext('2d')!.getImageData(10, 10, 1, 1).data,
  ));
  const previous = await pixel();
  await page.route('**/frames/ezgif-frame-150.jpg', route => route.abort());
  const failed = page.waitForEvent('requestfailed', {
    predicate: request => request.url().endsWith('/ezgif-frame-150.jpg'),
  });
  await page.evaluate(() => window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'instant',
  }));
  await failed;
  expect(await pixel()).toEqual(previous);
});

test('uses a static background with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const frames: string[] = [];
  page.on('request', request => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith('/frames/')) frames.push(path);
  });
  await page.goto('/');
  await expect(page.getByText('Fictional portfolio demo · Created by Mohammad Ghorbani')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator("img[src$='.gif']")).toHaveCount(0);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight }));
  await expect(page.locator('footer')).toBeInViewport();
  expect(frames).toEqual(['/frames/ezgif-frame-001.jpg']);
});

test('supports keyboard language switching and keeps the contact form in demo mode', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => {
    if (request.method() !== 'GET') requests.push(request.url());
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'تغییر زبان به فارسی' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByText('دموی پورتفولیو با شخصیت فرضی · ساختهٔ محمد قربانی')).toBeVisible();
  expect(await page.evaluate(() =>
    document.documentElement.scrollWidth <= window.innerWidth,
  )).toBe(true);
  await page.getByRole('button', { name: 'Switch language to English' }).press('Enter');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('link', { name: 'Download Sample CV' })).toHaveAttribute('href', '/cv.pdf');

  const form = page.locator('#contact form');
  await form.getByRole('button', { name: 'Send Demo Message' }).click();
  await expect(form.getByText('Name is required')).toBeVisible();
  await form.locator("input[name='name']").fill('Sample User');
  await form.locator("input[name='email']").fill('test@example.invalid');
  await form.locator("textarea[name='message']").fill('Local automated test');
  await form.getByRole('button', { name: 'Send Demo Message' }).click();
  await expect(form.getByText('Demo mode: Your message was not sent or stored.')).toBeVisible();
  expect(requests).toEqual([]);
});
