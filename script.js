'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button';


header.append(message)
document.querySelector('.btn--close-cookie').addEventListener
('click', () => {
  message.remove()
})

message.style.backgroundColor = '#37383d'
message.style.width = '120%';

// can change style of page by changing variables
// document.documentElement.style.setProperty('--color-primary', 'aqua')

// attributes - how to edit images and links
const logo = document.querySelector('.nav__logo');
console.log(logo.alt)
logo.alt = 'Beautiful pic'

console.log(logo.src) // returns absolute image
console.log(logo.getAttribute('src')) // returns relative - so just where image is located

// and this is the same with links
const link = document.querySelector('.twitter-link');
console.log(link.href)
console.log(link.getAttribute('href'))

// data attributes - has to start with data and camel case for last part
console.log(logo.dataset.versionNumber)


// scrolling / page navigation
const scrollButton = document.querySelector('.btn--scroll-to')
const sectionOne = document.querySelector('#section--1')

scrollButton.addEventListener('click', () => {
  sectionOne.scrollIntoView({behavior: 'smooth'})
})

// EVENT DELEGATION - when adding to multiple points
// 1. add event listener to common parent element - nav links is parent to nav__link (see below)
// 2. determine which element originated the event

document.querySelector('.nav__links').addEventListener
('click', event => {
  // matching strategy
  event.preventDefault();
  if (event.target.classList.contains('nav__link')) {
    const id = event.target.getAttribute('href');
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', (e) => {
//     e.preventDefault();
//     const id = e.currentTarget.getAttribute('href');
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// events
const h1 = document.querySelector('h1');
const alertH1 = () => {
  alert('add')
  // by having it in function it removes after one, could also set outide of function and add a timer to it
  h1.removeEventListener('mouseover', alertH1)
}

h1.addEventListener('mouseover', alertH1)

console.log(h1.nextElementSibling)

//////////////////////////////////////////
////////////// tab container /////////////
//////////////////////////////////////////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabs.forEach(button => {
  button.addEventListener('click', event => {
    // console.log([...event.currentTarget.parentElement.children])
    // console.log(event.currentTarget.parentElement.children)
    [...event.currentTarget.parentElement.children].forEach(child => child.classList.remove('operations__tab--active'))
    event.currentTarget.classList.add('operations__tab--active')

    const addedContent = document.querySelector(`.operations__content--${event.currentTarget.dataset.tab}`)
    tabsContent.forEach(tab => {

      tab.classList.remove('operations__content--active')
      addedContent.classList.add('operations__content--active')
    })

  })
})

// menu fade animation
const nav = document.querySelector('.nav');

const handleHover = ((e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
      const link = e.target
      // const siblings = link.closest('.nav').querySelectorAll('.nav__link')
      const siblings = nav.querySelectorAll('.nav__link')
      siblings.forEach((sibling) => {
        if (sibling !== link) {
          sibling.style.opacity = `${opacity}`
      }
    })
  }
})


nav.addEventListener('mouseover', event => {
  handleHover(event, 0.5);
})

nav.addEventListener('mouseout', event => {
  handleHover(event, 1);
})

// sticky navbar

// const header = document.querySelector('.header'); - defined above
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const entry = entries[0]; // as only one threshold can just specify the first one, otherwise would need to do a forEach
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// reveal elements on scroll

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// slider - put all in one big function
const slider = () => {

  const slides = document.querySelectorAll('.slide');
  const slideRight = document.querySelector('.slider__btn--right');
  const slideleft = document.querySelector('.slider__btn--left');
  const dotsContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // functions

  const goToSlide = (slide => {
    slides.forEach((element, i) => {element.style.transform = `translateX(${100 * (i-slide) }%)`
    })
  })

  const createDots = function () {
    // [0, 1, 2].forEach(function (_, i) { // use slides to create the right number of elements but this would also work
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    const dots = document.querySelectorAll('.dots__dot');
    dots.forEach(dot => {
      dot.classList.remove('dots__dot--active')
      if (slide == dot.dataset.slide) {
        dot.classList.add('dots__dot--active')
      }
    })
  }

  // jonas solution
  // const activateDot = function (slide) {
  //   document
  //     .querySelectorAll('.dots__dot')
  //     .forEach(dot => dot.classList.remove('dots__dot--active'));
  //   document
  //     .querySelector(`.dots__dot[data-slide="${slide}"]`)
  //     .classList.add('dots__dot--active');
  // };

  createDots()
  activateDot(0) // set first dot as active

  // next slide
  const nextSlide = () => {
    curSlide == maxSlide ? curSlide = 0 : curSlide++
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const previousSlide = () => {
    curSlide == 0 ? curSlide = 0 : curSlide--
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  // event handlers
  slides.forEach((element, i) => {element.style.transform = `translateX(${100 * i}%)`
  })

  slideRight.addEventListener('click', nextSlide)
  slideleft.addEventListener('click', previousSlide)
  document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft')
      previousSlide()
  })
  document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight')
      nextSlide()
  })

  dotsContainer.addEventListener('click', (event) => {
    goToSlide(event.target.dataset.slide)
    activateDot(event.target.dataset.slide)

  })

}

slider()
