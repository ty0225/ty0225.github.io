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

/***/ "./src/d3/2D-line&area/index.js":
/*!**************************************!*\
  !*** ./src/d3/2D-line&area/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.json */ \"./src/d3/2D-line&area/data.json\");\n\nwindow.onload = () => {\n  // set the dimensions and margins of the graph\n  const margin = {\n      top: 10,\n      right: 30,\n      bottom: 30,\n      left: 60\n    },\n    width = 460 - margin.left - margin.right,\n    height = 400 - margin.top - margin.bottom;\n\n  // append the svg object to the body of the page\n  const svg = d3.select(\"#my_dataviz\").append(\"svg\").attr(\"width\", width + margin.left + margin.right).attr(\"height\", height + margin.top + margin.bottom).append(\"g\").attr(\"transform\", `translate(${margin.left},${margin.top})`);\n\n  // Add X axis --> it is a date format\n  const x = d3.scaleLinear().domain([1, 100]).range([0, width]);\n  svg.append(\"g\").attr(\"transform\", `translate(0, ${height})`).call(d3.axisBottom(x));\n\n  // Add Y axis\n  const y = d3.scaleLinear().domain([0, 13]).range([height, 0]);\n  svg.append(\"g\").call(d3.axisLeft(y));\n\n  // Show confidence interval\n  svg.append(\"path\").datum(_data_json__WEBPACK_IMPORTED_MODULE_0__).attr(\"fill\", \"#cce5df\").attr(\"stroke\", \"none\").attr(\"d\", d3.area().x(function (d) {\n    return x(d.x);\n  }).y0(function (d) {\n    return y(d.right);\n  }).y1(function (d) {\n    return y(d.left);\n  }));\n\n  // Add the line\n  svg.append(\"path\").datum(_data_json__WEBPACK_IMPORTED_MODULE_0__).attr(\"fill\", \"none\").attr(\"stroke\", \"steelblue\").attr(\"stroke-width\", 1.5).attr(\"d\", d3.line().x(function (d) {\n    return x(d.x);\n  }).y(function (d) {\n    return y(d.y);\n  }));\n  svg.selectAll('.tick').select('line').style('stroke', 'white');\n  svg.selectAll('.tick').select('text').style('stroke', 'white');\n\n  // 坐标轴改颜色\n  svg.selectAll('.domain').style('stroke', 'white');\n};\n\n//# sourceURL=webpack://three/./src/d3/2D-line&area/index.js?");

/***/ }),

