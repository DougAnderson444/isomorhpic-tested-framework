import { expect } from 'chai'
import { sum, parseKey } from '../'

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
      expect(parsed).to.have.property('type')
      expect(parsed).to.have.property('algorithm')
    })
    // it('should fail', () => {
    //   expect(3).to.equal(4)
    // })
  })
})
