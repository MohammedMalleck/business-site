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

/***/ "./main/script.js":
/*!************************!*\
  !*** ./main/script.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./main/styles.scss\");\n\n\n// const scrollData = new Map();\n// const observer = new IntersectionObserver(handleObserver,{root : null , rootMargin : `0px 0px 0px 0px` , threshold : 0});\nconst previousViewportWidth = window.innerWidth;\n\n\nfunction displayParticles(speed,color){\n  particlesJS(\"particles-js\",\n    {\n       \"particles\": {\n         \"number\": {\n           \"value\": 100,\n           \"density\": {\n             \"enable\": true,\n             \"value_area\": 1100\n           }\n         },\n         \"color\": {\n           \"value\": color\n         },\n         \"shape\": {\n           \"type\": \"circle\",\n           \"stroke\": {\n             \"width\": 0,\n             \"color\": color\n           },\n           \"polygon\": {\n             \"nb_sides\": 5\n           },\n           \"image\": {\n             \"src\": \"img/github.svg\",\n             \"width\": 100,\n             \"height\": 100\n           }\n         },\n         \"opacity\": {\n           \"value\": 0.5,\n           \"random\": false,\n           \"anim\": {\n             \"enable\": false,\n             \"speed\": 1,\n             \"opacity_min\": 0.1,\n             \"sync\": false\n           }\n         },\n         \"size\": {\n           \"value\": 3,\n           \"random\": true,\n           \"anim\": {\n             \"enable\": false,\n             \"speed\": 40,\n             \"size_min\": 0.1,\n             \"sync\": false\n           }\n         },\n         \"line_linked\": {\n           \"enable\": true,\n           \"distance\": 150,\n           \"color\": color,\n           \"opacity\": 0.4,\n           \"width\": 1\n         },\n         \"move\": {\n           \"enable\": true,\n           \"speed\":speed,\n           \"direction\": \"none\",\n           \"random\": false,\n           \"straight\": false,\n           \"out_mode\": \"out\",\n           \"bounce\": false,\n           \"attract\": {\n             \"enable\": false,\n             \"rotateX\": 600,\n             \"rotateY\": 1200\n           }\n         }\n       },\n       \"interactivity\": {\n         \"detect_on\": \"canvas\",\n         \"events\": {\n           \"onhover\": {\n             \"enable\": false,\n             \"mode\": \"repulse\"\n           },\n           \"onclick\": {\n             \"enable\": true,\n             \"mode\": \"push\"\n           },\n           \"resize\": true\n         },\n         \"modes\": {\n           \"grab\": {\n             \"distance\": 400,\n             \"line_linked\": {\n               \"opacity\": 1\n             }\n           },\n           \"bubble\": {\n             \"distance\": 400,\n             \"size\": 40,\n             \"duration\": 2,\n             \"opacity\": 8,\n             \"speed\": 3\n           },\n           \"repulse\": {\n             \"distance\": 200,\n             \"duration\": 0.4\n           },\n           \"push\": {\n             \"particles_nb\": 4\n           },\n           \"remove\": {\n             \"particles_nb\": 2\n           }\n         }\n       },\n       \"retina_detect\": true\n  });\n};\n\nfunction initialCalculations(){\n  const loadingContainer = document.querySelector('.loading-container');\n  loadingContainer.removeAttribute('style');\n  const svgLeftPx = (loadingContainer.clientWidth / 2) - (loadingContainer.querySelector(\"svg\").clientWidth / 2);\n  loadingContainer.style = `--svg-left:${svgLeftPx}px;`\n  const pathEl = loadingContainer.querySelector('svg > path');\n  pathEl.style = `--length:${Math.round(pathEl.getTotalLength())}`;  \n\n  document.querySelectorAll('.info-stroke path').forEach(pathEl => {\n    pathEl.style = `--length:${pathEl.getTotalLength()}px;`;\n  });\n\n};\n\nfunction handleThemeChange(playAudio = true){\n  const audioEl = document.querySelector('audio');\n  const bodyEl = document.querySelector('body');\n  const themeIconBtn = document.querySelector(\".theme-icon-container\");\n  const themeIconTooltip  = window.getComputedStyle(themeIconBtn,'::after')\n  bodyEl.className = document.querySelector('body').className === 'dark' ?  'light' : 'dark';\n  const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';\n  const pJS = window.pJSDom[0].pJS;\n  pJS.particles.color.value = particlesColor;\n  pJS.particles.line_linked.color = particlesColor;\n  pJS.fn.particlesRefresh();\n  localStorage.setItem('theme',JSON.stringify(bodyEl.className));\n\n  //play the sound effect \n  if(playAudio && !navigator.maxTouchPoints > 0){\n    audioEl.pause();\n    audioEl.currentTime = 0;\n    audioEl.play();\n  }\n  themeIconBtn.setAttribute(\"aria-label\",`${themeIconTooltip.getPropertyValue(\"content\")}`);\n};\n\nfunction handleScroll(){\n  const navigationBarEl = document.querySelector('.navigation-bar');\n  const {left : navigationBarElLeft,width : navigationBarElWidth} = navigationBarEl.getBoundingClientRect();\n  const arrowEl = document.querySelector('.arrow');\n  navigationBarEl.querySelectorAll('a').forEach((menuLinkEl) => {\n    const {left,width} = menuLinkEl.getBoundingClientRect();\n    const correctLeftValue = left - navigationBarElLeft;\n    const leftValuePx = Math.round((correctLeftValue + (width / 2)) - (arrowEl.clientWidth / 2));\n    const leftValuePercentage = (leftValuePx / navigationBarElWidth) * 100 + \"%\";\n    scrollData.set(menuLinkEl.textContent.replace(/\\s+/g, '').toLowerCase(),leftValuePercentage);\n  });\n\n  arrowEl.style.left = scrollData.get('home');\n\n  //set scroll vlaues of sections\n  //& observe the sections \n  document.querySelectorAll('.content-container section').forEach(sectionEl => {\n    observer.observe(sectionEl);\n  });\n\n\n}\nfunction handleObserver(entries){\n  entries.forEach(entry => {\n      if(entry.isIntersecting){\n        const sectionEl = entry.target;\n        const sectionName = sectionEl.id;\n        document.querySelector('.arrow').style.left = scrollData.get(sectionName);\n        document.querySelector('.navigation-bar a.active').classList.remove('active');\n        document.querySelector(`.navigation-bar a.${sectionName}-menu`).classList.add('active');\n      }\n  });\n};\n\ndisplayParticles(3,document.querySelector('body').className === 'dark' ? '#EEEEEE' : '#222831');\ninitialCalculations();\n// handleScroll();\nsetTimeout(()=>{\n  document.querySelector(\".personal-info-container > h2\").style = `--cursor-color:var(--cursor-theme-color);`;\n},6500)\n\nwindow.addEventListener('resize',()=>{\n\n  //re rearrange plarticles only if the change in height is not in \n  //touch devices(it becuase they have a adress bar)\n  if(previousViewportWidth !== window.innerWidth){\n    const bodyEl = document.querySelector('body');\n    const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';\n    const pJS = window.pJSDom[0].pJS;\n    pJS.particles.color.value = particlesColor;\n    pJS.particles.line_linked.color = particlesColor;\n    pJS.fn.particlesRefresh();\n    //re-assign necessary calculations on reszing screen\n    initialCalculations();\n  }\n});\n\ndocument.querySelector('.theme-icon-container').addEventListener('click',handleThemeChange);\n\nwindow.matchMedia(\"(prefers-color-scheme: dark)\").addEventListener('change' ,()=> {\n  handleThemeChange(false)\n});\n\ndocument.querySelector('.loading-page').addEventListener('animationstart',(e)=>{\n  if(e.animationName === 'clipAni') document.querySelector('main').style.visibility = 'visible';\n});\n\n//# sourceURL=webpack:///./main/script.js?");

/***/ }),

/***/ "./main/styles.scss":
/*!**************************!*\
  !*** ./main/styles.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./main/styles.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./main/script.js");
/******/ 	
/******/ })()
;