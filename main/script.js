import './styles.scss';
import {noMotion , oldSafariVersion} from './check.js';
//variables
const previousViewportWidth = window.innerWidth;
let slide = 0;
let autoScrollRight = true;
let autoScrollLeft;
let intervalId;
let timeoutId;
const observer = new IntersectionObserver(handleObserver,{root : null , rootMargin :"0px" , threshold : 0.01});
//function & classes defined
function displayParticles(speed,color){
  particlesJS("particles-js",
    {
       "particles": {
         "number": {
           "value": 100,
           "density": {
             "enable": true,
             "value_area": 1100
           }
         },
         "color": {
           "value": color
         },
         "shape": {
           "type": "circle",
           "stroke": {
             "width": 0,
             "color": color
           },
           "polygon": {
             "nb_sides": 5
           },
           "image": {
             "src": "img/github.svg",
             "width": 100,
             "height": 100
           }
         },
         "opacity": {
           "value": 0.5,
           "random": false,
           "anim": {
             "enable": false,
             "speed": 1,
             "opacity_min": 0.1,
             "sync": false
           }
         },
         "size": {
           "value": 3,
           "random": true,
           "anim": {
             "enable": false,
             "speed": 40,
             "size_min": 0.1,
             "sync": false
           }
         },
         "line_linked": {
           "enable": true,
           "distance": 150,
           "color": color,
           "opacity": 0.4,
           "width": 1
         },
         "move": {
           "enable": true,
           "speed":speed,
           "direction": "none",
           "random": false,
           "straight": false,
           "out_mode": "out",
           "bounce": false,
           "attract": {
             "enable": false,
             "rotateX": 600,
             "rotateY": 1200
           }
         }
       },
       "interactivity": {
         "detect_on": "canvas",
         "events": {
           "onhover": {
             "enable": false,
             "mode": "repulse"
           },
           "onclick": {
             "enable": true,
             "mode": "push"
           },
           "resize": true
         },
         "modes": {
           "grab": {
             "distance": 400,
             "line_linked": {
               "opacity": 1
             }
           },
           "bubble": {
             "distance": 400,
             "size": 40,
             "duration": 2,
             "opacity": 8,
             "speed": 3
           },
           "repulse": {
             "distance": 200,
             "duration": 0.4
           },
           "push": {
             "particles_nb": 4
           },
           "remove": {
             "particles_nb": 2
           }
         }
       },
       "retina_detect": true
  });
};

function initialCalculations(){
  const loadingContainer = document.querySelector('.loading-container');
  loadingContainer.removeAttribute('style');
  const svgLeftPx = (loadingContainer.clientWidth / 2) - (loadingContainer.querySelector("svg").clientWidth / 2);
  loadingContainer.style = `--svg-left:${svgLeftPx}px;`
  const pathEl = loadingContainer.querySelector('svg > path');
  pathEl.style = `--length:${Math.round(pathEl.getTotalLength()) + 3}`;  

  document.querySelectorAll('.info-stroke path').forEach(pathEl => {
    pathEl.style = `--length:${pathEl.getTotalLength()}px;`;
  });

  document.querySelectorAll('.whyme-head .icon-container svg path').forEach(pathEl => {
    if(pathEl.style.strokeDashoffset !== "0"){
      pathEl.style = `--length:${pathEl.getTotalLength()}px;`;
    }
  });

};

function handleThemeChange(themeClass){
  const audioEl = document.querySelector('audio');
  const bodyEl = document.querySelector('body');
  bodyEl.classList.add(themeClass);
  bodyEl.classList.remove(themeClass === "dark" ? "light" : "dark");
  const particlesColor = bodyEl.classList.contains("dark") ? '#66FCF1' : '#1f2c5c';
  if(window.pJSDom[0]){
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = particlesColor;
    pJS.particles.line_linked.color = particlesColor;
    pJS.fn.particlesRefresh();
    localStorage.setItem('theme',JSON.stringify(bodyEl.className));
  }

  //play the sound effect 
  if(!navigator.maxTouchPoints > 0 && !oldSafariVersion){
    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.play();
  }
  document.querySelectorAll('.theme-icon-container').forEach(themeIconEl => {
    themeIconEl.setAttribute("aria-label",`Switch to ${bodyEl.classList.contains("dark") ? 'Light' : 'Dark'} Mode`);
  });
};

