console.log('hi iam JS');


// ===============home section==================
// const video = document.getElementById("home_img3")



swiper
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
  let header = document.getElementById('header')
  let logo = document.getElementById('logo')
  if (this.scrollY >= 70) {
    header.classList.add('header_scroll');
    logo.classList.add('logo_scroll');
  }
  else {
    header.classList.remove('header_scroll');
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
setInterval(() => {
  images.forEach(img => {
    img.classList.remove('experience_active')
  })
  tabsContent.forEach(tabsContent => {
    tabsContent.classList.remove('experience_active')
  })
  tabs.forEach(tab => {
    tab.classList.remove('active-btn')
  })
  tabs = [...tabs]

  if (active === boy) {
    girl.classList.add('experience_active')
    document.getElementById('girl').classList.add('experience_active')
    tabs[1].classList.add('active-btn')
    active = girl;
  }
  else {
    boy.classList.add('experience_active')
    document.getElementById('boy').classList.add('experience_active')
    tabs[0].classList.add('active-btn')
    active = boy;
  }

}, 8000);


// Scroll-Up

function scrollUp(){
  const scrollup = document.getElementById('scroll-up');

if(this.scrollY >= 70 ) scrollup.classList.add('scroll-show'); else scrollup.classList.remove('scroll-show')   



}

window.addEventListener('scroll',scrollUp);
