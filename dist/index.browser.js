/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["testing"] = factory();
	else
		root["testing"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/jose/dist/browser/jwk/parse.js":
/*!*****************************************************!*\
  !*** ./node_modules/jose/dist/browser/jwk/parse.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ parseJwk)\n/* harmony export */ });\n/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/base64url.js */ \"./node_modules/jose/dist/browser/runtime/base64url.js\");\n/* harmony import */ var _runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/jwk_to_key.js */ \"./node_modules/jose/dist/browser/runtime/jwk_to_key.js\");\n/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/errors.js */ \"./node_modules/jose/dist/browser/util/errors.js\");\n/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/is_object.js */ \"./node_modules/jose/dist/browser/lib/is_object.js\");\n\n\n\n\nasync function parseJwk(jwk, alg, octAsKeyObject) {\n    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__.default)(jwk)) {\n        throw new TypeError('JWK must be an object');\n    }\n    alg || (alg = jwk.alg);\n    if (typeof alg !== 'string' || !alg) {\n        throw new TypeError('\"alg\" argument is required when \"jwk.alg\" is not present');\n    }\n    switch (jwk.kty) {\n        case 'oct':\n            if (typeof jwk.k !== 'string' || !jwk.k) {\n                throw new TypeError('missing \"k\" (Key Value) Parameter value');\n            }\n            octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : (octAsKeyObject = jwk.ext !== true);\n            if (octAsKeyObject) {\n                return (0,_runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_1__.default)({ ...jwk, alg, ext: false });\n            }\n            return (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decode)(jwk.k);\n        case 'RSA':\n            if (jwk.oth !== undefined) {\n                throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('RSA JWK \"oth\" (Other Primes Info) Parameter value is unsupported');\n            }\n        case 'EC':\n        case 'OKP':\n            return (0,_runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_1__.default)({ ...jwk, alg });\n        default:\n            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_2__.JOSENotSupported('unsupported \"kty\" (Key Type) Parameter value');\n    }\n}\n\n\n//# sourceURL=webpack://testing/./node_modules/jose/dist/browser/jwk/parse.js?");

/***/ }),

/***/ "./node_modules/jose/dist/browser/lib/buffer_utils.js":
/*!************************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/buffer_utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"encoder\": () => (/* binding */ encoder),\n/* harmony export */   \"decoder\": () => (/* binding */ decoder)\n/* harmony export */ });\n/* unused harmony exports concat, p2s, uint64be, uint32be, lengthAndInput, concatKdf */\nconst encoder = new TextEncoder();\nconst decoder = new TextDecoder();\nconst MAX_INT32 = 2 ** 32;\nfunction concat(...buffers) {\n    const size = buffers.reduce((acc, { length }) => acc + length, 0);\n    const buf = new Uint8Array(size);\n    let i = 0;\n    buffers.forEach((buffer) => {\n        buf.set(buffer, i);\n        i += buffer.length;\n    });\n    return buf;\n}\nfunction p2s(alg, p2sInput) {\n    return concat(encoder.encode(alg), new Uint8Array([0]), p2sInput);\n}\nfunction writeUInt32BE(buf, value, offset) {\n    if (value < 0 || value >= MAX_INT32) {\n        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);\n    }\n    buf.set([value >>> 24, value >>> 16, value >>> 8, value & 0xff], offset);\n}\nfunction uint64be(value) {\n    const high = Math.floor(value / MAX_INT32);\n    const low = value % MAX_INT32;\n    const buf = new Uint8Array(8);\n    writeUInt32BE(buf, high, 0);\n    writeUInt32BE(buf, low, 4);\n    return buf;\n}\nfunction uint32be(value) {\n    const buf = new Uint8Array(4);\n    writeUInt32BE(buf, value);\n    return buf;\n}\nfunction lengthAndInput(input) {\n    return concat(uint32be(input.length), input);\n}\nasync function concatKdf(digest, secret, bits, value) {\n    const iterations = Math.ceil((bits >> 3) / 32);\n    let res;\n    for (let iter = 1; iter <= iterations; iter++) {\n        const buf = new Uint8Array(4 + secret.length + value.length);\n        buf.set(uint32be(iter));\n        buf.set(secret, 4);\n        buf.set(value, 4 + secret.length);\n        if (!res) {\n            res = await digest(buf);\n        }\n        else {\n            res = concat(res, await digest(buf));\n        }\n    }\n    res = res.slice(0, bits >> 3);\n    return res;\n}\n\n\n//# sourceURL=webpack://testing/./node_modules/jose/dist/browser/lib/buffer_utils.js?");

