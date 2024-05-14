document.getElementById('addProductForm').addEventListener('submit', addProduct);

// Funzione per recuperare i prodotti dal server
function fetchProducts() {
fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyM2Y3MTU1NjIxYTAwMTVjMTVmNmMiLCJpYXQiOjE3MTU2MTc2NDksImV4cCI6MTcxNjgyNzI0OX0.fBzT8vOvLlssA-j-PVhoOgFDkiuz-uaLm6FiG8H7h1k"
}
})
    .then(response => response.json())
    .then(data => displayProductList(data))
    .catch(error => console.error('Errore nel recupero dei prodotti:', error));
}

// Funzione per visualizzare la lista dei prodotti nella pagina
function displayProductList(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Pulisce i prodotti correnti

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <div>
                <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px;">
                <h3>${product.name}</h3>
                <p>Prezzo: ${product.price}</p>
                <p>Descrizione: ${product.description}</p>
                <button onclick="editProduct(${product.id})">Modifica</button>
                <button onclick="deleteProduct(${product.id})">Elimina</button>
            </div>
            <hr>
        `;
        productList.appendChild(productDiv);
    });
}

// Funzione per gestire l'aggiunta di un nuovo prodotto
function addProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
        method: 'POST',
        body: formData,
       headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyM2Y3MTU1NjIxYTAwMTVjMTVmNmMiLCJpYXQiOjE3MTU2MTc2NDksImV4cCI6MTcxNjgyNzI0OX0.fBzT8vOvLlssA-j-PVhoOgFDkiuz-uaLm6FiG8H7h1k"
            }
    })
    .then(response => response.json())
    .then(() => {
        fetchProducts(); // Aggiorna la lista dopo l'aggiunta
    })
    .catch((errore) => {
        console.error("Errore nell'aggiunta del prodotto:", errore);
    })
}

// Funzione per gestire la modifica di un prodotto
function editProduct(productId) {
    const updatedProduct = {
        name: "Nuovo Nome Prodotto",
        description: "Nuova Descrizione Prodotto",
        price: 99.99,
        imageUrl: "http://example.com/new-image.jpg"
    };

    fetch(`https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/${productId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyM2Y3MTU1NjIxYTAwMTVjMTVmNmMiLCJpYXQiOjE3MTU2MTc2NDksImV4cCI6MTcxNjgyNzI0OX0.fBzT8vOvLlssA-j-PVhoOgFDkiuz-uaLm6FiG8H7h1k', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Prodotto aggiornato:', data);
        fetchProducts(); // Aggiorna la lista dei prodotti dopo la modifica
    })
    .catch(error => console.error('Errore nella modifica del prodotto:', error));
}


// Funzione per gestire l'eliminazione di un prodotto
function deleteProduct(productId) {
    fetch(`https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyM2Y3MTU1NjIxYTAwMTVjMTVmNmMiLCJpYXQiOjE3MTU2MTc2NDksImV4cCI6MTcxNjgyNzI0OX0.fBzT8vOvLlssA-j-PVhoOgFDkiuz-uaLm6FiG8H7h1k ' 
        }
    })

    .then(response => response.json())
    .then(() => {
        fetchProducts(); // Aggiorna la lista dopo l'eliminazione
    })
    .catch((errore) => {
        console.error("Errore nell'eliminazione del prodotto:", errore);
});
}

// Caricamento iniziale dei prodotti
fetchProducts();
