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