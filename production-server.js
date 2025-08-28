import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the built SSR server
const { app } = await import('./dist/ask-aladdin/server/server.mjs');

const PORT = process.env.PORT || 3000;
const server = app();

server.listen(PORT, () => {
  console.log(`🚀 SSR Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving from: ${join(__dirname, 'dist/ask-aladdin')}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});