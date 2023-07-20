// Scroller
let scroller = document.querySelector(".scroller");

let theHeight =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let theTop = document.documentElement.scrollTop;
  scroller.style.width = `${(theTop / theHeight) * 100}%`;
});

// Navbar

let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    navbar.classList.add("nav-scroll");
  } else {
    navbar.classList.remove("nav-scroll");
  }
});

// Show Video

let lightVideo = document.querySelector(".lightVideo");
let closeVideo = document.querySelector(".closeVideo");
let showVideo = document.querySelector(".showVideo");

showVideo.addEventListener("click", () => {
  lightVideo.classList.add("show");
  document.body.style.overflow = "hidden";
});
closeVideo.addEventListener("click", () => {
  closeVideo.parentElement.classList.remove("show");
  document.body.style.overflow = "auto";
});

/*
  Slider Services handle
*/
let parentSlider = document.querySelector(".parent");
let containerContent = document.querySelector(".services .content");
let theBoxSize = containerContent.querySelector(".box").offsetWidth;
let theChildren = [...containerContent.children];
let theArrows = document.querySelectorAll(".arrows");
let isDragging = false;
let pgX, leftScroller;
let thePlay;

let cardPerView = Math.round(containerContent.offsetWidth / theBoxSize);

theChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    containerContent.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
theChildren.slice(0, cardPerView).forEach((card) => {
  containerContent.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Loop

theArrows.forEach((btn) => {
  btn.addEventListener("click", () => {
    containerContent.scrollLeft += btn.id === "left" ? -theBoxSize : theBoxSize;
  });
});

const dragStart = (e) => {
  isDragging = true;
  containerContent.classList.add("dragging");
  pgX = e.pageX;
  leftScroller = containerContent.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  containerContent.scrollLeft = leftScroller - (e.pageX - pgX);
};

const dragEnd = () => {
  isDragging = false;
  containerContent.classList.remove("dragging");
};
const autoPlay = () => {
  thePlay = setTimeout(() => (containerContent.scrollLeft -= theBoxSize), 3000);
};
// Trigger
autoPlay();
const infinteScroll = () => {
  if (containerContent.scrollLeft === 0) {
    containerContent.scrollLeft =
      containerContent.scrollWidth - 2 * containerContent.offsetWidth;
  } else if (
    Math.ceil(containerContent.scrollLeft) ===
    containerContent.scrollWidth - containerContent.offsetWidth
  ) {
    containerContent.scrollLeft = containerContent.offsetWidth;
  }
  clearTimeout(thePlay);
  if (!parentSlider.matches(":hover")) autoPlay();
};

// Call === Trigger Function
containerContent.addEventListener("mousemove", dragging);
containerContent.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragEnd);
containerContent.addEventListener("scroll", infinteScroll);
parentSlider.addEventListener("mouseenter", () => clearTimeout(thePlay));
parentSlider.addEventListener("mouseleave", autoPlay);

// Start Slides

let theSlides = document.querySelector(".wrapper .slides");
let theItem = document.querySelector(".slides .slider").offsetWidth;
let isDrag = false;
let pX, theScroll;
let arrowsBtn = document.querySelectorAll(".wrapper i");

arrowsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    theSlides.scrollLeft += btn.id === "left" ? -theItem : theItem;
  });
});

const dragstart = (e) => {
  isDrag = true;
  theSlides.classList.add("dragging");
  pX = e.pageX;
  theScroll = theSlides.scrollLeft;
};
const drag = (e) => {
  if (!isDrag) return;
  theSlides.scrollLeft = theScroll - (e.pageX - pX);
};

const dragend = () => {
  isDrag = false;
  theSlides.classList.remove("dragging");
};
theSlides.addEventListener("mousemove", drag);
theSlides.addEventListener("mousedown", dragstart);
document.addEventListener("mouseup", dragend);

let count = document.querySelectorAll(".count");
let secPartner = document.querySelector(".partner");
let started = false;

// Counter

const counter = (el) => {
  let goal = el.dataset.goal;
  let theInterval = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(theInterval);
    }
  }, 3000 / goal);
};

window.addEventListener("scroll", () => {
  if (window.scrollY >= secPartner.offsetTop - 400) {
    if (!started) {
      count.forEach((item) => counter(item));
    }
    started = true;
  }
})

