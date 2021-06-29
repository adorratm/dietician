import tr from 'vuetify/es5/locale/tr'
import minifyTheme from 'minify-css-string'
import colors from 'vuetify/es5/util/colors'
export default {
  lang: {
    locales: { tr },
    current: 'tr',
  },
  customVariables: ['~/assets/variables.scss'],
  theme: {
    dark:false,
    options: { minifyTheme },
    themes: {
      light: {
        primary: colors.blue.darken2,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  }

}
