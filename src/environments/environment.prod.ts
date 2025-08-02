export const environment = {
  production: true,
  url: "https://api.ask-aladdin.com/api/",
  baseUrl: "https://new.ask-aladdin.com", // CORRECT: Use your actual production domain
  apiTimeout: 8000,
  ssrApiTimeout: 2000, // CRITICAL: Ultra-short timeout to prevent SSR hanging - fallbacks will handle failures
  enableLogging: false,
  enableSSROptimization: true, // Enable SSR optimizations for production
  maxRetries: 1, // Minimal retries to prevent long delays during SSR
  cacheTimeout: 300000 // 5 minutes cache timeout
};
