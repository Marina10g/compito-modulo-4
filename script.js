document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
        fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyM2Y3MTU1NjIxYTAwMTVjMTVmNmMiLCJpYXQiOjE3MTU2MTc2NDksImV4cCI6MTcxNjgyNzI0OX0.fBzT8vOvLlssA-j-PVhoOgFDkiuz-uaLm6FiG8H7h1k"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(product => {
            displayProductDetails(product);
        })
        .catch(error => {
            console.error('Failed to fetch product details:', error);
        });
    } else {
        console.error('Product ID is missing from the URL');
    }
});

function displayProductDetails(product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `Prezzo: €${product.price}`;
    document.getElementById('product-image').src = product.imageUrl;
    document.getElementById('product-image').alt = product.name;
}

window.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyM2Y3MTU1NjIxYTAwMTVjMTVmNmMiLCJpYXQiOjE3MTU2MTc2NDksImV4cCI6MTcxNjgyNzI0OX0.fBzT8vOvLlssA-j-PVhoOgFDkiuz-uaLm6FiG8H7h1k'
        }
    })
    .then(response => response.json())
    .then(products => {
        const productsContainer = document.querySelector('#productsContainer');
        products.forEach(product => {
            productsContainer.innerHTML += `
                <div class="col-md-3">
                    <div class="card product" data-id="${product._id}">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <a href="#" class="btn btn-primary">Vedi più dettagli</a>
                        </div>
                    </div>
                </div>`;
        });
    })
    .catch(error => console.error('Error loading the products:', error));
});

document.addEventListener('DOMContentLoaded', function() {
// Seleziona tutti i prodotti
    const products = document.querySelectorAll('.product');
  
// Aggiungi un gestore di evento di click per ogni prodotto
products.forEach(product => {
    product.addEventListener('click', function() {
      const productId = this.getAttribute('data-id'); 
      window.location.href = `product.html?id=${productId}`; 
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
      card.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          window.location.href = `product.html?id=${productId}`;
      });
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            window.location.href = `product.html?id=${productId}`;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        const productDiv = document.getElementById(`product${productId}`);
        if (productDiv) {
            productDiv.style.display = 'block';
        } else {
            console.error(`Product with ID ${productId} not found.`);
        }
    } else {
        console.error('Product ID not provided in the URL.');
    }
});
