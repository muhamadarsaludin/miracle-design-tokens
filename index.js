const fs = require('fs')
const path = require('path')
const StyleDictionary = require('style-dictionary')
const configHelper = require('./tools/config-helper.js') 

const aliasDir = path.resolve('tokens/alias/')
const themes = fs.readdirSync(aliasDir).map(theme => theme.replace('.json', ''))

themes.forEach (theme => {
  const config = configHelper.getConfig(theme)
  StyleDictionary.extend(config).buildAllPlatforms()
})