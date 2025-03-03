// Témoignages enregistrés (simulés)
const testimonials = [
    {
        name: "Alice Dupont",
        message: "J'ai acheté un collier en agate et je me sens plus calme et équilibrée. Un vrai plaisir !"
    },
    {
        name: "Jean-Pierre Martin",
        message: "Les perles sont magnifiques, et le service client est irréprochable. Je recommande vivement !"
    },
    {
        name: "Sophie Lefevre",
        message: "Super expérience ! Le bracelet en améthyste est très élégant et a un vrai effet apaisant."
    }
];

document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi classique du formulaire

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const email = document.getElementById("email").value;

    // Construction de l'email avec mailto:
    const subject = encodeURIComponent("Commande de " + product);
    const body = encodeURIComponent(
        `Bonjour,\n\nJe souhaite commander :\n- Produit : ${product}\n- Quantité : ${quantity}\n\nMerci de me contacter à ${email}.\n\nCordialement.`
    );

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=eagleconsultingtg@gmail.com&su=${subject}&body=${body}`;
});

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

document.addEventListener('DOMContentLoaded', () => {
    const miniBtn = document.querySelector('.mini-btn');
    const domainList = document.querySelector('#domain-list');

    // Toggle l'affichage de la liste
    miniBtn.addEventListener('click', () => {
        domainList.classList.toggle('show');
    });

    // Cacher la liste si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!miniBtn.contains(e.target) && !domainList.contains(e.target)) {
            domainList.classList.remove('show');
        }
    });
});