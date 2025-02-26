// Animación de escritura de texto Titulo
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typed-text");
    const text = "Mi Experiencia"; // Personaliza con tu nombre
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


document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.sidebar-menu li a');

    // Obtener el nombre de la página actual
    const currentPage = window.location.pathname.split("/").pop();

    // Resaltar la opción activa en el menú lateral
    menuItems.forEach((item) => {
        const itemHref = item.getAttribute("href");

        if (itemHref === currentPage) {
            item.parentElement.classList.add("active");
        }
    });
});





document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(element => observer.observe(element));
});



// Copiar IP al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCustomToast("📌 IP copiada: " + text);
    }).catch(err => {
        console.error("Error al copiar: ", err);
    });
}

function showCustomToast(message) {
    const toast = document.getElementById("custom-toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 300);
    }, 3000);
}

// Abrir Discord en nueva pestaña
function openDiscord(url) {
    window.open(url, '_blank');
}
