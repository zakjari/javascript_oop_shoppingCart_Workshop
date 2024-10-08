// Starter code pour l'atelier Panier d'Achat OOP
// Classe Produit
class Product {
    constructor(id, name, price) {
        // TODO: Initialiser les propriétés id, name, et price du produit
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Classe Item de Panier
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        // TODO: Initialiser les propriétés product et quantity (quantité de produit)
        this.product = product;
        this.quantity = quantity; 
    }

    // Méthode pour calculer le prix total de cet item dans le panier
    getTotalPrice() {
        // TODO: Retourner le prix total en multipliant le prix du produit par la quantité
        return this.product.price * this.quantity;
    }
}

// Classe Panier
class ShoppingCart {
    constructor() {
        // TODO: Initialiser un tableau vide pour stocker les items du panier
        this.items = [];
    }

    // Méthode pour ajouter un produit au panier
    addItem(product) {
        // TODO: Vérifier si le produit existe déjà dans le panier
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } 
        else {
        // Si oui, augmenter la quantité, sinon, ajouter un nouvel item au panier
        const newItem = new ShoppingCartItem(product);
        this.items.push(newItem);
        }
        this.updateCartDisplay();
    }

    // Méthode pour supprimer un produit du panier
    removeItem(productId) {
        // TODO: Supprimer un produit du panier en utilisant son id
        this.items = this.items.filter(item => item.product.id !== productId);

    }

    // Méthode pour mettre à jour la quantité d'un produit dans le panier
    updateQuantity(productId, newQuantity) {
        // TODO: Trouver le produit dans le panier et mettre à jour sa quantité
        const existingItem = this.items.find(item => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity = newQuantity;

        // Si la nouvelle quantité est 0 ou moins, supprimer l'item du panier
        if (newQuantity <= 0) {
            this.removeItem(productId);
        }
    }
    }

    // Méthode pour afficher les items du panier
    displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = ''; // Réinitialiser l'affichage
    
        // Boucler à travers les items du panier
        this.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.product.name} - Quantité: ${item.quantity} - Prix Total: ${item.getTotalPrice()} €`;
            cartItemsContainer.appendChild(listItem);
        });
    
        // Mettre à jour les totaux
        
    }
        // TODO: Boucler à travers les items du panier et les afficher
        // Vous pouvez utiliser des fonctions DOM pour mettre à jour l'interface
    

    // Méthode pour calculer le nombre total d'articles dans le panier
    getTotalItems() {
        // TODO: Retourner le nombre total d'items dans le panier
        let totalItems = 0;
    this.items.forEach(item => {
        totalItems += item.quantity; 
        
    });
    return totalItems;
    }

    // Méthode pour calculer le prix total de tous les items dans le panier
    getTotalPrice() {
        // TODO: Retourner le prix total de tous les items en additionnant leur prix total
       
            let totalPrice = 0;
            this.items.forEach(item => {
                totalPrice += item.getTotalPrice(); // Utiliser la méthode getTotalPrice de ShoppingCartItem
            });
            return totalPrice;
    }

    // Méthode pour mettre à jour l'affichage du panier
    updateCartDisplay() {
        this.displayCart();
        // TODO: Mettre à jour l'affichage du panier en appelant displayCart()
        // et mettre à jour le nombre total d'articles et le prix total
        const totalItems = this.getTotalItems();
        const totalPrice = this.getTotalPrice();

        document.getElementById('total-items').textContent = totalItems; 
        document.getElementById('total-price').textContent = totalPrice;
    }
}

// Liste des produits (à remplir)
const products = [
    new Product(1, "Produit A", 19.99),
    new Product(2, "Produit B", 39.99),
    new Product(3, "Produit C", 49.99)
];

// Instance du panier (ShoppingCart)
const cart = new ShoppingCart();

// Fonction pour afficher la liste des produits
function displayProductList() { 
    const productListContainer = document.querySelector('.products');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Prix: ${product.price} €</p>
            <button onclick="cart.addItem(products.find(p => p.id === ${product.id}))">Ajouter au panier</button>`;

        // Ajouter la carte du produit au conteneur
        productListContainer.appendChild(productCard);
    });
}

// Appeler displayProductList() pour afficher les produits lorsque la page est chargée
window.onload = displayProductList;

