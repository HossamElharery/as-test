import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

// Express server
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  // Enable CORS
  server.use(cors());

  // Enable compression
  server.use(compression());

  // Configure Helmet with less restrictive CSP
  server.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "blob:",
            "https://cdnjs.cloudflare.com",
            "https://apps.elfsight.com",
            "https://static.elfsight.com",
            "https://universe-static.elfsightcdn.com",
            "https://assets.ticketinghub.com"
          ],
          scriptSrcAttr: ["'unsafe-inline'", "'unsafe-hashes'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
          imgSrc: ["'self'", "data:", "https:", "http:"],
          connectSrc: [
            "'self'",
            "https:",
            "http:",
            "https://assets.ticketinghub.com",
            "https://api.ticketinghub.com",
            "https://checkout.ticketinghub.com",
            "https://widgets.ticketinghub.com",
            "https://apps.elfsight.com",
            "https://static.elfsight.com",
            "https://universe-static.elfsightcdn.com"
          ],
          fontSrc: ["'self'", "https:", "data:", "blob:"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'", "https:", "http:"],
          frameSrc: [
            "'self'",
            "https://www.youtube.com/",
            "https://www.google.com/",
            "https://www.ask-aladdin.com/",
            "https://checkout.ticketinghub.com/",
            "https://widgets.ticketinghub.com/",
            "https://assets.ticketinghub.com/",
            "https://universe-static.elfsightcdn.com/"
          ],
          frameAncestors: ["'self'"],
          formAction: ["'self'"],
          baseUri: ["'self'"]
        },
      },
      // Disable other potentially problematic Helmet features
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false
    })
  );

  // Serve static files from /browser
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => {
        res.send(html);
      })
      .catch((err) => {
        console.error('SSR Error:', err);
        // Fall back to serving static HTML
        res.sendFile(join(browserDistFolder, 'index.html'));
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 3900;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
