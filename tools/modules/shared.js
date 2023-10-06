const FONT_WEIGHT = {
  Light: 300,
  Book: 400,
  Regular: 400,
  Medium: 500,
  DemiBold: 600,
  Bold: 700
}

/**
 * Generate token format string
 * @param {Object} arr Array of codes to be printed
 * @returns {String} Return formatted string
 */
function generateString(arr) {
  return arr.join(`\n`)
}

module.exports = {
  FONT_WEIGHT,
  generateString
}