console.log('hi iam JS');


// ===============home section==================
// const video = document.getElementById("home_img3")



// swiper
var swiper = new Swiper(".home_container", {
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
    loop:true
  });


// anime

 const text = document.querySelectorAll('.home_data-title')
 const img = document.querySelectorAll('.home_img')

 const btn = document.querySelectorAll('.btn_img-data')
 const textsub = document.querySelectorAll('.home_data-subtitle')

anime({
  targets:text,
  right:0,
  delay: 300,
  duration:2500,
  easing: 'easeInOutQuad',
  loop:3  
})


anime({
  targets:textsub,
  left:0,
  duration:2500,
  delay: 300,
  easing: 'easeInOutQuad',
  loop:3  
   
})

anime({
  targets:btn,
  top:0,
  duration:2500,
  delay: 300,
  easing: 'easeInOutQuad',
  loop: 3  
   
})


anime({
  targets:img,
  scale:1.09,
  easing: 'easeInOutQuad',
  delay: 300,
  duration:3800,
  loop:2  
})

// ==================

function headerheight() {
  let header = document.getElementById('header')
  let logo = document.getElementById('logo')
  if(this.scrollY >=70) {
    header.classList.add('header_scroll');
    logo.classList.add('logo_scroll');
  }
  else{
    header.classList.remove('header_scroll');
    logo.classList.remove('logo_scroll')
  }
}


window.addEventListener('scroll',headerheight)

// ==================

