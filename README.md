# Framework for both the Browser and Nodejs

## Testing Setup

Install:
- [Mocha](https://mochajs.org/) Test Framework
- [Chai](https://www.npmjs.com/package/chai) Assertion Library
- [esm](https://github.com/standard-things/esm) To use ES Modules in Nodejs with Mocha, `mocha --require esm`
- [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) To run the same tests in the browser 

## Test Config

Put all the common tests in `basic.spec.js`

```js
import { sum } from '../src/index.js'

export default (expect) => {
  describe('Array', function () {
    it('sums up 2 numbers', () => {
      expect(sum(1, 1)).to.equal(2)
      expect(sum(3, 12)).to.equal(15)
    })
  })
}
```

### Node Test Config

Then pass  `import { expect } from 'chai'` for the node tests. Uses Chai for Node.

```js
import tests from './basic.spec.js'
import { expect } from 'chai' // <------ Use regular Chai for node env

tests(expect)
```
### Browser Test Config

Then pass  `import { expect } from '@esm-bundle/chai'` for the browser tests. Uses Chai for the browser testing environment.

```js
import tests from './basic.spec.js'
import { expect } from '@esm-bundle/chai' // <------ Use esm-Chai for browser env

tests(expect)
```

## Run Tests

```
"test:node": "mocha 'test/node.spec.js' --require esm",

"test:web": "web-test-runner \"test/web.test.js\" --node-resolve",

"test": "npm run test:node && npm run test:web"

npm run test
```

## Travis CI

Should run in Continuous Integration as the web-runner is headless browser.

## Building for Production

Need to bundle for the browser for production

browserify, webpack, rollup, or esbuild?

Rollup: Doesnt resolve "browser" field in panva/jose

