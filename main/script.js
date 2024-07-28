import './styles.scss';

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

function handleArrowPosition(){
  const navigationBarEl = document.querySelector('.navigation-bar');
  const {left : navigationBarElLeft,width : navigationBarElWidth} = navigationBarEl.getBoundingClientRect();
  const arrowEl = document.querySelector('.arrow');
  let variables = ' ';
  navigationBarEl.querySelectorAll('a').forEach((menuLinkEl,index) => {
    const {left,width} = menuLinkEl.getBoundingClientRect();
    const correctLeftValue = left - navigationBarElLeft;
    const leftValuePx = Math.round((correctLeftValue + (width / 2)) - (arrowEl.clientWidth / 2));
    const leftValuePercentage = (leftValuePx / navigationBarElWidth) * 100;
    variables +=  `--left-arrow-${index + 1}:${leftValuePercentage}%;`;
  });

  document.querySelector('main').style = variables;
}



displayParticles(3,document.querySelector('body').className === 'dark' ? '#EEEEEE' : '#222831');
initialCalculations();
handleArrowPosition();

window.addEventListener('resize',()=>{
  const bodyEl = document.querySelector('body');
  const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';
  const pJS = window.pJSDom[0].pJS;
  pJS.particles.color.value = particlesColor;
  pJS.particles.line_linked.color = particlesColor;
  pJS.fn.particlesRefresh();
  //re-assign necessary calculations on reszing screen
  initialCalculations();
});

document.querySelector('.theme-icon-container').addEventListener('click',handleThemeChange);

document.querySelector('.loading-page').addEventListener('animationstart',(e)=>{
  if(e.animationName === 'clipAni') document.querySelector('main').style.visibility = 'visible';
});