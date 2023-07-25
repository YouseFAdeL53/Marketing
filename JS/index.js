// Preload

let preload = document.querySelector(".preload");

window.addEventListener("load", () => {
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    preload.classList.add("loaded");
    document.body.style.overflow = "auto";
  }, 100);
});

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
let video = document.querySelector(".marketing");

showVideo.addEventListener("click", () => {
  lightVideo.classList.add("show");
  document.body.style.overflow = "hidden";
  if (lightVideo.classList.contains("show")) {
    video.play();
  }
});

closeVideo.addEventListener("click", () => {
  closeVideo.parentElement.classList.remove("show");
  document.body.style.overflow = "auto";
  video.pause();
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
let arrowsBtn = document.querySelectorAll(".wrapper i");
theSlides.addEventListener("mousemove", dragging);
theSlides.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragEnd);

arrowsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    theSlides.scrollLeft += btn.id === "left" ? -theItem : theItem;
  });
});

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
});

// Team

let objTeam = [
  {
    id: 1,
    ImageUrl: "image/team.jpeg",
    title: "مدير 1",
    desc: "قائد تسويق",
  },
  {
    id: 2,
    ImageUrl: "image/team1.jpeg",
    title: "مدير 2",
    desc: "قائد تسويق",
  },
  {
    id: 3,
    ImageUrl: "image/team2.jpeg",
    title: "مدير 3",
    desc: "قائد تسويق",
  },
  {
    id: 4,
    ImageUrl: "image/team3.jpeg",
    title: "مدير 4",
    desc: "قائد تسويق",
  },
];

let theItems = document.querySelector(".team .row");
let infoTeam = document.querySelector(".infoTeam");
let theArray = [];

// GetData With Loop

const getData = () => {
  for (let i = 0; i < objTeam.length; i++) {
    theItems.innerHTML += `
            <div class="col-12 col-6 col-lg-3 mb-3 mb-lg-0 text-center">
          <div class="box">
            <div class="image" onclick="getInfo(${i + 1})"><img src="${
      objTeam[i].ImageUrl
    }" alt=""></div>
            <div class="text">
              <h2>${objTeam[i].title}</h2>
              <span>${objTeam[i].desc}</span>
            </div>
          </div>
        </div>
    `;
  }
};

const getInfo = (idx) => {
  infoTeam.classList.add("show");
  document.body.style.overflow = "hidden";
  infoTeam.innerHTML = "";
  let chossen = objTeam.find((item) => item.id == idx);
  let makrUp = `
      <div class="box">
      <div class="name">تسويقي</div>
      <i onclick="closeInfo()" class="fa-solid fa-x close"></i>
      <div class="text">
        <h2>${chossen.title}</h2>
        <p>${chossen.desc}</p>
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="social">
          <i class="fa-brands fa-facebook-f"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-linkedin-in"></i>
          <i class="fa-brands fa-github-alt"></i>
        </div>
      </div>
      <div class="image">
        <img src="${chossen.ImageUrl}" alt="">
      </div>
    </div>
  `;
  infoTeam.innerHTML = makrUp;
};
const closeInfo = () => {
  infoTeam.classList.remove("show");
  document.body.style.overflow = "auto";
};
getData();

// ScrollTop
let scrollTop = document.querySelector(".scrollTop");
let theBullteUl = document.querySelector(".theBullte ul");

window.addEventListener("scroll", () => {
  if (window.scrollY > 800) {
    scrollTop.classList.add("show");
    theBullteUl.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
    theBullteUl.classList.remove("show");
  }
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
