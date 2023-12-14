const ShortUniqueId = require('short-unique-id')

function shortUniqueId () {
  const uuid = new ShortUniqueId({ length: 6 })
  return uuid()
}

module.exports = shortUniqueId
