const carrusel = document.querySelector(".carusel");
const puntos = document.querySelectorAll(".punto");

let currentIndex = 0;
let timer = null;
let direction = 1; // 1 para adelante, -1 para atrás

// Función para avanzar o retroceder al siguiente slide
function moveToNextOrPreviousSlide() {
  currentIndex += direction;
  
  if (currentIndex >= puntos.length) {
    currentIndex = puntos.length - 2;
    direction = -1;
  } else if (currentIndex < 0) {
    currentIndex = 1;
    direction = 1;
  }
  
  moveToSlide(currentIndex);
}

// Función para mover el carrusel al slide indicado
function moveToSlide(index) {
  const newPosition = index * -25; // Mueve el carrusel -25% por cada slide
  carrusel.style.transform = `translateX(${newPosition}%)`;

  // Reseteamos el temporizador
  resetTimer();

  // Marcamos el punto activo
  puntos.forEach((punto) => punto.classList.remove('activo'));
  puntos[index].classList.add('activo');
}

// Función para iniciar el temporizador de 5 segundos
function startTimer() {
  timer = setTimeout(() => {
    moveToNextOrPreviousSlide();
  }, 5000); // 5 segundos
}

// Función para resetear el temporizador
function resetTimer() {
  clearTimeout(timer);
  startTimer();
}

// Event listeners para cada punto
puntos.forEach((punto, index) => {
  punto.addEventListener("click", () => {
    currentIndex = index;
    direction = (currentIndex === 0 || currentIndex === puntos.length - 1) ? -direction : direction;
    moveToSlide(index);
  });
});

// Iniciar el carrusel
startTimer();
