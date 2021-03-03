const { default: parseJwk } = require('jose/jwk/parse')

module.exports.parseKey = async () => {
  const ecPrivateKey = await parseJwk({
    alg: 'ES256',
    crv: 'P-256',
    kty: 'EC',
    d: 'VhsfgSRKcvHCGpLyygMbO_YpXc7bVKwi12KQTE4yOR4',
    x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
    y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo'
  })
  return ecPrivateKey
}

module.exports.sum = (a, b) => {
  return a + b
}
