import './styles.scss';

const scrollData = new Map();
const observer = new IntersectionObserver(handleObserver,{root : null , rootMargin : "-50% 0%" , threshold : 0});
const previousViewportHeight = window.innerHeight;

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
             "color": "#000000"
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
  const pathEl = loadingContainer.querySelector('svg > path');
  pathEl.style = `--length:${Math.round(pathEl.getTotalLength())}`;  
  loadingContainer.querySelector('svg').style = `--svg-width:${loadingContainer.querySelector('svg').clientWidth}px;`;

  document.querySelectorAll('.info-stroke path').forEach(pathEl => {
    pathEl.style = `--length:${pathEl.getTotalLength()}px;`;
  });

};

function handleThemeChange(){
  const audioEl = document.querySelector('audio');
  const bodyEl = document.querySelector('body');
  bodyEl.className = document.querySelector('body').className === 'dark' ?  'light' : 'dark';
  const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';
  const pJS = window.pJSDom[0].pJS;
  pJS.particles.color.value = particlesColor;
  pJS.particles.line_linked.color = particlesColor;
  pJS.fn.particlesRefresh();
  localStorage.setItem('theme',JSON.stringify(bodyEl.className));
  //play the sound effect 
  audioEl.pause();
  audioEl.currentTime = 0;
  audioEl.play();
};

function handleScroll(){
  const navigationBarEl = document.querySelector('.navigation-bar');
  const {left : navigationBarElLeft,width : navigationBarElWidth} = navigationBarEl.getBoundingClientRect();
  const arrowEl = document.querySelector('.arrow');
  navigationBarEl.querySelectorAll('a').forEach((menuLinkEl) => {
    const {left,width} = menuLinkEl.getBoundingClientRect();
    const correctLeftValue = left - navigationBarElLeft;
    const leftValuePx = Math.round((correctLeftValue + (width / 2)) - (arrowEl.clientWidth / 2));
    const leftValuePercentage = (leftValuePx / navigationBarElWidth) * 100 + "%";
    scrollData.set(menuLinkEl.textContent.trim().toLowerCase(),leftValuePercentage);
  });

  arrowEl.style.left = scrollData.get('home');

  //set scroll vlaues of sections
  //& observe the sections 
  document.querySelectorAll('.content-container section').forEach(sectionEl => {
    observer.observe(sectionEl);
  });


}
function handleObserver(entries){
  entries.forEach(entry => {
      if(entry.isIntersecting){
        const sectionEl = entry.target;
        const sectionName = sectionEl.id;
        document.querySelector('.arrow').style.left = scrollData.get(sectionName);
        document.querySelector('.navigation-bar a.active').classList.remove('active');
        document.querySelector(`.navigation-bar a.${sectionName}-menu`).classList.add('active');
      }
  });
};

function handleTooltipBarPosition(){
  const activeElInfo = document.querySelector('.personal-info-container > h4 > .active');
  const {left,top,right,width} = activeElInfo.getBoundingClientRect();

  document.querySelector('.tooltip-bar').style.setProperty("--left-end-offset",`${right}px`)
  document.querySelector('.tooltip-bar').style.setProperty("--left-start-offset",`${left}px`)
  document.querySelector('.tooltip-bar').style.top = `${top}px`;
  document.querySelector('.personal-info-container > h4').style.setProperty("--active-width",`${width}px`);
}

function changeEl(){
  const activeEl = document.querySelector('.personal-info-container > h4 > .active');
  const nextElement = activeEl.nextElementSibling ? activeEl.nextElementSibling :document.querySelector(".personal-info-container > h4 > div:nth-child(1)");
  activeEl.classList.remove("active");
  nextElement.className = "active";
  handleTooltipBarPosition();
}

displayParticles(3,document.querySelector('body').className === 'dark' ? '#EEEEEE' : '#222831');
initialCalculations();
handleScroll();

window.addEventListener('resize',()=>{
  //re rearrange plarticles only if the change in height is not in 
  //touch devices(it becuase they have a adress bar)
  if(!(navigator.maxTouchPoints > 0 && (previousViewportHeight > window.innerHeight || previousViewportHeight < window.innerHeight))){
    const bodyEl = document.querySelector('body');
    const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = particlesColor;
    pJS.particles.line_linked.color = particlesColor;
    pJS.fn.particlesRefresh();
  }
  //re-assign necessary calculations on reszing screen
  initialCalculations();
  handleTooltipBarPosition();
});

document.querySelector('.theme-icon-container').addEventListener('click',handleThemeChange);

document.querySelector('.loading-page').addEventListener('animationstart',(e)=>{
  if(e.animationName === 'clipAni') document.querySelector('main').style.visibility = 'visible';
});


document.querySelector('.personal-info-container >  h4').addEventListener('animationstart',()=>{
  const tooltipBarEl = document.querySelector(".tooltip-bar");
  //left transition should be 1.25s(50% of 3s)
  tooltipBarEl.style.transition = "opacity .5s ease , left 1.25s";
  //reflow(getting a smooth left instead of jumping left)
  tooltipBarEl.clientHeight;
  tooltipBarEl.style.left = getComputedStyle(tooltipBarEl).getPropertyValue("--left-start-offset");
  setTimeout(()=>{
    tooltipBarEl.style.opacity = 0;
    tooltipBarEl.style.transition = "opacity .75s ease";
    changeEl();
  },2500 * 0.5);

  //move the tooltip to the new left start value without transition
  setTimeout(()=>{
    tooltipBarEl.style.left = getComputedStyle(tooltipBarEl).getPropertyValue("--left-start-offset");
  },2500 * 0.69);
  //move the tooltip to the new left end value with transition
  setTimeout(()=>{
    tooltipBarEl.style.opacity = 1;
    tooltipBarEl.style.transition = "opacity .5s ease ,  left .6s";
    tooltipBarEl.style.left = getComputedStyle(tooltipBarEl).getPropertyValue("--left-end-offset");
  },2500 * 0.7);


});

document.querySelector('.personal-info-container').addEventListener('animationend',(e)=>{
  const tooltipBarEl = document.querySelector(".tooltip-bar");
  if(e.animationName === "hideText"){
  e.target.className = "";
  e.target.clientWidth;
  e.target.className = "ani";
  e.target.style.animationDelay = "3s";
  }else{
    setTimeout(()=>{
      handleTooltipBarPosition();
      tooltipBarEl.style.transition  = "opacity 2s ease"; 
      tooltipBarEl.style.opacity  = 1;  
      tooltipBarEl.style.left = getComputedStyle(tooltipBarEl).getPropertyValue("--left-end-offset");
    },2000);
  }
});