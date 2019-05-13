//Variables
const shopFloor = document.getElementById('shop-floor');
const shoppingCartContent = document.querySelector('.cart-content tbody');
const clearCartBtn = document.querySelector('#clear-cart');





//Event listeners
loadEventListeners();

function loadEventListeners() {

    shopFloor.addEventListener('click', buyItem);

    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeItem);

    //when the clear cart button is clicked
    clearCartBtn.addEventListener('click', clearCart);
}






//Functions

function buyItem(e) {

    //Use delegation to find the course that was added
    if (e.target.classList.contains('add-to-cart') ) {
        e.preventDefault();
        const shopItem = e.target.parentElement.parentElement;

        //Read the values
        getshopItem(shopItem);
    }
}

//Reads the html information of the shop item

function getshopItem(shopItem) {
    //Create an object with shop item data
    const shopItemInfo = {
        image: shopItem.querySelector('img').src,
        title: shopItem.querySelector('h5').textContent,
        price: shopItem.querySelector('p strong').textContent,
        shipping: shopItem.querySelector('.shipping').textContent
    }
    
    addIntoCart(shopItemInfo);
}

function addIntoCart(shopItem) {
    //create a <tr>
    const row = document.createElement('tr');

    //Build the template
    row.innerHTML = `
        <tr>
        <td><img src="${shopItem.image}" alt="" width="50"></td>
        <td>${shopItem.title}</td>
        <td>${shopItem.price}</td>
        <td>${shopItem.shipping}</td>
        <td><a href="#" class="remove" data-id=${shopItem.id}>X</a></td>
        </tr>
    `;
    //add row into html
    shoppingCartContent.appendChild(row);

}

function removeItem(e) {

    if(e.target.classList.contains('remove') ) {
        e.target.parentElement.parentElement.remove();
    }
}

//Clears the cart
function clearCart(e) {
    while(shoppingCartContent) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
}