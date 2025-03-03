// Fonction pour afficher le panier et calculer le total
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let totalPrice = 0;
    
    // Affichage des produits du panier
    cartItems.innerHTML = '';
    cart.forEach(item => {
        let productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `<p>${item.name} - ${item.price} FCFA</p>`;
        cartItems.appendChild(productElement);
        totalPrice += item.price;
    });

    // Affichage du total
    document.getElementById('total-price').innerText = totalPrice + " FCFA";
}

// Fonction pour passer à la caisse (exemple basique)
function checkout() {
    const whatsappNumber = "22890044293"; // Remplacez par votre numéro de téléphone WhatsApp
    const totalPrice = document.getElementById('total-price').innerText; // Récupérer le total du panier
    const message = `Bonjour, je souhaite finaliser ma commande. Le montant total est de ${totalPrice}.`;

    // Redirection vers WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
}


// Fonction pour gérer la déconnexion
function logout() {
    localStorage.removeItem('cart'); // Vider le panier
    alert("Vous êtes déconnecté. Le panier a été vidé.");
    window.location.href = '/login.html'; // Redirection
}

// Vider le panier lorsque l'utilisateur quitte le site
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('cart');
});

// Appel de la fonction pour afficher le panier dès que la page est chargée
displayCart();


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