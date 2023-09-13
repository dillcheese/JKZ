const options = {
  threshold: 0.5, // Trigger when at least 50% of the element is in the viewport
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      observer.unobserve(entry.target);
    }
  });
}, options);

observer.observe(document.querySelector(".fade-in-reg"));