class CreateAutoSwiper{
  constructor(parentClass,delay,speed,loopCondition){
    new Swiper(parentClass,{
      preloadImages  : false,
      direction: 'horizontal',
      loop: loopCondition,
      autoplay: {
        delay: delay,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
      },
      speed: speed
    });
  };
};

function handleServicesSlide(servicesLength,isLeft){
  const servicesContainerEl = document.querySelector('.services-container');
  const gap = parseFloat(getComputedStyle(servicesContainerEl).getPropertyValue('gap'));
  slide = !isLeft ? (slide < servicesLength ? slide + 1 : 0) : (slide > 0 ? slide - 1 : '');
  const gapPx = (gap * slide) + 'px';
  const scrollPercentage = (100 * slide);
  servicesContainerEl.style = `--scroll-value:calc((${scrollPercentage}% + ${gapPx})* -1);`;
};
function handleLeftScroll(){
  const servicesContainerEl = document.querySelector('.services-container');
  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;
  handleServicesSlide(servicesLength,true);

  if(slide < 1) document.querySelector('.slider-arrow-left').style.display = "none";
  if(slide < servicesLength) document.querySelector('.slider-arrow-right').style.display = "flex"; 
}
function handleRightScroll(){
  const servicesContainerEl = document.querySelector('.services-container');
  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;
  handleServicesSlide(servicesLength,false);

  if(slide > 0) document.querySelector('.slider-arrow-left').style.display = "flex";
  if(slide === servicesLength) document.querySelector('.slider-arrow-right').style.display = "none"; 
}

function autoSlide(){
  clearInterval(intervalId);
  const servicesContainerEl = document.querySelector('.services-container');
  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;
  if(getComputedStyle(document.querySelector('.slide-arrow-container')).display === "none") return;
  intervalId = setInterval(()=>{
    if (slide < servicesLength && !autoScrollLeft){
      handleRightScroll();
      autoScrollRight = false;
    }else if(!autoScrollRight && slide !== 0){
      autoScrollLeft = true;
      handleLeftScroll();
    }else if(slide === 0){
      autoScrollRight = true;
      autoScrollLeft = false;
    }
  },6000);
};


function handleObserver(entries){
  entries.forEach(entry => {
    const el = entry.target;
    if(entry.isIntersecting){
      if(el.classList.contains('whyme-card')){
        el.querySelectorAll('.whyme-head .icon-container svg path').forEach(pathEl =>{
          pathEl.style.strokeDashoffset = 0;
        });
      }else if(el === document.querySelector("#contact")) {
        el.classList.add('intersected');
        document.querySelector(".whatsapp-icon").classList.add("show")
      }else if (el === document.querySelector("footer")){
        el.querySelector(".credit-line").classList.add("show");
        el.querySelector(".credit-text").classList.add("show");
      }else{
        el.classList.add('scale');
      }
    }else if(!entry.isIntersecting && el === document.querySelector("#contact")){
     document.querySelector(".whatsapp-icon").classList.remove("show");
    };
  });
}

//functions & classes invoked/used
setTimeout(()=>{
  autoSlide();
},5000);

if(!oldSafariVersion && !noMotion){
  displayParticles(3,document.querySelector('body').classList.contains("dark") ? '#EEEEEE' : '#222831');
  setTimeout(()=>{
    document.querySelector(".personal-info-container > h2").style = `--cursor-color:var(--cursor-theme-color);`;
  },6800);
}else document.querySelector("body").classList.add("lower-version");
initialCalculations();
emailjs.init({
  publicKey: "9oK2xJrqwmKF0O2Dx",
});

document.querySelectorAll('.view-container .swiper').forEach(swiperEl => {
  new CreateAutoSwiper(`.${swiperEl.classList[1]}`,2000,1000,true);
});
//observer
document.querySelectorAll('.service-container').forEach(serviceContainerEl => {
  observer.observe(serviceContainerEl);
});
document.querySelectorAll('.whyme-card').forEach(whymeEl => {
  observer.observe(whymeEl);
});
observer.observe(document.querySelector('#contact'));
observer.observe(document.querySelector("footer"));

