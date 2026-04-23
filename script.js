/*  
    Created by Nikeeta Malik  
    GitHub: https://github.com/Nikeeta-5  
    © 2026 Nikeeta Malik. All rights reserved. 
    No part of this code may be reused or reproduced without written permission.
*/
let ham=document.getElementById("ham");
let nav=document.getElementsByClassName("nav")[0];
let navlist_second=document.getElementsByClassName("nav-list-second")[0];

ham.addEventListener('click',()=>{
nav.classList.toggle("active-nav");
navlist_second.classList.toggle("active-nav-list-second");
if(nav.classList.contains("active-nav")){
    ham.src="cross.svg"
}
else{
    ham.src="hamburger.svg"
}
})

var typed = new Typed('#profession', {
  strings: [
    'Full-Stack Developer',
    'QA Tester',
    'UI/UX Designer',
    'Building Clean and User-Centered Experiences',
    'AI-Assisted Product Builder'
  ],
  typeSpeed: 120,   
  backSpeed: 80,   
  backDelay: 1200,  
  loop: true
});
  
//Intro//
document.addEventListener('click', function unlockAudio() {
  document.removeEventListener('click', unlockAudio);
  const hint = document.getElementById('tap-hint');
  if (hint) hint.remove();
  startIntroSequence(); // your existing intro start
});

window.addEventListener('load', () => {
  const screen = document.getElementById('intro-screen');
  const introText = document.getElementById('intro-text');
  const tagline = document.getElementById('tagline');
  const btn = document.getElementById('enter-btn');
  const canvas = document.getElementById('intro-bg');
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x += 40) {
      for (let y = 0; y < canvas.height; y += 40) {
        const o = Math.sin((x + y) * 0.02 + t) * 50;
        ctx.beginPath();
        ctx.arc(x + o, y + o, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(35,205,89,0.6)';
        ctx.fill();
      }
    }
    t += 0.03;
    requestAnimationFrame(animateBackground);
  }
  animateBackground();

  const init = "System initializing...";
  const message = "System initialized... Welcome, explorer. You're now entering Nikeeta Malik's creative dimension.";

  function typeTextWithSpeech(text, speed = 45) {
  return new Promise(async resolve => {
    let i = 0;

    const voices = await new Promise(res => {
      let v = speechSynthesis.getVoices();
      if (v.length) return res(v);
      speechSynthesis.onvoiceschanged = () => res(speechSynthesis.getVoices());
    });

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices.find(v => v.name.includes("Google UK English Female") || v.name.includes("Samantha")) || voices[0];
    utter.rate = 0.94;
    utter.pitch = 1.1;

    // Ensure no overlapping voices
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);

    // Wait for speech end before resolving
    utter.onend = () => {
      resolve();
    };

    function step() {
      introText.textContent = text.slice(0, i++);
      if (i <= text.length) {
        setTimeout(step, speed);
      }
    }
    step();
  });
}

async function startIntroSequence() {
  await typeTextWithSpeech(init, 35);
  await new Promise(r => setTimeout(r, 500));
  introText.textContent = "";
  await typeTextWithSpeech(message, 45);

  // NOW reveal the tagline and button AFTER speech+typewriter is done
  setTimeout(() => {
    tagline.style.opacity = 1;
    btn.style.display = "inline-block";
    setTimeout(() => {
      btn.style.opacity = 1;
    }, 300);
  }, 500);
}

  // Trigger intro once on user interaction to comply with browser autoplay policy
  const unlockAudio = () => {
    document.removeEventListener('click', unlockAudio);
    startIntroSequence();
  };
  document.addEventListener('click', unlockAudio);

btn.onclick = () => {
  screen.style.transition = 'opacity 1s ease';
  screen.style.opacity = 0;

  setTimeout(() => {
    screen.remove();
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    // Ensure avatar voice is now ready & activate it
    initAvatar(() => {
      avatarReady = true;
      showAvatarAndSpeakInitial();
    });
  }, 1000);
};


});

  
  // Floating Dots / Particle Background using JS + Canvas
(function () {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.zIndex = 1;
  canvas.style.pointerEvents = "none";
  canvas.id = "floatingDots";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const dots = Array.from({ length: 80 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: Math.random() * 1.5 + 0.5
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    dots.forEach(dot => {
      dot.x += dot.vx;
      dot.y += dot.vy;

      if (dot.x < 0 || dot.x > width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > height) dot.vy *= -1;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(35, 205, 89, 0.6)";
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();

  // Adjust canvas on resize
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
})();