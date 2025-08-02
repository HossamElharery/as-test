import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { config } from './app.config.server';
import { bootstrapApplication } from '@angular/platform-browser';

// Test SSR rendering
async function testSSR() {
  console.log('=== SSR TEST START ===');
  console.log('Testing server-side rendering...');

  try {
    const html = await renderApplication(
      () => bootstrapApplication(AppComponent, config),
      {
        document: `<!DOCTYPE html>
<html>
<head>
  <title>Test SSR</title>
  <meta name="description" content="test">
</head>
<body>
  <app-root></app-root>
</body>
</html>`,
        url: '/'
      }
    );

    console.log('=== RENDERED HTML (first 1000 chars) ===');
    console.log(html.substring(0, 1000));

    // Check if meta tags were updated
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="(.*?)"/);

    console.log('=== META TAGS FOUND ===');
    console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
    console.log('Description:', descMatch ? descMatch[1] : 'NOT FOUND');

    if (titleMatch && titleMatch[1].includes('[FALLBACK]')) {
      console.warn('WARNING: Using fallback meta tags - API call likely failed');
    }

  } catch (error) {
    console.error('SSR TEST FAILED:', error);
  }

  console.log('=== SSR TEST END ===');
}

// Run the test
testSSR();
