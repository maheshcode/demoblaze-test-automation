import { test, expect, Page } from '@playwright/test';

test('performance test example', async ({ page }, TestInfo) => {
    // Perform actions
    await page.goto('https://www.demoblaze.com/index.html');
    // Measure performance
    await measurePerformance(page);
});

async function measurePerformance(page: Page) {
    // Use Performance API to measure performance 
    const [performanceTiming] = await page.evaluate(() => {
        const [timing] = performance.getEntriesByType('navigation');
        return [timing];
    });
    console.log(performanceTiming);
    expect(performanceTiming.duration).toBeLessThan(2000);
};