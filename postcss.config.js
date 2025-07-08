module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-custom-selectors'),
    // This plugin helps with advanced CSS selector compatibility
    require('postcss-selector-parser')({
      // Add tolerance for complex selectors
      lossless: false
    }),
    require('autoprefixer'),
    require('postcss-custom-selectors'),
    require('postcss-selector-parser')({
      lossless: false
    })
  ]
};
