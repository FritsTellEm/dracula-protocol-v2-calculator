const { getThemeVariables } = require('antd/dist/theme')

module.exports = {
  ...getThemeVariables({
    dark: true,
  }),
  'primary-color': '#fe5767',
}
