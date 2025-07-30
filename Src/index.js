document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  navLinkItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Set active nav link based on scroll position
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });

    navLinkItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Project card toggle
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const viewBtn = card.querySelector(".view-project-btn");

    viewBtn.addEventListener("click", function () {
      card.classList.toggle("active");

      if (card.classList.contains("active")) {
        viewBtn.textContent = "Hide Details";
      } else {
        viewBtn.textContent = "View Details";
      }
    });
  });

  // CV download button
  document
    .getElementById("download-cv")
    .addEventListener("click", function (e) {
      e.preventDefault(); // Prevents default link behavior
      const link = document.createElement("a");
      link.href = "assets/Ishan_Pathirana_Resume.pdf"; // Path to your CV file
      link.download = "Ishan_Pathirana_CV.pdf"; // Custom filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Optional: Track downloads (e.g., Google Analytics)
      console.log("CV downloaded!");
    });

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-level");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";

      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        if (entry.target.classList.contains("skills")) {
          animateSkillBars();
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Initialize active section on page load
  const firstNavLink = document.querySelector(".nav-link");
  if (firstNavLink) {
    firstNavLink.classList.add("active");
  }
});
