// const autoprefixer = require('autoprefixer');
// const purgecss = require('@fullhuman/postcss-purgecss')({
//   content: ['./src/**/*.vue'],
//   // whitelistPatterns: [/svelte-/],
//   defaultExtractor: (content) => {
//     const standard = content.match(/[\w-/:]+/g) || [];
//     const vueClass = content.match(/(?<=class=)['"][^"']*['"]/g) || [];
//     return standard.concat(vueClass);
//   },
// });

// const production = !process.env.ROLLUP_WATCH;

// module.exports = {
//   plugins: [
//     require('tailwindcss'),
//     autoprefixer,
//     ...(production ? [purgecss] : []),
//   ],
// };

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
