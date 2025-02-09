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

/***/ "./src/d3/2D-bar/index.js":
/*!********************************!*\
  !*** ./src/d3/2D-bar/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.json */ \"./src/d3/2D-bar/data.json\");\n\nwindow.onload = () => {\n  // set the dimensions and margins of the graph\n  const margin = {\n      top: 10,\n      right: 30,\n      bottom: 40,\n      left: 100\n    },\n    width = 460 - margin.left - margin.right,\n    height = 500 - margin.top - margin.bottom;\n\n  // append the svg object to the body of the page\n  const svg = d3.select(\"#my_dataviz\").append(\"svg\").attr(\"width\", width + margin.left + margin.right).attr(\"height\", height + margin.top + margin.bottom).append(\"g\").attr(\"transform\", `translate(${margin.left}, ${margin.top})`);\n\n  // sort data\n  _data_json__WEBPACK_IMPORTED_MODULE_0__.sort(function (b, a) {\n    return a.value - b.value;\n  });\n\n  // Add X axis\n  const x = d3.scaleLinear().domain([0, 13000]).range([0, width]);\n  svg.append(\"g\").attr(\"transform\", `translate(0, ${height})`).call(d3.axisBottom(x)).selectAll(\"text\").attr(\"transform\", \"translate(-10,0)rotate(-45)\").style(\"text-anchor\", \"end\");\n\n  // Y axis\n  const y = d3.scaleBand().range([0, height]).domain(_data_json__WEBPACK_IMPORTED_MODULE_0__.map(function (d) {\n    return d.name;\n  })).padding(1);\n  svg.append(\"g\").call(d3.axisLeft(y));\n\n  // Lines\n  svg.selectAll(\"myline\").data(_data_json__WEBPACK_IMPORTED_MODULE_0__).join(\"line\").attr(\"x1\", x(0)).attr(\"x2\", x(0)).attr(\"y1\", function (d) {\n    return y(d.name);\n  }).attr(\"y2\", function (d) {\n    return y(d.name);\n  }).attr(\"stroke\", \"grey\");\n\n  // Circles -> start at X=0\n  svg.selectAll(\"mycircle\").data(_data_json__WEBPACK_IMPORTED_MODULE_0__).join(\"circle\").attr(\"cx\", x(0)).attr(\"cy\", function (d) {\n    return y(d.name);\n  }).attr(\"r\", \"7\").style(\"fill\", \"#69b3a2\").attr(\"stroke\", \"grey\");\n\n  // Change the X coordinates of line and circle\n  svg.selectAll(\"circle\").transition().duration(2000).attr(\"cx\", function (d) {\n    return x(d.value);\n  });\n  svg.selectAll(\"line\").transition().duration(2000).attr(\"x1\", function (d) {\n    return x(d.value);\n  });\n  svg.selectAll('.tick').select('line').style('stroke', 'white');\n  svg.selectAll('.tick').select('text').style('stroke', 'white');\n\n  // 坐标轴改颜色\n  svg.selectAll('.domain').style('stroke', 'white');\n};\n\n//# sourceURL=webpack://three/./src/d3/2D-bar/index.js?");

/***/ }),

/***/ "./src/d3/2D-bar/data.json":
/*!*********************************!*\
  !*** ./src/d3/2D-bar/data.json ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"name\":\"United States\",\"value\":12394},{\"name\":\"Russia\",\"value\":6148},{\"name\":\"Germany\",\"value\":1653},{\"name\":\"France\",\"value\":2162},{\"name\":\"United Kingdom\",\"value\":1214},{\"name\":\"China\",\"value\":1131},{\"name\":\"Spain\",\"value\":814},{\"name\":\"Netherlands\",\"value\":1167},{\"name\":\"Italy\",\"value\":660},{\"name\":\"Poland\",\"value\":1263}]');\n\n//# sourceURL=webpack://three/./src/d3/2D-bar/data.json?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/d3/2D-bar/index.js");
/******/ 	
/******/ })()
;