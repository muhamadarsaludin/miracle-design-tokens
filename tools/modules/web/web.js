require('dotenv').config()
const { FONT_WEIGHT } = require("../shared");

const TOKEN_SIZING = [
  "size",
  "spacing",
  "border-radius",
  "font-size",
  "line-height"
]

const TOKENS_MAP = {
  "opacity": getOpacityFormat,
  "duration": getDurationFormat,
  "typography": getTypographyFormat,
  "font-family": getFontFamilyFormat,
  "font-weight": getFontWeightFormat
}

/**
 * Mapping web tokens
 * @param {Object} token Single token object
 * @returns {String} Return formatted string to be printed
 */
function mapWeb(token, type) {
  let prefix = type === 'scss' ? '$' : '  --' 
  prefix += process.env.PREFIX
  
  return `${prefix}-${token.name}: ${getTokenValue(token)};`
}

/**
 * Generate token value format
 * @param {String} value Token value
 * @returns {String} Return formatted token value
*/
function getTokenValue(token) {
  const category = token.attributes.category
  let value = token.value

  if (value == 0) return value
  if (TOKEN_SIZING.includes(category)) return getSizeFormat(value)
  if (TOKENS_MAP[category]) return TOKENS_MAP[category](value)
  return value
}

/**
 * Generate size format
 * @param {String} value Size token value
 * @returns {String} Return formatted size token value
*/ 
function getSizeFormat(value) {
  return value + 'px'
}

/**
 * Generate duration format
 * @param {String} value Duration token value
 * @returns {String} Return formatted duration token value
*/ 
function getDurationFormat(value) {
  return value + 'ms'
}

/**
 * Generate opacity format
 * @param {String} value Opacity token value
 * @returns {String} Return formatted opacity token value
*/ 
function getOpacityFormat(value) {
  return parseInt(value) / 100
}

/**
 * Generate font family format
 * @param {String} value Font family token value
 * @returns {String} Return formatted font family token value
*/ 
function getFontFamilyFormat(value) {
  const font = typeof value === "object" ? value.value : value
  return `"${font}", -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`
}

/**
 * Generate font weight format
 * @param {String} value Font weight token value
 * @returns {String} Return formatted font weight token value
*/ 
function getFontWeightFormat(value) {
  const fontWeight = typeof value === "object" ? value.value : value
  return FONT_WEIGHT[fontWeight]
}

/**
 * Generate typography format
 * @param {String} value Typography token value
 * @returns {String} Return formatted typography token value
*/ 
function getTypographyFormat(value) {
  const fontWeight = getFontWeightFormat(value.fontWeight)
  const fontSize = getSizeFormat(value.fontSize)
  const lineHeight = getSizeFormat(value.lineHeight)
  const fontFamily = getFontFamilyFormat(value.fontFamily)
  return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`
}

module.exports = {
  mapWeb
}