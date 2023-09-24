const options = {
  threshold: 0.2, // Trigger when at least 50% of the element is in the viewport
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


//lerping bakcground
const colorBox = document.getElementById('myBox');
const animationDuration = 3000; // Duration of each animation cycle in milliseconds (2 seconds)
const pauseDuration = 100;     // Duration to pause between animations in milliseconds (1 second)
let forward = 1;

function lerpGradient(startGradient, endGradient, t) {
    const interpolatedGradient = [];

    for (let i = 0; i < startGradient.length; i++) {
        const startColor = startGradient[i];
        const endColor = endGradient[i];

        const r = Math.round(startColor.r + t * (endColor.r - startColor.r));
        const g = Math.round(startColor.g + t * (endColor.g - startColor.g));
        const b = Math.round(startColor.b + t * (endColor.b - startColor.b));

        interpolatedGradient.push(`rgb(${r}, ${g}, ${b})`);
    }

    return interpolatedGradient.join(', ');
}

function animateGradient() {
  const startGradient = [
      { r: 46, g: 161, b: 159 },  //
      { r: 83, g: 198, b: 150 } // 
  ];

  const endGradient = [
      { r: 31, g: 220, b: 220 },  
      { r: 29, g: 231, b: 164 }   
  ];

  let startTime;

  function animate(currentTime) {
      if (!startTime) {
          startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const t = Math.min(elapsedTime / animationDuration, 1); // Ensure t stays between 0 and 1
      const lerpedGradient = lerpGradient(
        forward % 2 === 0 ? startGradient : endGradient,
        forward % 2 === 0 ? endGradient : startGradient,
          t
      );
      colorBox.style.background = `linear-gradient(90deg, ${lerpedGradient})`;

      if (t >= 1) {
          // Animation cycle completed
          startTime = currentTime; // Reset the start time
          forward = forward+1;     // Reverse the animation direction
      
          setTimeout(animateGradient, pauseDuration); // Pause between animations
          console.log(forward);
      } else {
          requestAnimationFrame(animate);
          
      }
  }

  requestAnimationFrame(animate);
}

// Start the animation loop
animateGradient(); 

//carousel stuff
const carouselItems = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Add click event listeners to the "Next" buttons
const nextButtons = document.querySelectorAll('.arrow-next');
nextButtons.forEach(button => {
    button.addEventListener('click', nextItem);
});

const prevButtons = document.querySelectorAll('.arrow-prev');
prevButtons.forEach(button => {
  button.addEventListener('click', prevItem);
});

function showItem(index) {
    carouselItems.forEach((item, i) => {
        if (i === index) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function nextItem() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showItem(currentIndex);
}

// Initially show the first item
showItem(currentIndex);


function updateDots() {
  dotsContainer.innerHTML = '';
  carouselItems.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === currentIndex) {
          dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
          currentIndex = i;
          showItem(currentIndex);
          updateDots();
      });
      dotsContainer.appendChild(dot);
  });
}

function prevItem() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  showItem(currentIndex);
  updateDots();
}

function nextItem() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  showItem(currentIndex);
  updateDots();
}

// Initially show the first item and update dots
showItem(currentIndex);
updateDots();

// Add click event listeners to arrow buttons
prevButton.addEventListener('click', prevItem);
nextButton.addEventListener('click', nextItem);