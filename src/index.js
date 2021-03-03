const { default: parseJwk } = require('jose/jwk/parse')

module.exports.parseKey = async (jwt) => {
  const ecPrivateKey = await parseJwk(jwt)
  return ecPrivateKey
}

module.exports.sum = (a, b) => {
  return a + b
}
