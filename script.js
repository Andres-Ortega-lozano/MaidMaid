/*--------- menu btn for MOBILE  ---------*/

((d)=>{
    const btnMenu = d.querySelector(".menu-btn"),
    menu = d.querySelector(".menu");
    
    btnMenu.addEventListener("click",(_e) => {
        btnMenu.firstElementChild.classList.toggle("none");
        btnMenu.lastElementChild.classList.toggle("none");
        menu.classList.toggle("is-active")
    });

    d.addEventListener("click", (e) =>{

        if (!e.target.matches(".menu a")) return false;
            btnMenu.firstElementChild.classList.remove("none");
            btnMenu.lastElementChild.classList.add("none");
            menu.classList.remove("is-active");
        
    });

})(document);


/* home booking interface */

  // Button elements
  const openLocationBtn = document.getElementById("openLocationModal");
  const openDateBtn = document.getElementById("openDateModal");
  const openTimeBtn = document.getElementById("openTimeModal");

  // Label spans
  const locationLabel = document.getElementById("locationLabel");
  const dateLabel = document.getElementById("dateLabel");
  const timeLabel = document.getElementById("timeLabel");

  // Modals
  const locationModal = document.getElementById("locationModal");
  const dateModal = document.getElementById("dateModal");
  const timeModal = document.getElementById("timeModal");

  // Open modals
  openLocationBtn.onclick = () => locationModal.style.display = "flex";
  openDateBtn.onclick = () => dateModal.style.display = "flex";
  openTimeBtn.onclick = () => timeModal.style.display = "flex";

  // Close modals
  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-close");
      document.getElementById(id).style.display = "none";
    });
  });

  
  

  // Click outside to close
  window.addEventListener("click", e => {
    [locationModal, dateModal, timeModal].forEach(modal => {
      if (e.target === modal) modal.style.display = "none";
    });
  });

  // City selection
  locationModal.querySelectorAll("li").forEach(li => {
    li.onclick = () => {
      locationLabel.textContent = li.textContent;
      locationModal.style.display = "none";
    };
  });

  // Date selection
  

  flatpickr("#flatpickrInput", {
    altInput: true,
    altFormat: "F j, Y", // e.g., "September 12, 2025"
    dateFormat: "Y-m-d",
    minDate: "today", //  Disable past dates
    disable: [
      function(date) {
        //  Disable weekends (Sunday = 0, Saturday = 6)
        return (date.getDay() === 0 || date.getDay() === 6);
      }
    ],
    onChange: function(selectedDates, dateStr, instance) {
      if (selectedDates.length === 1) {
        const selected = selectedDates[0].toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        document.getElementById("dateLabel").textContent = selected;
        document.getElementById("dateModal").style.display = "none";
      }
    }
  });
  
  

  // 30-min time slots from 8AM to 6PM
  const timeList = document.getElementById("timeList");
  for (let hour = 8; hour <= 18; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = new Date();
      time.setHours(hour, min);
      const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const li = document.createElement("li");
      li.textContent = timeStr;
      li.onclick = () => {
        timeLabel.textContent = timeStr;
        timeModal.style.display = "none";
      };
      timeList.appendChild(li);
    }
  }



  // REVIEW SECTION

  const reviewsData = [
    {
      name: "Emily Clark",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      stars: 5,
      text: "Amazing service, very professional and helpful!"
    },
    {
      name: "James Bennett",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 4,
      text: "Great experience overall. Would recommend!"
    },
    {
      name: "Sofia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      stars: 5,
      text: "Exceeded all my expectations. Fantastic!"
    },
    {
      name: "Liam Johnson",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      stars: 4,
      text: "Solid work and excellent communication!"
    }
    ,
    {
      name: "Sofia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      stars: 5,
      text: "Exceeded all my expectations. Fantastic!"
    }
  ];
  

  const swiperWrapper = document.getElementById("swiperWrapper");
  let swiper;

  function getSlidesPerView() {
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    if (width >= 768) return 2;
    return 1;
  }

  function initSwiper() {
    const slidesPerView = getSlidesPerView();
    const enableLoop = reviewsData.length > slidesPerView;
    const enableControls = reviewsData.length > slidesPerView;
  
    swiper = new Swiper(".swiper", {
      slidesPerView: slidesPerView,
      slidesPerGroup: slidesPerView,
      spaceBetween: 20,
      loop: enableLoop,
      loopFillGroupWithBlank: enableLoop,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        640: { slidesPerView: 1, slidesPerGroup: 1 },
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        1024: { slidesPerView: 4, slidesPerGroup: 4 }
      }
    });
  
    // ✅ Use a delay to ensure DOM is ready
    setTimeout(() => {
      const swiperEl = document.querySelector(".swiper");
      if (enableControls) {
        swiperEl.classList.add("swiper-controls-visible");
      } else {
        swiperEl.classList.remove("swiper-controls-visible");
      }
    }, 0);
  }
  
  

  function renderSlides() {
    swiperWrapper.innerHTML = "";
    reviewsData.forEach((review) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="d-flex">
          <img src="${review.avatar || 'https://via.placeholder.com/60'}" class="review-avatar" alt="${review.name}" />
          <div style="margin-left: 1rem; align-items: center;" class="d-flex flex-wrap">
            <div class="review-name w-100">${review.name}</div>
            <div class="review-stars">${"★".repeat(review.stars)}${"☆".repeat(5 - review.stars)}</div>
          </div>
        </div>
        <div class="review-text w-100"><q>${review.text}</q></div>
      `;
      swiperWrapper.appendChild(slide);
    });

    if (swiper) swiper.destroy(true, true);
    initSwiper();
  }

  function submitReview(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const stars = parseInt(document.getElementById("stars").value);
    const text = document.getElementById("text").value.trim();
    const avatarInput = document.getElementById("avatar");
    const file = avatarInput.files[0];

    if (!name || !stars || !text) {
      alert("Please fill all required fields.");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const avatar = reader.result;
        reviewsData.push({ name, avatar, stars, text });
        renderSlides();
        swiper.slideTo(reviewsData.length - 1);
        document.querySelector(".review-form").reset();
      };
      reader.readAsDataURL(file);
    } else {
      const avatar = "https://via.placeholder.com/60";
      reviewsData.push({ name, avatar, stars, text });
      renderSlides();
      swiper.slideTo(reviewsData.length - 1);
      document.querySelector(".review-form").reset();
    }
  }

  // On load
  document.addEventListener("DOMContentLoaded", () => {
    renderSlides();
  });

  // Optional: update Swiper on window resize
  window.addEventListener("resize", () => {
    renderSlides();
  });



  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".animate-on-scroll");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    }, {
      threshold: 0.2, // trigger when 10% is visible
    });
  
    elements.forEach(el => observer.observe(el));
  });
  