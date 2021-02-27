/* global describe, it */
/* eslint no-undef: "error" */

/**
 * All tests that apply to both node and browser go here
 */
import { sum } from '../src/index.js'

export default (expect) => {
  describe('Array', function () {
    describe('#indexOf()', function () {
      it('sums up 2 numbers', () => {
        expect(sum(1, 1)).to.equal(2)
        expect(sum(3, 12)).to.equal(15)
      })
    })
  })
}
