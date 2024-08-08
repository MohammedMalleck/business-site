import './styles.scss';

const previousViewportWidth = window.innerWidth;
let slide = 0;
const observer = new IntersectionObserver(handleObserver,{root : null , rootMargin :"0px" , threshold : 0.01});

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
  pathEl.style = `--length:${Math.round(pathEl.getTotalLength())}`;  

  document.querySelectorAll('.info-stroke path').forEach(pathEl => {
    pathEl.style = `--length:${pathEl.getTotalLength()}px;`;
  });

  document.querySelectorAll('.whyme-head .icon-container svg path').forEach(pathEl => {
    if(pathEl.style.strokeDashoffset !== "0"){
      pathEl.style = `--length:${pathEl.getTotalLength()}px;`;
    }
  });

};

function handleThemeChange(playAudio,themeIconBtn){
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
  if(playAudio && !navigator.maxTouchPoints > 0){
    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.play();
  }
  themeIconBtn.setAttribute("aria-label",`Switch to ${bodyEl.className === 'dark' ? 'Light' : 'Dark'} Mode`);
};

class CreateAutoSwiper{
  constructor(parentClass,delay,speed,loopCondition){
    new Swiper(parentClass,{
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

function handleObserver(entries){
  entries.forEach(entry => {
    const el = entry.target;
    if(entry.isIntersecting){
      if(el.classList.contains('whyme-card')){
        el.querySelectorAll('.whyme-head .icon-container svg path').forEach(pathEl =>{
          pathEl.style.strokeDashoffset = 0;
        });
      }else if(el.classList.contains('image-holder-contact') || el.classList.contains('form-container')) {
        el.classList.add('move');
      }else if (el.classList.contains("credit-line") || el.classList.contains("credit-text")){
        el.classList.add("show");
      }else{
        el.classList.add('scale');
      }
      observer.unobserve(el);
    };
  });
}

function handleForm(nameEl,userEmailEl,phoneNumberEl,messageEl){
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "mohammedmalleck@gmail.com",
    Password : "8B6C4738CF064C1497CDB97923079A6AFA9E",
    To : 'mohammedmalleck@gmail.com',
    From : "mohammedmalleck@gmail.com",
    Subject : "Contact Form Inquiry",
    Body : `Name : ${nameEl.value}` + "<br>" + `Email : ${userEmailEl.value}` +  "<br>" +  `Phone : ${phoneNumberEl.value.length ? phoneNumberEl.value : "NOT PROVIDED" }` + "<br>" + `Message : ${messageEl.value}`
}).then(
  () => {
    document.querySelector("form button").textContent = "Sent !";
    setTimeout(()=>{
      nameEl.value = "";
      userEmailEl.value = "";
      phoneNumberEl.value = "";
      messageEl.value = "";
      document.querySelector("form button").textContent = "Send";
    },2000);
  }
);
}


displayParticles(3,document.querySelector('body').className === 'dark' ? '#EEEEEE' : '#222831');
initialCalculations();
setTimeout(()=>{
  document.querySelector(".personal-info-container > h2").style = `--cursor-color:var(--cursor-theme-color);`;
},6500);

document.querySelectorAll('.view-container .swiper').forEach(swiperEl => {
  new CreateAutoSwiper(`.${swiperEl.classList[1]}`,3000,1000,true);
});
//observer
document.querySelectorAll('.service-container').forEach(serviceContainerEl => {
  observer.observe(serviceContainerEl);
});
document.querySelectorAll('.whyme-card').forEach(whymeEl => {
  observer.observe(whymeEl);
});
observer.observe(document.querySelector('.image-holder-contact'));
observer.observe(document.querySelector('.form-container'));
observer.observe(document.querySelector('.credit-line'));
observer.observe(document.querySelector('.credit-text'));


window.addEventListener('resize',()=>{

  //re rearrange plarticles only if the change in height is not in 
  //touch devices(it becuase they have a adress bar)
  if(previousViewportWidth !== window.innerWidth){
    const servicesContainerEl = document.querySelector('.services-container');
    const bodyEl = document.querySelector('body');
    const particlesColor = bodyEl.className === 'dark' ? '#66FCF1' : '#1f2c5c';
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = particlesColor;
    pJS.particles.line_linked.color = particlesColor;
    pJS.fn.particlesRefresh();
    //re-assign necessary calculations on reszing screen
    initialCalculations();
    if(servicesContainerEl.clientWidth > 514){
      servicesContainerEl.style = `--scroll-value:0%;`;
      slide = 0;
    }else if(!slide){
      document.querySelector('.slider-arrow-left').style.display = "none";
      document.querySelector('.slider-arrow-right').style.display = "flex";
    }
  }
});

document.querySelectorAll('.theme-icon-container').forEach(themeIconBtn => {
  themeIconBtn.addEventListener('click',()=>{
    handleThemeChange(true,themeIconBtn);
  });
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change' ,()=> {
  handleThemeChange(false)
});

document.querySelector('.loading-page').addEventListener('animationstart',(e)=>{
  if(e.animationName === 'clipAni') document.querySelector('main').style.visibility = 'visible';
});

document.querySelector(".hamburger-icon").addEventListener("click",()=>{
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  hamburgerIcon.classList.toggle('active');
  hamburgerIcon.setAttribute("aria-label",`click to ${hamburgerIcon.classList.contains("active") ? 'hide' : 'expand'} sidebar`);
});

document.querySelector('.dialog-btn').addEventListener('click',()=>{
  document.querySelector("dialog").close();
});
document.querySelectorAll('.service-container .view-container').forEach(viewContainerEl => {
  viewContainerEl.addEventListener('click',()=>{
    document.querySelector("dialog").showModal();
    document.querySelector("dialog .container").className =`container ${(viewContainerEl.parentElement.classList[1])}`;
    document.querySelector('dialog .wrapper').removeAttribute("style");   
    document.querySelector('.scroll-btn-container').classList.remove("hide");
    if(document.querySelector('dialog .wrapper .container').scrollHeight < window.innerHeight){
      document.querySelector('.scroll-btn-container').classList.add("hide");
      document.querySelector('dialog .wrapper').style.height = "fit-content";
    }
  });
});
document.querySelector('dialog .container').addEventListener('scroll',(e)=>{
  const scrollBtnEl = document.querySelector('.scroll-btn-container');
  e.target.scrollTop > 150 ? scrollBtnEl.classList.add("hide") : scrollBtnEl.classList.remove("hide");
});
document.querySelector('.slider-arrow-right').addEventListener('click',()=>{
  const servicesContainerEl = document.querySelector('.services-container');
  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;
  handleServicesSlide(servicesLength,false);

  if(slide > 0){
    document.querySelector('.slider-arrow-left').style.display = "flex";
  }
  if(!(slide < servicesLength)){
    document.querySelector('.slider-arrow-right').style.display = "none"; 
  }
});
document.querySelector('.slider-arrow-left').addEventListener('click',()=>{
  const servicesContainerEl = document.querySelector('.services-container');
  const servicesLength = servicesContainerEl.querySelectorAll('.service-container').length - 1;
  handleServicesSlide(servicesLength,true);

  if(slide < 1){
    document.querySelector('.slider-arrow-left').style.display = "none";
  }
  if(slide < servicesLength){
    document.querySelector('.slider-arrow-right').style.display = "flex"; 
  }
});

document.querySelector("form").addEventListener("submit",(e)=>{
  e.preventDefault();
  document.querySelector("form button").textContent = "Sending...";
  handleForm(document.querySelector(".name-input"),document.querySelector(".email-input"),document.querySelector(".number-input"),document.querySelector(".message-textarea"));
})