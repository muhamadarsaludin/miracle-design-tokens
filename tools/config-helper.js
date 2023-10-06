require('dotenv').config()
const { generateString } = require("./modules/shared");
const { mapWeb } = require("./modules/web/web");

/**
 * Generate config for style dictionary
 * @param {String} theme Theme name
 * @returns {Object} Config for style dictionary
*/
function getConfig(theme) {
  return {
    source: [`tokens/alias/${theme}.json`,'tokens/global.json'],
    format: {
      scss_global_formatter: ({dictionary}) => {
        let result = dictionary.allTokens.filter(token => token.filePath === 'tokens/global.json').map(token => mapWeb(token, 'scss'))
        return generateString(result)
      },
      scss_alias_formatter: ({dictionary}) => {
        let result = dictionary.allTokens.filter(token => token.filePath !== 'tokens/global.json').map(token => mapWeb(token, 'scss'))
        return generateString(result)
      },
      css_global_formatter: ({dictionary}) => {
        let result = dictionary.allTokens.filter(token => token.filePath === 'tokens/global.json').map(token => mapWeb(token, 'css'))
        result.unshift ('html {')
        result.push ('}')
        return generateString(result)
      },
      css_alias_formatter: ({dictionary}) => {
        let result = dictionary.allTokens.filter(token => token.filePath !== 'tokens/global.json').map(token => mapWeb(token, 'css'))
        const CSS_ALIAS_TOP = theme === 'dark' ? 'html[dark],\nhtml.dark {' : 'html {'
        result.unshift (CSS_ALIAS_TOP)
        result.push ('}')
        return generateString(result)
      }
    },
    platforms: {
      scss: {
        transforms: process.env.WEB_TRANSFORMS.split(", "),
        buildPath: `dist/web/scss/`,
        files: [
          {
            destination: 'global-tokens.scss',
            format: "scss_global_formatter"
          },
          {
            destination: `alias/${theme}-tokens.scss`,
            format: "scss_alias_formatter"
          }
        ]
      },
      css: {
        transforms: process.env.WEB_TRANSFORMS.split(", "),
        buildPath: `dist/web/css/`,
        files: [
          {
            destination: 'global-tokens.css',
            format: "css_global_formatter"
          },
          {
            destination: `alias/${theme}-tokens.css`,
            format: "css_alias_formatter"
          }
        ]
      },
    }
  }
}

module.exports = {
  getConfig
}

