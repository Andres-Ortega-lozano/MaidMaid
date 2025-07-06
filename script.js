/*--------- menu btn ---------*/

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