/***/ }),

/***/ "./node_modules/jose/dist/browser/lib/is_object.js":
/*!*********************************************************!*\
  !*** ./node_modules/jose/dist/browser/lib/is_object.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isObject)\n/* harmony export */ });\nfunction isObject(input) {\n    return !!input && input.constructor === Object;\n}\n\n\n//# sourceURL=webpack://testing/./node_modules/jose/dist/browser/lib/is_object.js?");

/***/ }),

/***/ "./node_modules/jose/dist/browser/runtime/base64url.js":
/*!*************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/base64url.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"decode\": () => (/* binding */ decode)\n/* harmony export */ });\n/* unused harmony export encode */\n/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/buffer_utils.js */ \"./node_modules/jose/dist/browser/lib/buffer_utils.js\");\n/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ \"./node_modules/jose/dist/browser/runtime/global.js\");\n\n\nconst encode = (input) => {\n    let unencoded = input;\n    if (typeof unencoded === 'string') {\n        unencoded = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__.encoder.encode(unencoded);\n    }\n    const CHUNK_SIZE = 0x8000;\n    const arr = [];\n    for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {\n        arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));\n    }\n    const base64string = _global_js__WEBPACK_IMPORTED_MODULE_1__.default.btoa(arr.join(''));\n    return base64string.replace(/=/g, '').replace(/\\+/g, '-').replace(/\\//g, '_');\n};\nconst decode = (input) => {\n    let encoded = input;\n    if (encoded instanceof Uint8Array) {\n        encoded = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__.decoder.decode(encoded);\n    }\n    encoded = encoded.replace(/-/g, '+').replace(/_/g, '/').replace(/\\s/g, '');\n    try {\n        return new Uint8Array(_global_js__WEBPACK_IMPORTED_MODULE_1__.default.atob(encoded)\n            .split('')\n            .map((c) => c.charCodeAt(0)));\n    }\n    catch (_a) {\n        throw new TypeError('The input to be decoded is not correctly encoded.');\n    }\n};\n\n\n//# sourceURL=webpack://testing/./node_modules/jose/dist/browser/runtime/base64url.js?");

/***/ }),

/***/ "./node_modules/jose/dist/browser/runtime/global.js":
/*!**********************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/global.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction getGlobal() {\n    if (typeof globalThis !== 'undefined')\n        return globalThis;\n    if (typeof self !== 'undefined')\n        return self;\n    if (typeof window !== 'undefined')\n        return window;\n    throw new Error('unable to locate global object');\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getGlobal());\n\n\n//# sourceURL=webpack://testing/./node_modules/jose/dist/browser/runtime/global.js?");

/***/ }),

