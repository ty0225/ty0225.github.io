/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/d3/2D-dot/index.js":
/*!********************************!*\
  !*** ./src/d3/2D-dot/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.json */ \"./src/d3/2D-dot/data.json\");\n\nwindow.onload = () => {\n  // set the dimensions and margins of the graph\n  const margin = {\n      top: 10,\n      right: 30,\n      bottom: 30,\n      left: 30\n    },\n    width = 460 - margin.left - margin.right,\n    height = 500 - margin.top - margin.bottom;\n\n  // append the svg object to the body of the page\n  const svg = d3.select(\"#my_dataviz\").append(\"svg\").attr(\"width\", width + margin.left + margin.right).attr(\"height\", height + margin.top + margin.bottom).append(\"g\").attr(\"transform\", `translate(${margin.left}, ${margin.top})`);\n\n  // Add X axis\n  const x = d3.scaleLinear().domain([-1, 6]).range([0, width]);\n  svg.append(\"g\").attr(\"transform\", `translate(0, ${height})`).call(d3.axisBottom(x));\n\n  // Y axis\n  const y = d3.scaleBand().range([0, height]).domain(_data_json__WEBPACK_IMPORTED_MODULE_0__.map(function (d) {\n    return d.group;\n  })).padding(1);\n  svg.append(\"g\").call(d3.axisLeft(y));\n\n  // Lines\n  svg.selectAll(\"myline\").data(_data_json__WEBPACK_IMPORTED_MODULE_0__).join(\"line\").attr(\"x1\", function (d) {\n    return x(d.value1);\n  }).attr(\"x2\", function (d) {\n    return x(d.value2);\n  }).attr(\"y1\", function (d) {\n    return y(d.group);\n  }).attr(\"y2\", function (d) {\n    return y(d.group);\n  }).attr(\"stroke\", \"grey\").attr(\"stroke-width\", \"1px\");\n\n  // Circles of variable 1\n  svg.selectAll(\"mycircle\").data(_data_json__WEBPACK_IMPORTED_MODULE_0__).join(\"circle\").attr(\"cx\", function (d) {\n    return x(d.value1);\n  }).attr(\"cy\", function (d) {\n    return y(d.group);\n  }).attr(\"r\", \"6\").style(\"fill\", \"#69b3a2\");\n\n  // Circles of variable 2\n  svg.selectAll(\"mycircle\").data(_data_json__WEBPACK_IMPORTED_MODULE_0__).join(\"circle\").attr(\"cx\", function (d) {\n    return x(d.value2);\n  }).attr(\"cy\", function (d) {\n    return y(d.group);\n  }).attr(\"r\", \"6\").style(\"fill\", \"#4C4082\");\n  svg.selectAll('.tick').select('line').style('stroke', 'white');\n  svg.selectAll('.tick').select('text').style('stroke', 'white');\n\n  // 坐标轴改颜色\n  svg.selectAll('.domain').style('stroke', 'white');\n};\n\n//# sourceURL=webpack://three/./src/d3/2D-dot/index.js?");

/***/ }),

/***/ "./src/d3/2D-dot/data.json":
/*!*********************************!*\
  !*** ./src/d3/2D-dot/data.json ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"group\":\"I\",\"value1\":\"4.338079853\",\"value2\":\"5.148005459\"},{\"group\":\"A\",\"value1\":\"3.917400709\",\"value2\":\"4.76762393\"},{\"group\":\"K\",\"value1\":\"3.202934338\",\"value2\":\"5.20516469\"},{\"group\":\"C\",\"value1\":\"3.277281389\",\"value2\":\"4.686839945\"},{\"group\":\"S\",\"value1\":\"2.55703927\",\"value2\":\"4.964612925\"},{\"group\":\"L\",\"value1\":\"2.336271788\",\"value2\":\"4.625445238\"},{\"group\":\"M\",\"value1\":\"3.531596614\",\"value2\":\"3.107319425\"},{\"group\":\"G\",\"value1\":\"2.402883438\",\"value2\":\"4.145381702\"},{\"group\":\"V\",\"value1\":\"2.663524013\",\"value2\":\"3.829839528\"},{\"group\":\"R\",\"value1\":\"2.428916588\",\"value2\":\"3.892309233\"},{\"group\":\"X\",\"value1\":\"2.455895257\",\"value2\":\"3.83030506\"},{\"group\":\"H\",\"value1\":\"2.246281326\",\"value2\":\"3.976511404\"},{\"group\":\"T\",\"value1\":\"1.94788842\",\"value2\":\"4.229931315\"},{\"group\":\"N\",\"value1\":\"2.399279269\",\"value2\":\"3.386369412\"},{\"group\":\"Z\",\"value1\":\"1.977072126\",\"value2\":\"3.316360129\"},{\"group\":\"E\",\"value1\":\"1.378294374\",\"value2\":\"3.670299094\"},{\"group\":\"U\",\"value1\":\"2.342657877\",\"value2\":\"2.617235344\"},{\"group\":\"Y\",\"value1\":\"0.668982338\",\"value2\":\"2.838572384\"},{\"group\":\"Q\",\"value1\":\"1.025401427\",\"value2\":\"2.046075335\"},{\"group\":\"J\",\"value1\":\"1.073910213\",\"value2\":\"1.593017741\"},{\"group\":\"F\",\"value1\":\"0.164631644\",\"value2\":\"2.500422052\"},{\"group\":\"W\",\"value1\":\"0.768703736\",\"value2\":\"1.772698002\"},{\"group\":\"O\",\"value1\":\"0.746941617\",\"value2\":\"1.577514178\"},{\"group\":\"P\",\"value1\":\"0.522905846\",\"value2\":\"1.673005896\"},{\"group\":\"D\",\"value1\":\"0.343685896\",\"value2\":\"0.737782247\"},{\"group\":\"B\",\"value1\":\"0.125385583\",\"value2\":\"-0.019154415\"}]');\n\n//# sourceURL=webpack://three/./src/d3/2D-dot/data.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/d3/2D-dot/index.js");
/******/ 	
/******/ })()
;