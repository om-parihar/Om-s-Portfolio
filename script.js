// ================================
// SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, index) {
    if (entry.isIntersecting) {
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, { threshold: 0.1 });

// Start observing each reveal element
revealElements.forEach(function(el) {
  scrollObserver.observe(el);
});



const heroTag = document.querySelector('.hero-tag');

const typingTexts = [
  'Available for internships 2026',
  'Backend Developer - Node.js',
  'CSE Student - Kanpur, India'
];

let textIndex = 0;   
let charIndex = 0;   
let isTyping = true; 
function typeLoop() {
  const currentText = typingTexts[textIndex];

  if (isTyping) {
    // Add one character
    heroTag.childNodes[heroTag.childNodes.length - 1].textContent = currentText.slice(0, charIndex);
    charIndex++;

    if (charIndex > currentText.length) {
      isTyping = false;
      setTimeout(typeLoop, 2000);
      return;
    }

  } else {
    heroTag.childNodes[heroTag.childNodes.length - 1].textContent = currentText.slice(0, charIndex);
    charIndex--;

    if (charIndex < 0) {
      isTyping = true;
      textIndex = (textIndex + 1) % typingTexts.length;
      charIndex = 0;
    }
  }

  setTimeout(typeLoop, isTyping ? 60 : 30);
}

setTimeout(typeLoop, 1500);