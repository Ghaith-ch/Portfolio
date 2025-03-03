document.addEventListener("DOMContentLoaded", function () {
  /* ===== Menu Toggle ===== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar ul");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    navbar.classList.toggle("active");
  });

  document.querySelectorAll(".navbar ul li a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navbar.classList.remove("active");
    });
  });

  /* ===== Theme Toggle ===== */
  const themeToggle = document.querySelector(".theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", function () {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });

  /* ===== Skills Slider ===== */
  const skillsWrapper = document.querySelector(".skills-wrapper");
  const skills = document.querySelectorAll(".skill");
  const totalSkills = skills.length;
  
  let skillsPerSlide = 4; // Default for large screens
  let currentIndex = 0;
  
  function updateSkillsPerSlide() {
    if (window.innerWidth <= 768) {
      skillsPerSlide = 2; // 2 skills per slide on small screens
    } else if (window.innerWidth <= 1023) {
      skillsPerSlide = 3; // 3 skills per slide on medium screens
    } else {
      skillsPerSlide = 4; // Default 4 for larger screens
    }
  }
  
  function slideSkills() {
    updateSkillsPerSlide();
    currentIndex += skillsPerSlide;
    if (currentIndex >= totalSkills) {
      currentIndex = 0;
    }
    const translateValue = -(currentIndex * (100 / skillsPerSlide)) + "%";
    skillsWrapper.style.transform = `translateX(${translateValue})`;
  }
  
  updateSkillsPerSlide();
  window.addEventListener("resize", updateSkillsPerSlide);
  setInterval(slideSkills, 2500);

  /* ===== Filtering Functionality ===== */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");
  
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons, then add to clicked button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projects.forEach((project) => {
        // If project should be visible…
        if (filterValue === "all" || project.classList.contains(filterValue)) {
          // Only if it was previously hidden, then show it:
          if (project.style.display === "none") {
            project.style.display = "block";
            // Force reflow to restart transition
            project.offsetWidth;
            project.classList.remove("fade-out");
          }
        } else {
          // Add fade-out class to trigger the CSS opacity transition
          project.classList.add("fade-out");
          // Listen for the transitionend event on opacity
          project.addEventListener("transitionend", function handler(e) {
            if (e.propertyName === "opacity" && project.classList.contains("fade-out")) {
              project.style.display = "none";
              project.removeEventListener("transitionend", handler);
            }
          });
        }
      });
    });
  });



  // === Scroll to Top Button Logic ===
  const scrollBtn = document.getElementById("scrollToTopBtn");

  // 1) Show/hide on scroll
  window.addEventListener("scroll", function () {
    // If scrolled down 200px from the top, show button, otherwise hide it
    if (window.scrollY > 200) {
      scrollBtn.classList.add("active");
    } else {
      scrollBtn.classList.remove("active");
    }
  });

  // 2) Scroll to top on click
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });



});
