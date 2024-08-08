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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./main/styles.scss\");\n\n\nconst previousViewportWidth = window.innerWidth;\nlet slide = 0;\nconst observer = new IntersectionObserver(handleObserver,{root : null , rootMargin :\"0px\" , threshold : 0.01});\n\nfunction displayParticles(speed,color){\n  particlesJS(\"particles-js\",\n    {\n       \"particles\": {\n         \"number\": {\n           \"value\": 100,\n           \"density\": {\n             \"enable\": true,\n             \"value_area\": 1100\n           }\n         },\n         \"color\": {\n           \"value\": color\n         },\n         \"shape\": {\n           \"type\": \"circle\",\n           \"stroke\": {\n             \"width\": 0,\n             \"color\": color\n           },\n           \"polygon\": {\n             \"nb_sides\": 5\n           },\n           \"image\": {\n             \"src\": \"img/github.svg\",\n             \"width\": 100,\n             \"height\": 100\n           }\n         },\n         \"opacity\": {\n           \"value\": 0.5,\n           \"random\": false,\n           \"anim\": {\n             \"enable\": false,\n             \"speed\": 1,\n             \"opacity_min\": 0.1,\n             \"sync\": false\n           }\n         },\n         \"size\": {\n           \"value\": 3,\n           \"random\": true,\n           \"anim\": {\n             \"enable\": false,\n             \"speed\": 40,\n             \"size_min\": 0.1,\n             \"sync\": false\n           }\n         },\n         \"line_linked\": {\n           \"enable\": true,\n           \"distance\": 150,\n           \"color\": color,\n           \"opacity\": 0.4,\n           \"width\": 1\n         },\n         \"move\": {\n           \"enable\": true,\n           \"speed\":speed,\n           \"direction\": \"none\",\n           \"random\": false,\n           \"straight\": false,\n           \"out_mode\": \"out\",\n           \"bounce\": false,\n           \"attract\": {\n             \"enable\": false,\n             \"rotateX\": 600,\n             \"rotateY\": 1200\n           }\n         }\n       },\n       \"interactivity\": {\n         \"detect_on\": \"canvas\",\n         \"events\": {\n           \"onhover\": {\n             \"enable\": false,\n             \"mode\": \"repulse\"\n           },\n           \"onclick\": {\n             \"enable\": true,\n             \"mode\": \"push\"\n           },\n           \"resize\": true\n         },\n         \"modes\": {\n           \"grab\": {\n             \"distance\": 400,\n             \"line_linked\": {\n               \"opacity\": 1\n             }\n           },\n           \"bubble\": {\n             \"distance\": 400,\n             \"size\": 40,\n             \"duration\": 2,\n             \"opacity\": 8,\n             \"speed\": 3\n           },\n           \"repulse\": {\n             \"distance\": 200,\n             \"duration\": 0.4\n           },\n           \"push\": {\n             \"particles_nb\": 4\n           },\n           \"remove\": {\n             \"particles_nb\": 2\n           }\n         }\n       },\n       \"retina_detect\": true\n  });\n};\n\nfunction initialCalculations(){\n  const loadingContainer = document.querySelector('.loading-container');\n  loadingContainer.removeAttribute('style');\n  const svgLeftPx = (loadingContainer.clientWidth / 2) - (loadingContainer.querySelector(\"svg\").clientWidth / 2);\n  loadingContainer.style = `--svg-left:${svgLeftPx}px;`\n  const pathEl = loadingContainer.querySelector('svg > path');\n  pathEl.style = `--length:${Math.round(pathEl.getTotalLength())}`;  \n\n  document.querySelectorAll('.info-stroke path').forEach(pathEl => {\n    pathEl.style = `--length:${pathEl.getTotalLength()}px;`;\n  });\n\n  document.querySelectorAll('.whyme-head .icon-container svg path').forEach(pathEl => {\n    if(pathEl.style.strokeDashoffset !== \"0\"){\n      pathEl.style = `--length:${pathEl.getTotalLength()}px;`;\n    }\n  });\n\n};\n\nfunction handleThemeChange(playAudio,themeIconBtn){\n  const audioEl = document.querySelector('audio');\n  const bodyEl = document.querySelector('body');\n  bodyEl.className = document.querySelector('body').className === 'dark' ?  'light' : 'dark';\n  const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';\n  const pJS = window.pJSDom[0].pJS;\n  pJS.particles.color.value = particlesColor;\n  pJS.particles.line_linked.color = particlesColor;\n  pJS.fn.particlesRefresh();\n  localStorage.setItem('theme',JSON.stringify(bodyEl.className));\n\n  //play the sound effect \n  if(playAudio && !navigator.maxTouchPoints > 0){\n    audioEl.pause();\n    audioEl.currentTime = 0;\n    audioEl.play();\n  }\n  themeIconBtn.setAttribute(\"aria-label\",`Switch to ${bodyEl.className === 'dark' ? 'Light' : 'Dark'} Mode`);\n};\n\nclass CreateAutoSwiper{\n  constructor(parentClass,delay,speed,loopCondition){\n    new Swiper(parentClass,{\n      direction: 'horizontal',\n      loop: loopCondition,\n      autoplay: {\n        delay: delay,\n        pauseOnMouseEnter: false,\n        disableOnInteraction: false,\n      },\n      speed: speed\n    });\n  };\n};\n\nfunction handleServicesSlide(servicesLength,isLeft){\n  const servicesContainerEl = document.querySelector('.services-container');\n  const gap = parseFloat(getComputedStyle(servicesContainerEl).getPropertyValue('gap'));\n  slide = !isLeft ? (slide < servicesLength ? slide + 1 : 0) : (slide > 0 ? slide - 1 : '');\n  const gapPx = (gap * slide) + 'px';\n  const scrollPercentage = (100 * slide);\n  servicesContainerEl.style = `--scroll-value:calc((${scrollPercentage}% + ${gapPx})* -1);`;\n};\n\nfunction handleObserver(entries){\n  entries.forEach(entry => {\n    const el = entry.target;\n    if(entry.isIntersecting){\n      if(el.classList.contains('whyme-card')){\n        el.querySelectorAll('.whyme-head .icon-container svg path').forEach(pathEl =>{\n          pathEl.style.strokeDashoffset = 0;\n        });\n      }else if(el.classList.contains('image-holder-contact') || el.classList.contains('form-container')) {\n        el.classList.add('move');\n      }else{\n        el.classList.add('scale');\n      }\n      observer.unobserve(el);\n    };\n  });\n}\n\n\ndisplayParticles(3,document.querySelector('body').className === 'dark' ? '#EEEEEE' : '#222831');\ninitialCalculations();\nsetTimeout(()=>{\n  document.querySelector(\".personal-info-container > h2\").style = `--cursor-color:var(--cursor-theme-color);`;\n},6500);\n\ndocument.querySelectorAll('.view-container .swiper').forEach(swiperEl => {\n  new CreateAutoSwiper(`.${swiperEl.classList[1]}`,3000,1000,true);\n});\n//observer\ndocument.querySelectorAll('.service-container').forEach(serviceContainerEl => {\n  observer.observe(serviceContainerEl);\n});\ndocument.querySelectorAll('.whyme-card').forEach(whymeEl => {\n  observer.observe(whymeEl);\n});\nobserver.observe(document.querySelector('.image-holder-contact'));\nobserver.observe(document.querySelector('.form-container'));\n\n\nwindow.addEventListener('resize',()=>{\n\n  //re rearrange plarticles only if the change in height is not in \n  //touch devices(it becuase they have a adress bar)\n  if(previousViewportWidth !== window.innerWidth){\n    const servicesContainerEl = document.querySelector('.services-container');\n    const bodyEl = document.querySelector('body');\n    const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';\n    const pJS = window.pJSDom[0].pJS;\n    pJS.particles.color.value = particlesColor;\n    pJS.particles.line_linked.color = particlesColor;\n    pJS.fn.particlesRefresh();\n    //re-assign necessary calculations on reszing screen\n    initialCalculations();\n    if(servicesContainerEl.clientWidth > 514){\n      servicesContainerEl.style = `--scroll-value:0%;`;\n      slide = 0;\n    }else if(!slide){\n      document.querySelector('.slider-arrow-left').style.display = \"none\";\n      document.querySelector('.slider-arrow-right').style.display = \"flex\";\n    }\n  }\n});\n\ndocument.querySelectorAll('.theme-icon-container').forEach(themeIconBtn => {\n  themeIconBtn.addEventListener('click',()=>{\n    handleThemeChange(true,themeIconBtn);\n  });\n});\n\nwindow.matchMedia(\"(prefers-color-scheme: dark)\").addEventListener('change' ,()=> {\n  handleThemeChange(false)\n});\n\ndocument.querySelector('.loading-page').addEventListener('animationstart',(e)=>{\n  if(e.animationName === 'clipAni') document.querySelector('main').style.visibility = 'visible';\n});\n\ndocument.querySelector(\".hamburger-icon\").addEventListener(\"click\",()=>{\n  const hamburgerIcon = document.querySelector(\".hamburger-icon\");\n  hamburgerIcon.classList.toggle('active');\n  hamburgerIcon.setAttribute(\"aria-label\",`click to ${hamburgerIcon.classList.contains(\"active\") ? 'hide' : 'expand'} sidebar`);\n});\n\ndocument.querySelector('.dialog-btn').addEventListener('click',()=>{\n  document.querySelector(\"dialog\").close();\n});\ndocument.querySelectorAll('.service-container .view-container').forEach(viewContainerEl => {\n  viewContainerEl.addEventListener('click',()=>{\n    document.querySelector(\"dialog\").showModal();\n    document.querySelector(\"dialog .container\").className =`container ${(viewContainerEl.parentElement.classList[1])}`;\n    document.querySelector('dialog .wrapper').removeAttribute(\"style\");   \n    document.querySelector('.scroll-btn-container').classList.remove(\"hide\");\n    if(document.querySelector('dialog .wrapper .container').scrollHeight < window.innerHeight){\n      document.querySelector('.scroll-btn-container').classList.add(\"hide\");\n      document.querySelector('dialog .wrapper').style.height = \"fit-content\";\n    }\n  });\n});\ndocument.querySelector('dialog .container').addEventListener('scroll',(e)=>{\n  const scrollBtnEl = document.querySelector('.scroll-btn-container');\n  e.target.scrollTop > 150 ? scrollBtnEl.classList.add(\"hide\") : scrollBtnEl.classList.remove(\"hide\");\n});\ndocument.querySelector('.slider-arrow-right').addEventListener('click',()=>{\n  const servicesContainerEl = document.querySelector('.services-container');\n  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;\n  handleServicesSlide(servicesLength,false);\n\n  if(slide > 0){\n    document.querySelector('.slider-arrow-left').style.display = \"flex\";\n  }\n  if(!(slide < servicesLength)){\n    document.querySelector('.slider-arrow-right').style.display = \"none\"; \n  }\n});\ndocument.querySelector('.slider-arrow-left').addEventListener('click',()=>{\n  const servicesContainerEl = document.querySelector('.services-container');\n  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;\n  handleServicesSlide(servicesLength,true);\n\n  if(slide < 1){\n    document.querySelector('.slider-arrow-left').style.display = \"none\";\n  }\n  if(slide < servicesLength){\n    document.querySelector('.slider-arrow-right').style.display = \"flex\"; \n  }\n});\n\n//# sourceURL=webpack:///./main/script.js?");

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