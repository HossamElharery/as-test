export const environment = {
  production: false,
  url: "https://api.ask-aladdin.com/api/",
  baseUrl: "https://new.ask-aladdin.com", // Use production URL as fallback
  apiTimeout: 10000,
  ssrApiTimeout: 3000, // CRITICAL: Timeout for SSR to prevent hanging - shorter than development for faster fallbacks
  enableLogging: true,
  enableSSROptimization: false, // Default to false for safety
  maxRetries: 2, // Reasonable retry limit
  cacheTimeout: 180000 // 3 minutes cache timeout
};
