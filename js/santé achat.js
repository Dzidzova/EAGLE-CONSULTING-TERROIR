const { jsPDF } = window.jspdf;

// Fonction pour afficher le panier en tableau
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let totalPrice = 0;

    // Vérifier si le panier est vide
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Votre panier est vide.</p>";
        document.getElementById('total-price').innerText = "0 FCFA";
        return;
    }

    // Création du tableau HTML
    let tableHTML = `
        <table border="1" width="100%" style="border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Produit</th>
                    <th>Prix (FCFA)</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Remplissage du tableau
    cart.forEach(item => {
        tableHTML += `
            <tr>
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price} FCFA</td>
            </tr>
        `;
        totalPrice += item.price;
    });

    tableHTML += `</tbody></table>`; // Fermeture du tableau
    cartItems.innerHTML = tableHTML; // Affichage du tableau
    document.getElementById('total-price').innerText = totalPrice + " FCFA"; // Affichage du total
}

// Fonction pour générer la facture PDF
function generatePDF() {
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

    cart.forEach((item, index) => {
        productList += `${index + 1}. ${item.name} - ${item.price} FCFA %0A`;
        totalPrice += item.price;
    });

    productList += "----------------------------------%0A";
    productList += `🧾 *Total à payer :* ${totalPrice} FCFA%0A%0A`;
    productList += "Merci de confirmer ma commande. 😊";

    // Génération du lien WhatsApp avec la facture détaillée
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(productList)}`;
    window.open(whatsappLink, "_blank");
}

// Affichage du panier dès que la page est chargée
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