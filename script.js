// Menú Lateral
const sidebar = document.getElementById('sidebar');
const sidebarOpen = document.getElementById('sidebar-open');
const sidebarClose = document.getElementById('sidebar-close');
const menuItems = document.querySelectorAll('.sidebar-menu li a');

// Abrir y cerrar el menú lateral
sidebarOpen.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOpen.style.display = 'none';
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active');
    setTimeout(() => {
        sidebarOpen.style.display = 'block';
    }, 300);
});

// Resaltar la sección activa en el menú lateral
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100; // Ajusta el offset según sea necesario

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            menuItems.forEach((item) => item.parentElement.classList.remove('active')); // Remover activo de todos
            menuItems[index].parentElement.classList.add('active'); // Activar el correspondiente
        }
    });
}

// Escuchar el evento de scroll
window.addEventListener('scroll', highlightActiveSection);

// Resaltar la sección activa al cargar la página
highlightActiveSection();


// Botones para pasar skills
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".skills-container");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const skillBoxes = document.querySelectorAll(".skill-box");
    const visibleSkills = 3; // Número de habilidades visibles
    let currentIndex = 0;
    const totalSkills = skillBoxes.length;
    const step = skillBoxes[0].offsetWidth + 20; // Tamaño de un skill-box más el margen

    function updateCarousel() {
        container.style.transform = `translateX(${-currentIndex * step}px)`;
    }

    nextButton.addEventListener("click", () => {
        if (currentIndex < totalSkills - visibleSkills) {
            currentIndex++;
        } else {
            currentIndex = 0; // Reinicia el carrusel
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSkills - visibleSkills; // Va al final
        }
        updateCarousel();
    });

    updateCarousel();
});


document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".skill-progress-bar");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const bar = entry.target;
            const level = parseInt(bar.getAttribute("data-level"), 10);
            const segments = bar.querySelectorAll(".progress-segment");

            if (entry.isIntersecting) {
                segments.forEach((segment, index) => {
                    setTimeout(() => {
                        if (index < level) {
                            segment.classList.add("filled");
                        }
                    }, index * 300);
                });
            } else {
                segments.forEach(segment => {
                    segment.classList.remove("filled");
                });
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        // Si no existen segmentos dentro, generarlos dinámicamente
        if (!bar.querySelectorAll(".progress-segment").length) {
            const maxSegments = 4; // Número total de segmentos
            for (let i = 0; i < maxSegments; i++) {
                const seg = document.createElement("div");
                seg.classList.add("progress-segment");
                bar.appendChild(seg);
            }
        }
        observer.observe(bar);
    });
});



// Animación de escritura de texto Titulo
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typed-text");
    const text = "Mi Portfolio"; // Personaliza con tu nombre
    let index = 0;
    let isDeleting = false;

    function typeEffect() {
        textElement.innerHTML = text.substring(0, index) + '<span class="typing"></span>';

        if (!isDeleting) {
            if (index < text.length) {
                index++;
                setTimeout(typeEffect, 150);
            } else {
                setTimeout(() => {
                    isDeleting = true;
                    typeEffect();
                }, 1000); // Pausa después de escribir
            }
        } else {
            if (index > 0) {
                index--;
                setTimeout(typeEffect, 100);
            } else {
                isDeleting = false;
                setTimeout(typeEffect, 500);
            }
        }
    }

    typeEffect();
});


// Barra de progreso de inglés

document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.getElementById("progress-bar");
    const levelText = document.getElementById("current-level");
    
    const level = "Avanzado"; // Cambia a "Básico", "Intermedio", "Avanzado" o "Nativo"

    let levelData = {
        "Básico": { width: "25%", text: "Nivel: Básico" },
        "Intermedio": { width: "50%", text: "Nivel: Intermedio" },
        "Avanzado": { width: "75%", text: "Nivel: Avanzado" },
        "Nativo": { width: "100%", text: "Nivel: Nativo" }
    };

    setTimeout(() => {
        if (levelData[level]) {
            progressBar.style.width = levelData[level].width;
            levelText.textContent = levelData[level].text;
        }
    }, 500);
});


// Animación de fade-in al ver denuevo la categoría
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible"); // Se reinicia la animación al salir
                }
            });
        },
        { threshold: 0.2 } // Se activa cuando el 20% de la sección es visible
    );

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Reiniciar barra de progreso de inglés
document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector(".progress-bar");
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBar.style.width = progressBar.dataset.width; // Llena la barra
                } else {
                    progressBar.style.width = "0%"; // Se vacía al salir de pantalla
                }
            });
        },
        { threshold: 0.5 } // Se activa cuando el 50% de la barra es visible
    );

    observer.observe(progressBar);
});



document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Evita que la página se recargue

        const btn = form.querySelector(".btn-glow");
        btn.classList.add("submitted");

        // Capturar los datos del formulario
        const formData = new FormData(form);

        try {
            // Enviar los datos al endpoint de Formspree
            const response = await fetch("https://formspree.io/f/xanqbdjl", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                console.log("Mensaje enviado correctamente.");

                // Redirigir a la página de inicio después de 3 segundos
                setTimeout(() => {
                    window.location.href = "https://tusitio.com"; // Cambia por la URL de tu página de inicio
                }, 3000);

            } else {
                console.error("Error al enviar el mensaje.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }

        // Restablecer el formulario después de 3 segundos
        setTimeout(() => {
            btn.classList.remove("submitted");
            form.reset();
        }, 3000);
    });
});


  