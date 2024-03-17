module.exports = {
  mode: 'jit',
  content: [
    './demo/**/*.{ts,vue,html}',
    './lib/**/*.{ts,vue,html}'
  ],
  theme: {
    extend: {
      typography: theme => ({
        dark: {
          css: {
            h2: {
              color: theme('colors.gray.200'),
            },
            h3: {
              color: theme('colors.gray.300'),
            },
            h4: {
              color: theme('colors.gray.300'),
            },
            p: {
              color: theme('colors.gray.400'),
            },
            strong: {
              color: theme('colors.gray.300'),
            },
            code: {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      'ns-resize': 'ns-resize',
      'ew-resize': 'ew-resize',
      'nesw-resize': 'nesw-resize',
      'nwse-resize': 'nwse-resize',
      grab: 'grab',
      grabbing: 'grabbing',
    },
    scale: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '90': '.9',
      '100': '1',
      '125': '1.25',
      '150': '1.5',
    },
  },
  variants: {
    margin: ['responsive', 'hover', 'focus'],
  },
  plugins: [require('@tailwindcss/typography')],
}
