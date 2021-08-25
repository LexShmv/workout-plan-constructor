module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false,
  theme: {
    boxShadow: {
      form: '0px 0px 30px 8px rgba(255, 255, 255, 0.2);',
    },
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '4rem',
        sm: '6rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [],
};
