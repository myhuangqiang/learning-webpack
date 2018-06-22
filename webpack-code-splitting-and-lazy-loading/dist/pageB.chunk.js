(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pageB"],{

/***/ "./src/pageB.js":
/*!**********************!*\
  !*** ./src/pageB.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n// require.include('./moduleA')\n\n\nvar page = 'subPageB'\n\nif (page === 'subPageA') {\n    // require.ensure(['./subPageA'], function () {\n    //     var subpageA = require('./subPageA')\n    // }, 'subPageA')\n\n    __webpack_require__.e(/*! import() | subPageA */ \"subPageA\").then(__webpack_require__.bind(null, /*! ./subPageA */ \"./src/subPageA.js\")).then(function (subPageA) {\n        console.log(subPageA)\n    })\n\n} else if (page === 'subpageA') {\n\n    // require.ensure(['./subPageB'], function () {\n    //     var subPageA = require('./subPageB')\n    // }, 'subPageB')\n\n    __webpack_require__.e(/*! import() | subPageB */ \"subPageB\").then(__webpack_require__.bind(null, /*! ./subPageB */ \"./src/subPageB.js\")).then(function (subPageB) {\n        console.log(subPageB)\n    })\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = ('pageB');\n\n//# sourceURL=webpack:///./src/pageB.js?");

/***/ })

},[["./src/pageB.js","manifest","vendor"]]]);