//event listeners
window.addEventListener('resize',()=>{
  //execute reszie code only if width is changed...not height
  if(previousViewportWidth !== window.innerWidth){
    const servicesContainerEl = document.querySelector('.services-container');
    const bodyEl = document.querySelector('body');
    const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';
    if(window.pJSDom[0]){
      const pJS = window.pJSDom[0].pJS;
      pJS.particles.color.value = particlesColor;
      pJS.particles.line_linked.color = particlesColor;
      pJS.fn.particlesRefresh();
    }
    //re-assign necessary calculations on reszing screen
    initialCalculations();
    if(servicesContainerEl.clientWidth > 514){
      servicesContainerEl.style = `--scroll-value:0%;`;
      slide = 0;
    }else if(!slide){
      document.querySelector('.slider-arrow-left').style.display = "none";
      document.querySelector('.slider-arrow-right').style.display = "flex";
    }
    autoSlide();
  }
});

document.querySelectorAll('.theme-icon-container').forEach(themeIconBtn => {
  themeIconBtn.addEventListener('click',()=>{
    handleThemeChange(document.querySelector("body").classList.contains("dark") ? "light" : "dark");
  });
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change' ,(e)=> {
  handleThemeChange(false,e.matches ? "dark" : "light");
});
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener('change' ,(e)=> {
 if(e.matches){
    pJSDom[0].pJS.fn.vendors.destroypJS();
    pJSDom = [];
    document.querySelector("body").classList.add("lower-version");
    document.querySelector(".personal-info-container > h2").removeAttribute("style");
 }else{
  displayParticles(3,document.querySelector('body').classList.contains("dark") ? '#EEEEEE' : '#222831');
  document.querySelector("body").classList.remove("lower-version");
 }
});

document.querySelector('.loading-page').addEventListener('animationstart',(e)=>{
  if(e.animationName === 'clipAni' || "hidePage") document.querySelector('main').style.visibility = 'visible';
});

document.querySelector(".hamburger-icon").addEventListener("click",()=>{
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  hamburgerIcon.classList.toggle('active');
  hamburgerIcon.setAttribute("aria-label",`click to ${hamburgerIcon.classList.contains("active") ? 'hide' : 'expand'} sidebar`);
});

//dialog
document.querySelectorAll('.service-container .view-container').forEach(viewContainerEl => {
  viewContainerEl.addEventListener('click',(e)=>{
    if (e.target.parentElement.tagName === "A") return;
    document.querySelector(".preview-project-dialog").showModal();
    document.querySelector(".preview-project-dialog .container").className =`container ${(viewContainerEl.parentElement.classList[1])}`;
    document.querySelector('.preview-project-dialog .wrapper').removeAttribute("style");   
    document.querySelector('.scroll-btn-container').classList.remove("hide");
    if(document.querySelector('.preview-project-dialog .wrapper .container').scrollHeight < window.innerHeight){
      document.querySelector('.scroll-btn-container').classList.add("hide");
      document.querySelector('.preview-project-dialog .wrapper').style.height = "fit-content";
    }
  });
});
document.querySelector('.preview-project-dialog .container').addEventListener('scroll',(e)=>{
  const scrollBtnEl = document.querySelector('.scroll-btn-container');
  e.target.scrollTop > 150 ? scrollBtnEl.classList.add("hide") : scrollBtnEl.classList.remove("hide");
});

document.querySelector("dialog .container").addEventListener("click",(e)=>{
  e.stopPropagation();
});
document.querySelector(".scroll-btn-container").addEventListener("click",(e)=>{
  e.stopPropagation();
});

document.querySelector("body").addEventListener("click",()=>{
  document.querySelector(".preview-project-dialog").close();
  document.querySelector('.preview-project-dialog .container').scrollTop = 0;
});

//right slide button
document.querySelector('.slider-arrow-right').addEventListener('click',()=>{
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  handleRightScroll();

  timeoutId = setTimeout(()=>{
    autoSlide();
  },3000);
});
//left slide button
document.querySelector('.slider-arrow-left').addEventListener('click',()=>{
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  handleLeftScroll();

  timeoutId = setTimeout(()=>{
    autoSlide();
  },3000);
});

document.querySelector("form").addEventListener("submit",(e)=>{
  e.preventDefault();
  document.querySelector("form button").textContent = "Sending...";
  emailjs.sendForm('contact_service', 'contact_form', document.querySelector("form"))
  .then(() => {
    document.querySelector("form button").textContent = "Sent!"
    setTimeout(()=>{
    document.querySelector(".name-input").value = "";
    document.querySelector(".email-input").value = "";
    document.querySelector(".number-input").value = "";
    document.querySelector(".message-textarea").value = "";
    document.querySelector("form button").textContent = "Send";
    },2500);
  }, (error) => {
    //show error section div here 
    document.querySelector("dialog.error").showModal();
  });
});