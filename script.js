// Select elements
const typewriterText = document.getElementById("center-text");
const typewriterContainer = document.getElementById("center-text-container");
const brandLogo = document.getElementById("brand-logo");
const bubbles = document.querySelectorAll(".bubble");
const canvas = document.getElementById("canvas");

// Typewriter Effect Control: Remove blinking cursor after typing
typewriterText.addEventListener("animationend", (event) => {
  if (event.animationName === "typewriter") {
    typewriterText.style.borderRight = "none"; // Remove the blinking cursor
  }
});

// Coordinated Fade-in and Fade-out for Elements
document.addEventListener("DOMContentLoaded", () => {

  // Fade-in Bubbles Sequentially
  setTimeout(() => {
    bubbles.forEach((bubble, index) => {
      bubble.style.animation = `fadeIn 4s ease ${6 + index * 0.2}s forwards`;
    });
  }, 6000);

});

// Initialize the Rive animation
const riveInstance = new rive.Rive({
  src: "/animation/read_the_air_update.riv", // Rive file URL
  canvas: canvas,
  autoplay: true,
  artboard: "HandFox",
  stateMachines: ["State Machine 1"], // State machine name in Rive file
  fit: rive.Fit.CONTAIN, // Fit animation within the canvas
  alignment: rive.Alignment.CENTER, // Center the animation
  onLoad: () => {
    console.log("Rive animation loaded");
    resizeCanvas(); // Resize the canvas on initial load
  },
});


// Resize canvas to fit the viewport
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  riveInstance.resizeDrawingSurfaceToCanvas();
}

// Listen for window resize events
window.addEventListener("resize", resizeCanvas);

// Bubble Interactions
bubbles.forEach((bubble) => {
  bubble.addEventListener("click", () => {
    const link = bubble.getAttribute("data-link");
    if (link) {
      window.location.href = link; // Navigate to the linked page
    }
  });

  // Optional: Add a hover effect for bubbles using JS (if needed)
  bubble.addEventListener("mouseover", () => {
    bubble.style.transform = "scale(1.1)";
  });
  bubble.addEventListener("mouseout", () => {
    bubble.style.transform = "scale(1)";
  });
});

// Mouse Movement Effects for Floating Bubbles (Optional)
document.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = (event.clientY / window.innerHeight) * 2 - 1;

  bubbles.forEach((bubble, index) => {
    const speed = 0.5 + index * 0.1;
    bubble.style.transform = `translate(${x * speed}rem, ${y * speed}rem) scale(1)`;
  });
});


