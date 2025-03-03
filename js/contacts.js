document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    
    // Vérifier si les éléments existent
    if (hamburger && menu) {
        hamburger.addEventListener("click", function () {
            menu.classList.toggle("visible"); // Afficher ou cacher le menu
        });
        
        // Fermer le menu si on clique en dehors (uniquement en mode mobile)
        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !hamburger.contains(event.target) && window.innerWidth <= 768) {
                menu.classList.remove("visible");
            }
        });
        
        // Assurer que le menu reste visible sur les grands écrans
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                menu.classList.add("visible");
            } else {
                menu.classList.remove("visible");
            }
        });
    }
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêcher l'envoi classique du formulaire

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Construction de l'email avec mailto:
    const subject = encodeURIComponent("Contact - Demande d'information");
    const body = encodeURIComponent(
        `Bonjour,\n\nNom : ${name}\nEmail : ${email}\n\nMessage :\n${message}\n\nCordialement.`
    );

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=eagleconsultingtg@gmail.com&su=${subject}&body=${body}`;
});