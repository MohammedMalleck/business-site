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

/***/ "./main/check.js":
/*!***********************!*\
  !*** ./main/check.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   noMotion: () => (/* binding */ noMotion),\n/* harmony export */   oldSafariVersion: () => (/* binding */ oldSafariVersion)\n/* harmony export */ });\nconst motionDisabled = window.matchMedia('(prefers-reduced-motion: reduce)');\nconst ua = window.navigator.userAgent;\nconst iOS = ua.match(/Macintosh/i) || ua.match(/iPad/i) || ua.match(/iPhone/i);\nconst webkit = ua.match(/WebKit/i);\nconst iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/EdgiOS/i) && !ua.match(/Chrome/i) && !ua.match(/Edg/i);\nconst safariVersionMatch = ua.match(/Version\\/(\\d+(\\.\\d+)?)/);\nconst oldSafariVersion =  iOSSafari && parseFloat(safariVersionMatch[1]) < 17; \nconst noMotion  = motionDisabled.matches;\n\n//# sourceURL=webpack:///./main/check.js?");

/***/ }),

/***/ "./main/script.js":
/*!************************!*\
  !*** ./main/script.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./main/styles.scss\");\n/* harmony import */ var _check_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check.js */ \"./main/check.js\");\n\n\n//variables\nconst previousViewportWidth = window.innerWidth;\nlet slide = 0;\nlet autoScrollRight = true;\nlet autoScrollLeft;\nlet intervalId;\nlet timeoutId;\nconst observer = new IntersectionObserver(handleObserver,{root : null , rootMargin :\"0px\" , threshold : 0.01});\n//function & classes defined\nfunction displayParticles(speed,color){\n  particlesJS(\"particles-js\",\n    {\n       \"particles\": {\n         \"number\": {\n           \"value\": 100,\n           \"density\": {\n             \"enable\": true,\n             \"value_area\": 1100\n           }\n         },\n         \"color\": {\n           \"value\": color\n         },\n         \"shape\": {\n           \"type\": \"circle\",\n           \"stroke\": {\n             \"width\": 0,\n             \"color\": color\n           },\n           \"polygon\": {\n             \"nb_sides\": 5\n           },\n           \"image\": {\n             \"src\": \"img/github.svg\",\n             \"width\": 100,\n             \"height\": 100\n           }\n         },\n         \"opacity\": {\n           \"value\": 0.5,\n           \"random\": false,\n           \"anim\": {\n             \"enable\": false,\n             \"speed\": 1,\n             \"opacity_min\": 0.1,\n             \"sync\": false\n           }\n         },\n         \"size\": {\n           \"value\": 3,\n           \"random\": true,\n           \"anim\": {\n             \"enable\": false,\n             \"speed\": 40,\n             \"size_min\": 0.1,\n             \"sync\": false\n           }\n         },\n         \"line_linked\": {\n           \"enable\": true,\n           \"distance\": 150,\n           \"color\": color,\n           \"opacity\": 0.4,\n           \"width\": 1\n         },\n         \"move\": {\n           \"enable\": true,\n           \"speed\":speed,\n           \"direction\": \"none\",\n           \"random\": false,\n           \"straight\": false,\n           \"out_mode\": \"out\",\n           \"bounce\": false,\n           \"attract\": {\n             \"enable\": false,\n             \"rotateX\": 600,\n             \"rotateY\": 1200\n           }\n         }\n       },\n       \"interactivity\": {\n         \"detect_on\": \"canvas\",\n         \"events\": {\n           \"onhover\": {\n             \"enable\": false,\n             \"mode\": \"repulse\"\n           },\n           \"onclick\": {\n             \"enable\": true,\n             \"mode\": \"push\"\n           },\n           \"resize\": true\n         },\n         \"modes\": {\n           \"grab\": {\n             \"distance\": 400,\n             \"line_linked\": {\n               \"opacity\": 1\n             }\n           },\n           \"bubble\": {\n             \"distance\": 400,\n             \"size\": 40,\n             \"duration\": 2,\n             \"opacity\": 8,\n             \"speed\": 3\n           },\n           \"repulse\": {\n             \"distance\": 200,\n             \"duration\": 0.4\n           },\n           \"push\": {\n             \"particles_nb\": 4\n           },\n           \"remove\": {\n             \"particles_nb\": 2\n           }\n         }\n       },\n       \"retina_detect\": true\n  });\n};\n\nfunction initialCalculations(){\n  const loadingContainer = document.querySelector('.loading-container');\n  loadingContainer.removeAttribute('style');\n  const svgLeftPx = (loadingContainer.clientWidth / 2) - (loadingContainer.querySelector(\"svg\").clientWidth / 2);\n  loadingContainer.style = `--svg-left:${svgLeftPx}px;`\n  const pathEl = loadingContainer.querySelector('svg > path');\n  pathEl.style = `--length:${Math.round(pathEl.getTotalLength()) + 3}`;  \n\n  document.querySelectorAll('.info-stroke path').forEach(pathEl => {\n    pathEl.style = `--length:${pathEl.getTotalLength()}px;`;\n  });\n\n  document.querySelectorAll('.whyme-head .icon-container svg path').forEach(pathEl => {\n    if(pathEl.style.strokeDashoffset !== \"0\"){\n      pathEl.style = `--length:${pathEl.getTotalLength()}px;`;\n    }\n  });\n\n};\n\nfunction handleThemeChange(themeClass){\n  const audioEl = document.querySelector('audio');\n  const bodyEl = document.querySelector('body');\n  bodyEl.classList.add(themeClass);\n  bodyEl.classList.remove(themeClass === \"dark\" ? \"light\" : \"dark\");\n  const particlesColor = bodyEl.classList.contains(\"dark\") ? '#66FCF1' : '#1f2c5c';\n  if(window.pJSDom[0]){\n    const pJS = window.pJSDom[0].pJS;\n    pJS.particles.color.value = particlesColor;\n    pJS.particles.line_linked.color = particlesColor;\n    pJS.fn.particlesRefresh();\n    localStorage.setItem('theme',JSON.stringify(bodyEl.className));\n  }\n\n  //play the sound effect \n  if(!navigator.maxTouchPoints > 0 && !_check_js__WEBPACK_IMPORTED_MODULE_1__.oldSafariVersion){\n    audioEl.pause();\n    audioEl.currentTime = 0;\n    audioEl.play();\n  }\n  document.querySelectorAll('.theme-icon-container').forEach(themeIconEl => {\n    themeIconEl.setAttribute(\"aria-label\",`Switch to ${bodyEl.classList.contains(\"dark\") ? 'Light' : 'Dark'} Mode`);\n  });\n};\n\nclass CreateAutoSwiper{\n  constructor(parentClass,delay,speed,loopCondition){\n    new Swiper(parentClass,{\n      preloadImages  : false,\n      direction: 'horizontal',\n      loop: loopCondition,\n      autoplay: {\n        delay: delay,\n        pauseOnMouseEnter: false,\n        disableOnInteraction: false,\n      },\n      speed: speed\n    });\n  };\n};\n\nfunction handleServicesSlide(servicesLength,isLeft){\n  const servicesContainerEl = document.querySelector('.services-container');\n  const gap = parseFloat(getComputedStyle(servicesContainerEl).getPropertyValue('gap'));\n  slide = !isLeft ? (slide < servicesLength ? slide + 1 : 0) : (slide > 0 ? slide - 1 : '');\n  const gapPx = (gap * slide) + 'px';\n  const scrollPercentage = (100 * slide);\n  servicesContainerEl.style = `--scroll-value:calc((${scrollPercentage}% + ${gapPx})* -1);`;\n};\nfunction handleLeftScroll(){\n  const servicesContainerEl = document.querySelector('.services-container');\n  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;\n  handleServicesSlide(servicesLength,true);\n\n  if(slide < 1) document.querySelector('.slider-arrow-left').style.display = \"none\";\n  if(slide < servicesLength) document.querySelector('.slider-arrow-right').style.display = \"flex\"; \n}\nfunction handleRightScroll(){\n  const servicesContainerEl = document.querySelector('.services-container');\n  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;\n  handleServicesSlide(servicesLength,false);\n\n  if(slide > 0) document.querySelector('.slider-arrow-left').style.display = \"flex\";\n  if(slide === servicesLength) document.querySelector('.slider-arrow-right').style.display = \"none\"; \n}\n\nfunction autoSlide(){\n  clearInterval(intervalId);\n  const servicesContainerEl = document.querySelector('.services-container');\n  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;\n  if(getComputedStyle(document.querySelector('.slide-arrow-container')).display === \"none\") return;\n  intervalId = setInterval(()=>{\n    if (slide < servicesLength && !autoScrollLeft){\n      handleRightScroll();\n      autoScrollRight = false;\n    }else if(!autoScrollRight && slide !== 0){\n      autoScrollLeft = true;\n      handleLeftScroll();\n    }else if(slide === 0){\n      autoScrollRight = true;\n      autoScrollLeft = false;\n    }\n  },6000);\n};\n\n\nfunction handleObserver(entries){\n  entries.forEach(entry => {\n    const el = entry.target;\n    if(entry.isIntersecting){\n      if(el.classList.contains('whyme-card')){\n        el.querySelectorAll('.whyme-head .icon-container svg path').forEach(pathEl =>{\n          pathEl.style.strokeDashoffset = 0;\n        });\n      }else if(el === document.querySelector(\"#contact\")) {\n        el.classList.add('intersected');\n        document.querySelector(\".whatsapp-icon\").classList.add(\"show\")\n      }else if (el === document.querySelector(\"footer\")){\n        el.querySelector(\".credit-line\").classList.add(\"show\");\n        el.querySelector(\".credit-text\").classList.add(\"show\");\n      }else{\n        el.classList.add('scale');\n      }\n    }else if(!entry.isIntersecting && el === document.querySelector(\"#contact\")){\n     document.querySelector(\".whatsapp-icon\").classList.remove(\"show\");\n    };\n  });\n}\n\n//functions & classes invoked/used\nsetTimeout(()=>{\n  autoSlide();\n},5000);\n\nif(!_check_js__WEBPACK_IMPORTED_MODULE_1__.oldSafariVersion && !_check_js__WEBPACK_IMPORTED_MODULE_1__.noMotion){\n  displayParticles(3,document.querySelector('body').classList.contains(\"dark\") ? '#EEEEEE' : '#222831');\n  setTimeout(()=>{\n    document.querySelector(\".personal-info-container > h2\").style = `--cursor-color:var(--cursor-theme-color);`;\n  },6800);\n}else document.querySelector(\"body\").classList.add(\"lower-version\");\ninitialCalculations();\nemailjs.init({\n  publicKey: \"9oK2xJrqwmKF0O2Dx\",\n});\n\ndocument.querySelectorAll('.view-container .swiper').forEach(swiperEl => {\n  new CreateAutoSwiper(`.${swiperEl.classList[1]}`,2000,1000,true);\n});\n//observer\ndocument.querySelectorAll('.service-container').forEach(serviceContainerEl => {\n  observer.observe(serviceContainerEl);\n});\ndocument.querySelectorAll('.whyme-card').forEach(whymeEl => {\n  observer.observe(whymeEl);\n});\nobserver.observe(document.querySelector('#contact'));\nobserver.observe(document.querySelector(\"footer\"));\n\n//event listeners\nwindow.addEventListener('resize',()=>{\n  //execute reszie code only if width is changed...not height\n  if(previousViewportWidth !== window.innerWidth){\n    const servicesContainerEl = document.querySelector('.services-container');\n    const bodyEl = document.querySelector('body');\n    const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';\n    if(window.pJSDom[0]){\n      const pJS = window.pJSDom[0].pJS;\n      pJS.particles.color.value = particlesColor;\n      pJS.particles.line_linked.color = particlesColor;\n      pJS.fn.particlesRefresh();\n    }\n    //re-assign necessary calculations on reszing screen\n    initialCalculations();\n    if(servicesContainerEl.clientWidth > 514){\n      servicesContainerEl.style = `--scroll-value:0%;`;\n      slide = 0;\n    }else if(!slide){\n      document.querySelector('.slider-arrow-left').style.display = \"none\";\n      document.querySelector('.slider-arrow-right').style.display = \"flex\";\n    }\n    autoSlide();\n  }\n});\n\ndocument.querySelectorAll('.theme-icon-container').forEach(themeIconBtn => {\n  themeIconBtn.addEventListener('click',()=>{\n    handleThemeChange(document.querySelector(\"body\").classList.contains(\"dark\") ? \"light\" : \"dark\");\n  });\n});\n\nwindow.matchMedia(\"(prefers-color-scheme: dark)\").addEventListener('change' ,(e)=> {\n  handleThemeChange(false,e.matches ? \"dark\" : \"light\");\n});\nwindow.matchMedia(\"(prefers-reduced-motion: reduce)\").addEventListener('change' ,(e)=> {\n if(e.matches){\n    pJSDom[0].pJS.fn.vendors.destroypJS();\n    pJSDom = [];\n    document.querySelector(\"body\").classList.add(\"lower-version\");\n    document.querySelector(\".personal-info-container > h2\").removeAttribute(\"style\");\n }else{\n  displayParticles(3,document.querySelector('body').classList.contains(\"dark\") ? '#EEEEEE' : '#222831');\n  document.querySelector(\"body\").classList.remove(\"lower-version\");\n }\n});\n\ndocument.querySelector('.loading-page').addEventListener('animationstart',(e)=>{\n  if(e.animationName === 'clipAni' || \"hidePage\") document.querySelector('main').style.visibility = 'visible';\n});\n\ndocument.querySelector(\".hamburger-icon\").addEventListener(\"click\",()=>{\n  const hamburgerIcon = document.querySelector(\".hamburger-icon\");\n  hamburgerIcon.classList.toggle('active');\n  hamburgerIcon.setAttribute(\"aria-label\",`click to ${hamburgerIcon.classList.contains(\"active\") ? 'hide' : 'expand'} sidebar`);\n});\n\n//dialog\ndocument.querySelectorAll('.service-container .view-container').forEach(viewContainerEl => {\n  viewContainerEl.addEventListener('click',(e)=>{\n    if (e.target.parentElement.tagName === \"A\") return;\n    document.querySelector(\".preview-project-dialog\").showModal();\n    document.querySelector(\".preview-project-dialog .container\").className =`container ${(viewContainerEl.parentElement.classList[1])}`;\n    document.querySelector('.preview-project-dialog .wrapper').removeAttribute(\"style\");   \n    document.querySelector('.scroll-btn-container').classList.remove(\"hide\");\n    if(document.querySelector('.preview-project-dialog .wrapper .container').scrollHeight < window.innerHeight){\n      document.querySelector('.scroll-btn-container').classList.add(\"hide\");\n      document.querySelector('.preview-project-dialog .wrapper').style.height = \"fit-content\";\n    }\n  });\n});\ndocument.querySelector('.preview-project-dialog .container').addEventListener('scroll',(e)=>{\n  const scrollBtnEl = document.querySelector('.scroll-btn-container');\n  e.target.scrollTop > 150 ? scrollBtnEl.classList.add(\"hide\") : scrollBtnEl.classList.remove(\"hide\");\n});\n\ndocument.querySelector(\"dialog .container\").addEventListener(\"click\",(e)=>{\n  e.stopPropagation();\n});\ndocument.querySelector(\".scroll-btn-container\").addEventListener(\"click\",(e)=>{\n  e.stopPropagation();\n});\n\ndocument.querySelector(\"body\").addEventListener(\"click\",()=>{\n  document.querySelector(\".preview-project-dialog\").close();\n  document.querySelector('.preview-project-dialog .container').scrollTop = 0;\n});\n\n//right slide button\ndocument.querySelector('.slider-arrow-right').addEventListener('click',()=>{\n  clearInterval(intervalId);\n  clearTimeout(timeoutId);\n  handleRightScroll();\n\n  timeoutId = setTimeout(()=>{\n    autoSlide();\n  },3000);\n});\n//left slide button\ndocument.querySelector('.slider-arrow-left').addEventListener('click',()=>{\n  clearInterval(intervalId);\n  clearTimeout(timeoutId);\n  handleLeftScroll();\n\n  timeoutId = setTimeout(()=>{\n    autoSlide();\n  },3000);\n});\n\ndocument.querySelector(\"form\").addEventListener(\"submit\",(e)=>{\n  e.preventDefault();\n  document.querySelector(\"form button\").textContent = \"Sending...\";\n  emailjs.sendForm('contact_service', 'contact_form', document.querySelector(\"form\"))\n  .then(() => {\n    document.querySelector(\"form button\").textContent = \"Sent!\"\n    setTimeout(()=>{\n    document.querySelector(\".name-input\").value = \"\";\n    document.querySelector(\".email-input\").value = \"\";\n    document.querySelector(\".number-input\").value = \"\";\n    document.querySelector(\".message-textarea\").value = \"\";\n    document.querySelector(\"form button\").textContent = \"Send\";\n    },2500);\n  }, (error) => {\n    //show error section div here \n    document.querySelector(\"dialog.error\").showModal();\n  });\n});\n\n//# sourceURL=webpack:///./main/script.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./main/script.js");
/******/ 	
/******/ })()
;