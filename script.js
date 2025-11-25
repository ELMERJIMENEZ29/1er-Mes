/* -----------------------------
   Variables y elementos
   ----------------------------- */
const mainContent = document.getElementById("main-content");
const music = document.getElementById("background-music");
const poemText = document.getElementById("poem-text");
const letterText = document.getElementById("letter-text");
const heartsContainer = document.getElementById("hearts-container");
const secretButton = document.getElementById("secret-button");
const secretMessage = document.getElementById("secret-message");
const kissButton = document.getElementById("kiss-button");
const kissEffect = document.getElementById("kiss-effect");
const timeTogether = document.getElementById("time-together");

/* -----------------------------
   Poema y carta (texto)
   ----------------------------- */
const poem = `Un mes contigo y mi vida cambió.
Gracias por tu cariño, por tus detalles
y por hacer mis días más bonitos.

Me encanta caminar contigo, reír contigo,
y construir momentos que no quiero olvidar.

Este es solo el inicio, mi amor.
TE AMO, hoy y siempre ❤️`;

const letter = `Mi amor…

Hoy celebramos nuestro primer mes juntos,
y no sabes cuánto me alegra vivir cada día a tu lado.

Gracias por tu cariño, tu ternura y por hacerme sentir tan especial.
Este primer mes ha sido precioso… y quiero muchos más contigo.

Te adoro, mi mongolaza. ❤️`;

/* -----------------------------
   Carrusel (exacto comportamiento original)
   ----------------------------- */
let images = document.querySelectorAll(".carousel-container img");
let currentIndex = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

/* -----------------------------
   Efecto "teclear" para poema y carta
   ----------------------------- */
function typeText(targetEl, text, delay = 40, callback = null) {
  targetEl.textContent = "";
  let i = 0;
  function step() {
    if (i < text.length) {
      targetEl.textContent += text[i++];
      setTimeout(step, delay);
    } else if (callback) {
      callback();
    }
  }
  step();
}

/* -----------------------------
   Corazones flotando
   ----------------------------- */
function createHeart() {
  const heart = document.createElement("img");
  heart.src = "images/heart.png";   // <-- tu imagen
  heart.className = "heart-img";

  // posición aleatoria en el ancho
  heart.style.left = Math.random() * 100 + "vw";

  // duración de animación aleatoria
  heart.style.animationDuration = 5 + Math.random() * 3 + "s";

  heartsContainer.appendChild(heart);

  // eliminar corazón cuando termina
  setTimeout(() => heart.remove(), 9000);
}

let heartsInterval;

/* -----------------------------
   Contador desde la fecha que diste (fecha inicio)
   ----------------------------- */
const startDate = new Date("2025-10-25T00:00:00"); // <-- fecha proporcionada

function updateCounterElapsed() {
  const now = new Date();
  const diff = now - startDate; // tiempo transcurrido desde inicio

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  timeTogether.textContent = `${days} días • ${hours} horas • ${minutes} min • ${seconds} seg`;
}
let counterInterval;

/* -----------------------------
   Confetti helper
   ----------------------------- */
function burstConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}

// Intro de corazones: desaparecer y mostrar contenido automáticamente
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("main-content").style.display = "block";

        // iniciar música
        music.play().catch(() => {});

        // iniciar textos
        typeText(poemText, poem, 35);
        setTimeout(() => typeText(letterText, letter, 40), 1200);

        // corazones flotando
        heartsInterval = setInterval(createHeart, 450);

        // contador
        counterInterval = setInterval(updateCounterElapsed, 1000);
        updateCounterElapsed();
    }, 3000); // 3 segundos de intro con corazón
});


/* -----------------------------
   Mensaje secreto (botón)
   ----------------------------- */
secretButton.addEventListener("click", () => {
  if (secretMessage.style.display === "block") {
    // si ya está visible, hacer un pequeño efecto de atención
    secretMessage.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.04)" },
        { transform: "scale(1)" },
      ],
      { duration: 400 }
    );
  } else {
    secretMessage.style.display = "block";
    burstConfetti();
  }
});

/* -----------------------------
   Beso (botón) - animación y confetti sutil
   ----------------------------- */
kissButton.addEventListener("click", () => {
  kissEffect.style.display = "block";
  kissEffect.animate(
    [
      { transform: "translateY(0) scale(0)", opacity: 0 },
      { transform: "translateY(-20px) scale(1.4)", opacity: 1 },
      { transform: "translateY(0) scale(1)", opacity: 1 },
    ],
    { duration: 900, easing: "ease-out" }
  );
  setTimeout(() => (kissEffect.style.display = "none"), 1500);

  // pequeño confetti de corazones
  if (typeof confetti === "function") {
    confetti({
      particleCount: 30,
      spread: 50,
      shapes: ["heart", "circle"],
      origin: { y: 0.6 },
    });
  }
});

/* -----------------------------
   Auto-rotación del carrusel cada cierto tiempo (opcional)
   ----------------------------- */
let autoCarousel = setInterval(nextImage, 6000); // cambia cada 5s

/* -----------------------------
   Limpieza si se necesita (no estrictamente necesaria)
   ----------------------------- */
window.addEventListener("beforeunload", () => {
  clearInterval(heartsInterval);
  clearInterval(counterInterval);
  clearInterval(autoCarousel);
});

// Reproduce música después de la primera interacción
document.addEventListener("click", function() {
  const music = document.getElementById("background-music");
  music.muted = false;
  music.play().catch(() => {});
}, { once: true });

// Para pantallas táctiles
document.addEventListener("touchstart", function() {
  const music = document.getElementById("background-music");
  music.muted = false;
  music.play().catch(() => {});
}, { once: true });

