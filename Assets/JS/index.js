// const { BorderStyle } = require("@material-ui/icons");

console.log('hi iam JS');





// ===============home section==================
// const video = document.getElementById("home_img3")


// 
swiper
var swiper = new Swiper(".home_container", {
  slidesPerView : 'auto',
  spaceBetween: 30,
  effect: "fade",
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true
});

var swiper = new Swiper(".brands_container", {
  slidesPerView: 4,
  spaceBetween: 20,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true
});




// anime

const text = document.querySelectorAll('.home_data-title')
const img = document.querySelectorAll('.home_img')

const btn = document.querySelectorAll('.btn_img-data')
const textsub = document.querySelectorAll('.home_data-subtitle')

anime({
  targets: text,
  right: 0,
  delay: 300,
  duration: 2500,
  easing: 'easeInOutQuad',
  loop: 3
})


anime({
  targets: textsub,
  left: 0,
  duration: 2500,
  delay: 300,
  easing: 'easeInOutQuad',
  loop: 3

})

anime({
  targets: btn,
  top: 0,
  duration: 2500,
  delay: 300,
  easing: 'easeInOutQuad',
  loop: 3

})


anime({
  targets: img,
  scale: 1.09,
  easing: 'easeInOutQuad',
  delay: 300,
  duration: 3800,
  loop: 2
})

// ==================

function headerheight() {
  
  var x = window.matchMedia("(max-width: 767px)")
  let header = document.getElementById('header')
  let logo = document.getElementById('logo')

  
  if(x.matches && this.scrollY >= 70 ){
    header.classList.add('header_scroll_short');
  }

  else if (this.scrollY >= 70) {
    console.log("hello");
    header.classList.add('header_scroll');
    logo.classList.add('logo_scroll');
  }
  else {
    console.log("HELLO WORLD");
    header.classList.remove('header_scroll');
    header.classList.remove('header_scroll_short');
    logo.classList.remove('logo_scroll')
  }
}


window.addEventListener('scroll', headerheight)

// ==================

// EXPERIENCE 

let buttons = document.querySelectorAll('.ebs');
let tabs = document.querySelectorAll('[data-target]')
let tabsContent = document.querySelectorAll('[data-content]')
let images = document.querySelectorAll('.experience_img');
images = [...images]
boy = images[0];
girl = images[1];
let active = boy;

let heading = document.querySelector('.experience_heading')




tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    tabs.forEach(tab => {
      tab.classList.remove('active-btn')
    })

    tab.classList.add('active-btn')

    let target = document.querySelector(tab.dataset.target);
    // hideing all data content
    tabsContent.forEach(tabsContent => {
      tabsContent.classList.remove('experience_active')
    })

    images.forEach(img => {
      img.classList.remove('experience_active')

    })
    console.log(target.id);

    if (target.id === 'girl') {
      girl.classList.add('experience_active')
    }
    else {
      boy.classList.add('experience_active')
    }

    target.classList.add('experience_active')



  })
})
// SlideShow of Images
// setInterval(() => {
//   images.forEach(img => {
//     img.classList.remove('experience_active')
//   })
//   tabsContent.forEach(tabsContent => {
//     tabsContent.classList.remove('experience_active')
//   })
//   tabs.forEach(tab => {
//     tab.classList.remove('active-btn')
//   })
//   tabs = [...tabs]

//   if (active === boy) {
//     girl.classList.add('experience_active')
//     document.getElementById('girl').classList.add('experience_active')
//     tabs[1].classList.add('active-btn')
//     active = girl;
//   }
//   else {
//     boy.classList.add('experience_active')
//     document.getElementById('boy').classList.add('experience_active')
//     tabs[0].classList.add('active-btn')
//     active = boy;
//   }

// }, 8000);


// Scroll-Up

function scrollUp(){
  const scrollup = document.getElementById('scroll-up');

if(this.scrollY >= 70 ) scrollup.classList.add('scroll-show'); else scrollup.classList.remove('scroll-show')   

console.log("hello");

}

window.addEventListener('scroll',scrollUp);


// SHOW NAV MENU and fillter menu

let toogle = document.getElementById("nav_toogle");
let navMenu = document.getElementById("nav_menu");
let navClose = document.querySelector(".nav_close");
let over = document.querySelector(".overlay");
let fillterMenu = document.querySelector(".fillter-menu");


document.onclick = function(event){
  console.log(event.target.id);
  console.log(event.target.className);

   
  if( event.target.id == "nav-close" || event.target.className == "stop-scrolling" || event.target.className == "overlay visible"){
      navMenu.classList.remove("nav_menu_show")
      if(fillterMenu){
        fillterMenu.classList.remove("nav_menu_show")
      }
    over.classList.remove('visible')
      document.body.classList.remove("stop-scrolling")
  
      
  }
  else if (event.target.className == 'nav_toogle ' || event.target.className == "ri-list-check") {
    navMenu.classList.add("nav_menu_show")
    over.classList.add('visible')
    document.body.classList.add("stop-scrolling")

  }
  else if (event.target.className == 'fillter-btn' || event.target.className == "ri-equalizer-fill") {
    fillterMenu.classList.add("nav_menu_show")
    over.classList.add('visible')
    document.body.classList.add("stop-scrolling")

  }

}





// const height = document.querySelector('.about_detail-box').offsetHeight
// const Cheight = document.querySelector('.cat_detail-box').offsetHeight
// console.log(height);
// console.log(Cheight);


// ABOUT DETAIL BOX AND CAT DETAIL BOX

const icon = document.querySelectorAll(".nav_link-icon");
icon.forEach(icon=>{


  icon.addEventListener('click',()=>{
    // console.log( icon.parentElement.parentElement.nextElementSibling);
    let box = icon.parentElement.parentElement.nextElementSibling;
    let boxParent = icon.parentElement.parentElement.parentElement;
    if(icon.classList.contains('ri-arrow-right-s-line')){
      box.classList.add('visible');
      icon.classList.remove('ri-arrow-right-s-line')
      icon.classList.add('ri-arrow-down-s-line')
      let boxHeight = box.clientHeight;
      boxParent.style.marginBottom = `${boxHeight}px`; 
    }
    else{
      box.classList.remove('visible');
      boxParent.style.marginBottom = '0px'; 
      icon.classList.add('ri-arrow-right-s-line')
      icon.classList.remove('ri-arrow-down-s-line')
    }

  })


})


// ========         SCROOL REVEL    ===//

const sr = ScrollReveal({
  distance: '60px',
  duration: 2800,
  // reset: true,
})

  sr.reveal(`.whats_card, .gallery_product `,{
      origin: 'bottom',
      interval: 100,
  })

  sr.reveal(`.news_card`,{
      origin: 'left',
  })
 
