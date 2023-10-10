//autito que recorre la pagina 
document.addEventListener("DOMContentLoaded", function () {
    const auto = document.getElementById("car");
    auto.style.transform = "translateX(calc(100% + 50px))"; // mueve el auto fuera de la pantalla
    
    // Inicia la animación
    setTimeout(function () {
        auto.style.transform = "translateX(calc(100% + 50px))"; // Inicializa la posición del auto
        requestAnimationFrame(function moveCar() {
            const currentTransform = window.getComputedStyle(auto).getPropertyValue("transform");
            const currentX = parseFloat(currentTransform.split(",")[4]);
            if (currentX >= window.innerWidth + 50) {
                // Cuando el auto cruzo toda la pantalla, reinicia la animación
                auto.style.transform = "translateX(calc(100% + 50%))";
            } else {
                // Mueve el auto a la derecha
                auto.style.transform = `translateX(${currentX + 500}px)`;
                requestAnimationFrame(moveCar);
            }
        });
    }, 5000); 
});