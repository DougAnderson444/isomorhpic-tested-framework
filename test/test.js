// import { expect } from 'chai'
// import { sum, parseKey } from '../'
const { expect } = require('chai')
const { sum, parseKey } = require('../')

const isNode = (typeof window === 'undefined')

describe('Array', () => {
  describe('Tests', () => {
    it('should sum', () => {
      expect(sum(1, 1)).to.equal(2)
    })
    it('should add', () => {
      expect(4).to.equal(4)
    })
    it('should parse', async () => {
      const parsed = await parseKey()
      console.log(parsed)
      if (isNode) { expect(parsed).to.be.a('object') } // Node KeyObject
      else { expect(parsed).to.be.a('CryptoKey') } // Browser
      // expect(await parseKey()).to.be.a('Object') // doesnt work in browser?
      // expect(parsed).to.have.property('algorithm') // Browser
    })
    // it('should fail', () => {
    //   expect(3).to.equal(4)
    // })
  })
})
