# Framework for both the browser and Nodejs

## Testing Setup

Install:
- [Mocha](https://mochajs.org/) Test Framework
- [Chai](https://www.npmjs.com/package/chai) Assertion Library
- [esm](https://github.com/standard-things/esm) To use ES Modules with Mocha `mocha --require esm`
- [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) To run the same tests in the browser 

## Config

Put all the common tests in `basic.spec.js`

### Node

Then pass  `import { expect } from 'chai'` for the node tests. Uses Chai for Node.

### Browser

Then pass  `import { expect } from '@esm-bundle/chai'` for the browser tests. Uses Chai for the browser testing environment.

## Run

```
npm run test
```

## Travis CI

Should run in Continuous Integration as the web-runner is headless browser.