/***/ "./node_modules/jose/dist/browser/runtime/jwk_to_key.js":
/*!**************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/jwk_to_key.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ \"./node_modules/jose/dist/browser/runtime/webcrypto.js\");\n/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/errors.js */ \"./node_modules/jose/dist/browser/util/errors.js\");\n/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base64url.js */ \"./node_modules/jose/dist/browser/runtime/base64url.js\");\n\n\n\nfunction subtleMapping(jwk) {\n    let algorithm;\n    let keyUsages;\n    switch (jwk.kty) {\n        case 'oct': {\n            switch (jwk.alg) {\n                case 'HS256':\n                case 'HS384':\n                case 'HS512':\n                    algorithm = { name: 'HMAC', hash: { name: `SHA-${jwk.alg.substr(-3)}` } };\n                    keyUsages = ['sign', 'verify'];\n                    break;\n                case 'A128CBC-HS256':\n                case 'A192CBC-HS384':\n                case 'A256CBC-HS512':\n                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported(`${jwk.alg} keys cannot be imported as CryptoKey instances`);\n                case 'A128GCM':\n                case 'A192GCM':\n                case 'A256GCM':\n                case 'A128GCMKW':\n                case 'A192GCMKW':\n                case 'A256GCMKW':\n                    algorithm = { name: 'AES-GCM' };\n                    keyUsages = ['encrypt', 'decrypt'];\n                    break;\n                case 'A128KW':\n                case 'A192KW':\n                case 'A256KW':\n                    algorithm = { name: 'AES-KW' };\n                    keyUsages = ['wrapKey', 'unwrapKey'];\n                    break;\n                case 'PBES2-HS256+A128KW':\n                case 'PBES2-HS384+A192KW':\n                case 'PBES2-HS512+A256KW':\n                    algorithm = { name: 'PBKDF2' };\n                    keyUsages = ['deriveBits'];\n                    break;\n                default:\n                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('unsupported or invalid JWK \"alg\" (Algorithm) Parameter value');\n            }\n            break;\n        }\n        case 'RSA': {\n            switch (jwk.alg) {\n                case 'PS256':\n                case 'PS384':\n                case 'PS512':\n                    algorithm = { name: 'RSA-PSS', hash: { name: `SHA-${jwk.alg.substr(-3)}` } };\n                    keyUsages = jwk.d ? ['sign'] : ['verify'];\n                    break;\n                case 'RS256':\n                case 'RS384':\n                case 'RS512':\n                    algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: { name: `SHA-${jwk.alg.substr(-3)}` } };\n                    keyUsages = jwk.d ? ['sign'] : ['verify'];\n                    break;\n                case 'RSA-OAEP':\n                case 'RSA-OAEP-256':\n                case 'RSA-OAEP-384':\n                case 'RSA-OAEP-512':\n                    algorithm = {\n                        name: 'RSA-OAEP',\n                        hash: { name: `SHA-${parseInt(jwk.alg.substr(-3), 10) || 1}` },\n                    };\n                    keyUsages = jwk.d ? ['decrypt', 'unwrapKey'] : ['encrypt', 'wrapKey'];\n                    break;\n                default:\n                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('unsupported or invalid JWK \"alg\" (Algorithm) Parameter value');\n            }\n            break;\n        }\n        case 'EC': {\n            switch (jwk.alg) {\n                case 'ES256':\n                case 'ES384':\n                case 'ES512':\n                    algorithm = { name: 'ECDSA', namedCurve: jwk.crv };\n                    keyUsages = jwk.d ? ['sign'] : ['verify'];\n                    break;\n                case 'ECDH-ES':\n                case 'ECDH-ES+A128KW':\n                case 'ECDH-ES+A192KW':\n                case 'ECDH-ES+A256KW':\n                    algorithm = { name: 'ECDH', namedCurve: jwk.crv };\n                    keyUsages = jwk.d ? ['deriveBits'] : [];\n                    break;\n                default:\n                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('unsupported or invalid JWK \"alg\" (Algorithm) Parameter value');\n            }\n            break;\n        }\n        default:\n            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('unsupported or invalid JWK \"kty\" (Key Type) Parameter value');\n    }\n    return { algorithm, keyUsages };\n}\nconst parse = async (jwk) => {\n    var _a, _b;\n    const { algorithm, keyUsages } = subtleMapping(jwk);\n    let format = 'jwk';\n    let keyData = { ...jwk };\n    delete keyData.alg;\n    if (algorithm.name === 'PBKDF2') {\n        format = 'raw';\n        keyData = (0,_base64url_js__WEBPACK_IMPORTED_MODULE_2__.decode)(jwk.k);\n    }\n    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__.default.subtle.importKey(format, keyData, algorithm, (_a = jwk.ext) !== null && _a !== void 0 ? _a : false, (_b = jwk.key_ops) !== null && _b !== void 0 ? _b : keyUsages);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);\n\n\n//# sourceURL=webpack://testing/./node_modules/jose/dist/browser/runtime/jwk_to_key.js?");

