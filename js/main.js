// Loader: estrella fugaz y transición a la página principal
window.onload = () => {
  setTimeout(() => {
    // Aparece la estrella fugaz en el loader
    const star = document.getElementById('shooting-star-loader');
    star.classList.add('shooting');
    star.style.opacity = '1';
    // Después de la animación, muestra la página principal
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("main-content").style.display = "flex";
      triggerShootingStarMain(); // Dispara una fugaz al entrar a main
    }, 1300);
  }, 3400); // Tiempo de pantalla de carga antes de la estrella fugaz
};

// Estrella fugaz en la página principal (aparece al entrar y de vez en cuando)
function triggerShootingStarMain() {
  const star = document.getElementById('shooting-star-main');
  star.classList.remove('shooting');
  void star.offsetWidth; // Reinicia animación
  star.classList.add('shooting');
  setTimeout(() => { star.classList.remove('shooting'); }, 1300);

  // Estrella fugaz aleatoria cada 12-24 segundos:
  setTimeout(triggerShootingStarMain, 12000 + Math.random() * 12000);
}