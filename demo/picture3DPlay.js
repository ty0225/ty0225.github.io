/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/picture/3d-play/index.js":
/*!**************************************!*\
  !*** ./src/picture/3d-play/index.js ***!
  \**************************************/
/***/ (() => {

eval("window.onload = () => {\n  let num = 0;\n  const timejg = 4000; //轮播间隔时间\n  let time = setInterval(() => {\n    move();\n  }, timejg);\n  const containerDom = document.getElementById('j_silder_outer');\n  const imgItems = containerDom.getElementsByClassName('img-item');\n  for (let i = 0; i < imgItems.length; i++) {\n    imgItems[i].style.left = imgItems[i].offsetWidth * i + \"px\";\n    imgItems[i].style.transitionDelay = i * 0.3 + \"s\";\n    const imgs = imgItems[i].getElementsByClassName('img');\n    for (let j = 0; j < imgs.length; j++) {\n      imgs[j].style.backgroundPosition = -imgs[j].offsetWidth * i + \"px\";\n    }\n  }\n  const prev = document.getElementById('prev');\n  const next = document.getElementById('next');\n  prev.addEventListener('click', () => {\n    ++num;\n    for (let i = 0; i < imgItems.length; i++) {\n      imgItems[i].style.transform = `rotateX(${num * 90}deg)`;\n    }\n  });\n  next.addEventListener('click', () => {\n    --num;\n    for (let i = 0; i < imgItems.length; i++) {\n      imgItems[i].style.transform = `rotateX(${num * 90}deg)`;\n    }\n  });\n  containerDom.addEventListener('mouseenter', e => {\n    clearInterval(time);\n  });\n  containerDom.addEventListener('mouseleave', e => {\n    time = setInterval(move, timejg);\n  });\n  function move() {\n    --num;\n    for (let i = 0; i < imgItems.length; i++) {\n      imgItems[i].style.transform = `rotateX(${num * 90}deg)`;\n    }\n  }\n\n  // $(\"#j_silder_outer .img-item\").each(function(index, el) {\n  //     $(this).css({\n  //         \"left\":$(this).width() * index + \"px\",\n  //         /*让每个img-item延时一定时间执行动画*/\n  //         \"transitionDelay\": index * 0.3 + \"s\"\n  //     });\n  //     $(this).find(\".img\").css({\n  //         \"backgroundPosition\": -$(this).width() * index + \"px\"\n  //     });;\n  // });\n\n  // $(\".prev\").on(\"click\",function (){\n  //     $(\"#j_silder_outer .img-item\").css(\"transform\", \"rotateX(\" + (++num * 90) + \"deg)\");\n  // });\n\n  // $(\".next\").on(\"click\",function (){\n  //     $(\"#j_silder_outer .img-item\").css(\"transform\", \"rotateX(\" + (--num * 90) + \"deg)\");\n  // });\n\n  // var timejg = 4000;//轮播间隔时间\n  // var time = setInterval(move, timejg);\n  // function move(){\n  //     $(\"#j_silder_outer .img-item\").css(\"transform\", \"rotateX(\" + (--num * 90) + \"deg)\");\n  // }\n  // $('.slider-outer').hover(function(){\n  //     clearInterval(time);\n  // },function(){\n  //     time = setInterval(move,timejg);\n  // });\n};\n\n//# sourceURL=webpack://three/./src/picture/3d-play/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/picture/3d-play/index.js"]();
/******/ 	
/******/ })()
;