// Selecciona el elemento con la clase 'img-background' y lo almacena en la variable 'background'
const background = document.querySelector('.img-background');

background.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const gradient = `radial-gradient(at ${x}px ${y}px,  #8f0707, #0c0000)`;  // Crea un degradado radial centrado en la posición del cursor
    background.style.backgroundImage = gradient;
    background.style.animation = 'none'; // Pausar la animación durante el movimiento
});

background.addEventListener('mouseleave', () => {
    background.style.animation = 'pulseShadow 5s infinite alternate ease-in-out'; // Reanudar animación al salir del área
});
