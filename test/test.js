const { expect } = require('chai')
const { sum, parseKey } = require('../')

const isNode = (typeof window === 'undefined')

const jwt = {
  alg: 'ES256',
  crv: 'P-256',
  kty: 'EC',
  d: 'VhsfgSRKcvHCGpLyygMbO_YpXc7bVKwi12KQTE4yOR4',
  x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
  y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo'
}

describe('Array', () => {
  describe('Tests', () => {
    it('should sum', () => {
      expect(sum(1, 1)).to.equal(2)
    })
    it('should add', () => {
      expect(4).to.equal(4)
    })
    it('should parse', async () => {
      const parsed = await parseKey(jwt)
      console.log(parsed)
      if (isNode) {
        expect(parsed).to.be.a('object') // Node KeyObject
      } else {
        // Browser
        expect(parsed).to.be.a('CryptoKey')
        // expect(await parseKey()).to.be.a('Object') // doesnt work in browser?
        // expect(parsed).to.have.property('algorithm') // Browser
      }
    })
    // it('should fail', () => {
    //   expect(3).to.equal(4)
    // })
  })
})