/***/ "./src/d3/2D-line&area/data.json":
/*!***************************************!*\
  !*** ./src/d3/2D-line&area/data.json ***!
  \***************************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"x\":1,\"y\":0.03,\"left\":0.008,\"right\":0.1125},{\"x\":2,\"y\":0.04,\"left\":0.008,\"right\":0.15},{\"x\":3,\"y\":0.06,\"left\":0.016,\"right\":0.2},{\"x\":4,\"y\":0.09,\"left\":0.032,\"right\":0.2625},{\"x\":5,\"y\":0.13,\"left\":0.048,\"right\":0.3375},{\"x\":6,\"y\":0.18,\"left\":0.072,\"right\":0.425},{\"x\":7,\"y\":0.25,\"left\":0.112,\"right\":0.5375},{\"x\":8,\"y\":0.33,\"left\":0.168,\"right\":0.675},{\"x\":9,\"y\":0.45,\"left\":0.232,\"right\":0.85},{\"x\":10,\"y\":0.59,\"left\":0.328,\"right\":1.05},{\"x\":11,\"y\":0.76,\"left\":0.448,\"right\":1.2875},{\"x\":12,\"y\":0.97,\"left\":0.608,\"right\":1.5625},{\"x\":13,\"y\":1.22,\"left\":0.792,\"right\":1.8875},{\"x\":14,\"y\":1.52,\"left\":1.016,\"right\":2.2625},{\"x\":15,\"y\":1.85,\"left\":1.28,\"right\":2.6875},{\"x\":16,\"y\":2.24,\"left\":1.584,\"right\":3.1625},{\"x\":17,\"y\":2.66,\"left\":1.92,\"right\":3.6875},{\"x\":18,\"y\":3.13,\"left\":2.288,\"right\":4.275},{\"x\":19,\"y\":3.63,\"left\":2.68,\"right\":4.9125},{\"x\":20,\"y\":4.16,\"left\":3.088,\"right\":5.6},{\"x\":21,\"y\":4.71,\"left\":3.512,\"right\":6.3125},{\"x\":22,\"y\":5.27,\"left\":3.944,\"right\":7.05},{\"x\":23,\"y\":5.83,\"left\":4.376,\"right\":7.775},{\"x\":24,\"y\":6.38,\"left\":4.8,\"right\":8.475},{\"x\":25,\"y\":6.91,\"left\":5.216,\"right\":9.15},{\"x\":26,\"y\":7.4,\"left\":5.608,\"right\":9.7625},{\"x\":27,\"y\":7.85,\"left\":5.976,\"right\":10.3125},{\"x\":28,\"y\":8.25,\"left\":6.304,\"right\":10.7875},{\"x\":29,\"y\":8.59,\"left\":6.592,\"right\":11.1875},{\"x\":30,\"y\":8.86,\"left\":6.816,\"right\":11.5},{\"x\":31,\"y\":9.06,\"left\":6.992,\"right\":11.725},{\"x\":32,\"y\":9.18,\"left\":7.104,\"right\":11.8625},{\"x\":33,\"y\":9.24,\"left\":7.16,\"right\":11.925},{\"x\":34,\"y\":9.22,\"left\":7.152,\"right\":11.9},{\"x\":35,\"y\":9.15,\"left\":7.096,\"right\":11.7875},{\"x\":36,\"y\":9.01,\"left\":6.992,\"right\":11.6125},{\"x\":37,\"y\":8.83,\"left\":6.856,\"right\":11.3625},{\"x\":38,\"y\":8.6,\"left\":6.68,\"right\":11.0625},{\"x\":39,\"y\":8.34,\"left\":6.48,\"right\":10.7125},{\"x\":40,\"y\":8.05,\"left\":6.264,\"right\":10.3375},{\"x\":41,\"y\":7.74,\"left\":6.032,\"right\":9.925},{\"x\":42,\"y\":7.41,\"left\":5.784,\"right\":9.5},{\"x\":43,\"y\":7.08,\"left\":5.536,\"right\":9.0625},{\"x\":44,\"y\":6.76,\"left\":5.288,\"right\":8.6375},{\"x\":45,\"y\":6.43,\"left\":5.04,\"right\":8.2125},{\"x\":46,\"y\":6.11,\"left\":4.792,\"right\":7.7875},{\"x\":47,\"y\":5.81,\"left\":4.56,\"right\":7.3875},{\"x\":48,\"y\":5.51,\"left\":4.336,\"right\":7.0125},{\"x\":49,\"y\":5.24,\"left\":4.12,\"right\":6.6625},{\"x\":50,\"y\":4.98,\"left\":3.92,\"right\":6.325},{\"x\":51,\"y\":4.74,\"left\":3.736,\"right\":6.025},{\"x\":52,\"y\":4.52,\"left\":3.568,\"right\":5.7375},{\"x\":53,\"y\":4.32,\"left\":3.408,\"right\":5.4875},{\"x\":54,\"y\":4.15,\"left\":3.264,\"right\":5.2625},{\"x\":55,\"y\":3.99,\"left\":3.144,\"right\":5.0625},{\"x\":56,\"y\":3.84,\"left\":3.032,\"right\":4.875},{\"x\":57,\"y\":3.71,\"left\":2.928,\"right\":4.7125},{\"x\":58,\"y\":3.59,\"left\":2.832,\"right\":4.5625},{\"x\":59,\"y\":3.49,\"left\":2.752,\"right\":4.425},{\"x\":60,\"y\":3.39,\"left\":2.68,\"right\":4.3},{\"x\":61,\"y\":3.31,\"left\":2.608,\"right\":4.1875},{\"x\":62,\"y\":3.23,\"left\":2.544,\"right\":4.0875},{\"x\":63,\"y\":3.15,\"left\":2.488,\"right\":3.9875},{\"x\":64,\"y\":3.09,\"left\":2.44,\"right\":3.9},{\"x\":65,\"y\":3.02,\"left\":2.392,\"right\":3.825},{\"x\":66,\"y\":2.97,\"left\":2.344,\"right\":3.75},{\"x\":67,\"y\":2.91,\"left\":2.304,\"right\":3.6875},{\"x\":68,\"y\":2.86,\"left\":2.264,\"right\":3.6125},{\"x\":69,\"y\":2.81,\"left\":2.224,\"right\":3.5625},{\"x\":70,\"y\":2.77,\"left\":2.192,\"right\":3.5},{\"x\":71,\"y\":2.73,\"left\":2.152,\"right\":3.45},{\"x\":72,\"y\":2.68,\"left\":2.12,\"right\":3.3875},{\"x\":73,\"y\":2.64,\"left\":2.088,\"right\":3.3375},{\"x\":74,\"y\":2.6,\"left\":2.056,\"right\":3.2875},{\"x\":75,\"y\":2.56,\"left\":2.024,\"right\":3.2375},{\"x\":76,\"y\":2.52,\"left\":1.992,\"right\":3.1875},{\"x\":77,\"y\":2.47,\"left\":1.952,\"right\":3.125},{\"x\":78,\"y\":2.43,\"left\":1.92,\"right\":3.075},{\"x\":79,\"y\":2.39,\"left\":1.888,\"right\":3.0125},{\"x\":80,\"y\":2.34,\"left\":1.848,\"right\":2.9625},{\"x\":81,\"y\":2.29,\"left\":1.808,\"right\":2.9},{\"x\":82,\"y\":2.24,\"left\":1.768,\"right\":2.8375},{\"x\":83,\"y\":2.19,\"left\":1.728,\"right\":2.7625},{\"x\":84,\"y\":2.13,\"left\":1.688,\"right\":2.7},{\"x\":85,\"y\":2.08,\"left\":1.64,\"right\":2.625},{\"x\":86,\"y\":2.02,\"left\":1.592,\"right\":2.55},{\"x\":87,\"y\":1.96,\"left\":1.544,\"right\":2.475},{\"x\":88,\"y\":1.89,\"left\":1.496,\"right\":2.4},{\"x\":89,\"y\":1.83,\"left\":1.44,\"right\":2.325},{\"x\":90,\"y\":1.76,\"left\":1.384,\"right\":2.2375},{\"x\":91,\"y\":1.69,\"left\":1.32,\"right\":2.1625},{\"x\":92,\"y\":1.62,\"left\":1.264,\"right\":2.075},{\"x\":93,\"y\":1.54,\"left\":1.2,\"right\":1.9875},{\"x\":94,\"y\":1.47,\"left\":1.136,\"right\":1.9},{\"x\":95,\"y\":1.39,\"left\":1.072,\"right\":1.8125},{\"x\":96,\"y\":1.32,\"left\":1.008,\"right\":1.725},{\"x\":97,\"y\":1.24,\"left\":0.944,\"right\":1.6375},{\"x\":98,\"y\":1.17,\"left\":0.88,\"right\":1.55},{\"x\":99,\"y\":1.09,\"left\":0.816,\"right\":1.45},{\"x\":100,\"y\":1.02,\"left\":0.752,\"right\":1.3625}]');\n\n//# sourceURL=webpack://three/./src/d3/2D-line&area/data.json?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/d3/2D-line&area/index.js");
/******/ 	
/******/ })()
;