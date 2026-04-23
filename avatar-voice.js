/*  
    Created by Nikeeta Malik  
    GitHub: https://github.com/Nikeeta-5  
    © 2026 Nikeeta Malik. All rights reserved. 
    No part of this code may be reused or reproduced without written permission.
*/
let isMuted = false;
let voice;
let lastSpokenSection = null;
let avatarReady = false;

const sectionSpeeches = {
  home: "Step into the silence between circuits — the future whispers here.",
  about: "Beneath the code and logic lies a mind focused on building meaningful solutions.",
  skills: "These are the tools behind my work — refined through practice and precision.",
  contact: "The bridge is open. If this resonates, feel free to reach out."
};

function speakLine(text) {
  if (!isMuted && voice && text && avatarReady) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = 1.1;
    utterance.rate = 0.94;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
}

function loadVoiceAndSpeak(callback) {
  const tryLoad = () => {
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return;

    voice = voices.find(v => v.name.includes("Google UK English Female") || v.name.includes("Samantha")) ||
            voices.find(v => v.lang.startsWith("en")) || voices[0];

    if (callback) callback();
  };

  if (speechSynthesis.getVoices().length) {
    tryLoad();
  } else {
    speechSynthesis.onvoiceschanged = tryLoad;
  }
}

function setupObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && avatarReady) {
        const id = entry.target.id;
        if (sectionSpeeches[id] && lastSpokenSection !== id) {
          lastSpokenSection = id;
          speakLine(sectionSpeeches[id]);
        }
      }
    });
  }, { threshold: 0.05});

  Object.keys(sectionSpeeches).forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

function enableAvatarVoice() {
  avatarReady = true;
  setupObserver();

  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      detectVisibleSectionAndSpeak();
    }, 100);
  });

  window.addEventListener("hashchange", () => {
    setTimeout(() => {
      lastSpokenSection = null;
      detectVisibleSectionAndSpeak();
    }, 300);
  });
}

function detectVisibleSectionAndSpeak() {
  Object.keys(sectionSpeeches).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const visibleTop = rect.top >= 0;
      const visibleBottom = rect.bottom <= window.innerHeight;
      const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
      const visibleRatio = visibleHeight / el.offsetHeight;

      if ((visibleRatio > 0.05 || (visibleTop && visibleBottom)) && lastSpokenSection !== id) {

        lastSpokenSection = id;
        speakLine(sectionSpeeches[id]);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("mute-toggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      isMuted = toggle.checked;
      speechSynthesis.cancel();
    });
  }

  loadVoiceAndSpeak(() => {
    const enterBtn = document.getElementById("enter-btn");
    if (enterBtn) {
      enterBtn.addEventListener("click", () => {
  setTimeout(() => {
    document.getElementById("avatar-container").style.display = "flex";
    enableAvatarVoice();
    detectVisibleSectionAndSpeak();
  }, 600);
});
    }
  });
});
