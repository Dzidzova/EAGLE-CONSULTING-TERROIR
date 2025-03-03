// Initialisation du tableau du panier (depuis le localStorage si disponible)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonction pour ajouter un produit au panier
function addToCart(productName, productPrice, productImage) {
    const product = { id: Date.now(), name: productName, price: productPrice, image: productImage }; // Ajout de l'image
    cart.push(product); // Ajouter au panier
    localStorage.setItem('cart', JSON.stringify(cart)); // Mettre à jour le localStorage

    alert(productName + " a été ajouté au panier.");
    updateCartDisplay();
    updateFinishButtonState();
}

// Fonction pour retirer un produit du panier
function removeFromCart(productId) {
    console.log("Avant suppression, panier:", cart);
    const productIndex = cart.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        const productName = cart[productIndex].name;
        cart.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log("Après suppression, panier:", cart);
        alert(productName + " a été retiré du panier.");
        updateCartDisplay();
        updateFinishButtonState();
    } else {
        console.warn("Produit introuvable avec ID:", productId);
    }
}

// Fonction pour mettre à jour l'affichage du panier
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer || !totalPriceElement) {
        console.error("Éléments HTML manquants !");
        return;
    }

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Votre panier est vide.</p>";
        totalPriceElement.textContent = "0 FCFA";
        return;
    }

    let totalPrice = 0;
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <span>${item.name} - ${item.price} FCFA</span>
            <button class="remove-button" data-product-id="${item.id}">Retirer</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice + " FCFA";
}

// Fonction pour activer/désactiver le bouton "Terminer"
function updateFinishButtonState() {
    const finishButton = document.getElementById("finish-button");
    if (finishButton) {
        finishButton.disabled = cart.length === 0;
    }
}

// Gestionnaire des clics sur "Retirer"
document.getElementById("cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
        const productId = Number(e.target.dataset.productId);
        console.log("Tentative de suppression du produit ID:", productId);
        removeFromCart(productId);
    }
});

// Charger l'état initial à l'ouverture de la page
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
    updateFinishButtonState();
});

// Fonction pour envoyer la facture détaillée sur WhatsApp
function sendToWhatsApp() {
    const whatsappNumber = "22879892118"; // Numéro WhatsApp du propriétaire
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    let totalPrice = 0;
    let productList = "🛒 *Facture de commande* %0A%0A";
    productList += "----------------------------------%0A";
    productList += "| Produit                | Prix         |%0A";
    productList += "----------------------------------%0A";

    cart.forEach(item => {
        productList += `| ${item.name} | ${item.price} FCFA |%0A`;
        totalPrice += item.price;
    });

    productList += "----------------------------------%0A";
    productList += `🧾 *Total à payer :* ${totalPrice} FCFA%0A%0A`;
    productList += "Merci de confirmer ma commande. 😊";

    // Génération du lien WhatsApp avec la facture détaillée
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(productList)}`;
    window.open(whatsappLink, "_blank");
}

// Ajout de la fonctionnalité de génération de facture PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    let doc = new jsPDF();
    doc.text("🛒 Facture de Commande", 10, 10);
    doc.text("----------------------------------", 10, 20);

    let y = 30;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name} - ${item.price} FCFA`, 10, y);
        y += 10;
        totalPrice += item.price;
    });

    doc.text("----------------------------------", 10, y);
    doc.text(`🧾 Total à payer : ${totalPrice} FCFA`, 10, y + 10);
    doc.text("Merci de votre commande ! 😊", 10, y + 20);

    doc.save("facture.pdf");
}




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


