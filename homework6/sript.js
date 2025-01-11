"use strict";
const fea_data = './feature.json';



async function getFeature(url) {
    try {
        const ansf = await fetch(url);
        const data = await ansf.json();
        return data;
    } catch (error) {
        console.error('Error:', error);

    }

}

// Функция для добавления продуктов в список
function addProductsToList(products) {
    console.log(products);
    // Получаем элемент ul для добавления продуктов
    const productList = document.getElementById('product-list');
    // Генерация HTML-кода для списка продуктов
    let htmlContent = '';
    products.forEach(product => {
        htmlContent += `
<li>
<img src="${product.img}" alt="${product.h2}"
width="150" height="150">
<h2>${product.h2}</h2>
<p>${product.p}</p>
<p>Price: $${product.price}</p>
<button class="add-to-cart"
data-id="${product.id}">Add to Cart</button>
</li>
`;
    });
    // Добавляем HTML-код в элемент ul
    productList.insertAdjacentHTML('beforeend', htmlContent);
}
// Функция для добавления товара в корзину
async function addToCart(productId) {
    const data = await getFeature(fea_data);
    // Найти продукт по ID
    const product = data.find(item => item.id === productId);
    // Если продукт найден, добавить его в корзину
    if (product) {
        // Получаем элемент ul для добавления товаров в корзину
        const cartList = document.getElementById('cart-list');
        // Генерация HTML-кода для товара в корзине
        const cartItemHTML = `
    <li>
    <img src="${product.img}" alt="${product.h2}"
    width="50" height="50">
    <h3>${product.h2}</h3>
    <p>Price: $${product.price}</p>
    </li>
    `;
        // Добавляем товар в корзину
        cartList.insertAdjacentHTML('beforeend', cartItemHTML);
    }
    console.log(productId);
}
// Обработчик клика на кнопки "Add to Cart"
document.addEventListener('click', (event) => {
    if (event.target &&
        event.target.classList.contains('add-to-cart')) {
        const productId =
            parseInt(event.target.getAttribute('data-id'), 10);
        addToCart(productId);
    }
});
// После загрузки DOM вызываем функцию для добавления продуктов
document.addEventListener('DOMContentLoaded', async () => {
    const data = await getFeature(fea_data);
    addProductsToList(data);
}); 