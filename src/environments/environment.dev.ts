export const environment = {
  production: false,
  url: "https://api.ask-aladdin.com/api/",
  baseUrl: "http://localhost:4200", // Development URL
  apiTimeout: 15000,
  ssrApiTimeout: 5000, // Slightly longer for development debugging
  enableLogging: true,
  enableSSROptimization: false, // Disable for easier debugging in development
  maxRetries: 3, // More retries allowed in development
  cacheTimeout: 60000 // 1 minute cache timeout for development
};