/***/ }),

/***/ "./node_modules/jose/dist/browser/runtime/webcrypto.js":
/*!*************************************************************!*\
  !*** ./node_modules/jose/dist/browser/runtime/webcrypto.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.js */ \"./node_modules/jose/dist/browser/runtime/global.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_global_js__WEBPACK_IMPORTED_MODULE_0__.default.crypto);\n\n\n//# sourceURL=webpack://testing/./node_modules/jose/dist/browser/runtime/webcrypto.js?");

/***/ }),

/***/ "./node_modules/jose/dist/browser/util/errors.js":
/*!*******************************************************!*\
  !*** ./node_modules/jose/dist/browser/util/errors.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"JOSENotSupported\": () => (/* binding */ JOSENotSupported)\n/* harmony export */ });\n/* unused harmony exports JOSEError, JWTClaimValidationFailed, JOSEAlgNotAllowed, JWEDecryptionFailed, JWEInvalid, JWSInvalid, JWTInvalid, JWKInvalid, JWKSInvalid, JWKSNoMatchingKey, JWKSMultipleMatchingKeys, JWSSignatureVerificationFailed, JWTExpired */\nclass JOSEError extends Error {\n    constructor(message) {\n        super(message);\n        this.code = 'ERR_JOSE_GENERIC';\n        this.name = this.constructor.name;\n        if (Error.captureStackTrace) {\n            Error.captureStackTrace(this, this.constructor);\n        }\n    }\n}\nclass JWTClaimValidationFailed extends JOSEError {\n    constructor(message, claim = 'unspecified', reason = 'unspecified') {\n        super(message);\n        this.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';\n        this.claim = claim;\n        this.reason = reason;\n    }\n}\nclass JOSEAlgNotAllowed extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JOSE_ALG_NOT_ALLOWED';\n    }\n}\nclass JOSENotSupported extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JOSE_NOT_SUPPORTED';\n    }\n}\nclass JWEDecryptionFailed extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWE_DECRYPTION_FAILED';\n        this.message = 'decryption operation failed';\n    }\n}\nclass JWEInvalid extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWE_INVALID';\n    }\n}\nclass JWSInvalid extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWS_INVALID';\n    }\n}\nclass JWTInvalid extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWT_INVALID';\n    }\n}\nclass JWKInvalid extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWK_INVALID';\n    }\n}\nclass JWKSInvalid extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWKS_INVALID';\n    }\n}\nclass JWKSNoMatchingKey extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWKS_NO_MATCHING_KEY';\n        this.message = 'no applicable key found in the JSON Web Key Set';\n    }\n}\nclass JWKSMultipleMatchingKeys extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';\n        this.message = 'multiple matching keys found in the JSON Web Key Set';\n    }\n}\nclass JWSSignatureVerificationFailed extends JOSEError {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';\n        this.message = 'signature verification failed';\n    }\n}\nclass JWTExpired extends JWTClaimValidationFailed {\n    constructor() {\n        super(...arguments);\n        this.code = 'ERR_JWT_EXPIRED';\n    }\n}\n\n\n//# sourceURL=webpack://testing/./node_modules/jose/dist/browser/util/errors.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { default: parseJwk } = __webpack_require__(/*! jose/jwk/parse */ \"./node_modules/jose/dist/browser/jwk/parse.js\")\r\n\r\nmodule.exports.parseKey = async (jwt) => {\r\n  const ecPrivateKey = await parseJwk(jwt)\r\n  return ecPrivateKey\r\n}\r\n\r\nmodule.exports.sum = (a, b) => {\r\n  return a + b\r\n}\r\n\n\n//# sourceURL=webpack://testing/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});