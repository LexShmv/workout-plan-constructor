const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    postcssPresetEnv({
      stage: 3,
      features: { 'nesting-rules': true, 'custom-properties': true },
    }),
    tailwindcss('./tailwind.config.js'),
  ],
};
