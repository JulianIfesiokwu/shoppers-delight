//Variables
const shopFloor = document.getElementById('shop-floor');
const shoppingCartContent = document.querySelector('.cart-content tbody');
const clearCartBtn = document.getElementById('clear-cart');


//Eventlisteners
loadEventListeners();

function loadEventListeners() {
    //when a shop item is added
    shopFloor.addEventListener('click', buyItem);

    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeShopItem);

    //when the clear cart button is clicked
    clearCartBtn.addEventListener('click', clearCart);

    //Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage)
}


//Functions

function buyItem(e) {
    e.preventDefault();
    //Use delegation to find select the targeted shop item
    if(e.target.classList.contains('add-to-cart') ) {
        
        //read the shop item values
        const shopItem = e.target.parentElement.parentElement;

        //get required values
        getShopItemInfo(shopItem);
    }
}

//Reads the html information of the selected shop item
function getShopItemInfo(shopItem) {
    //Create an object with shop item data
    const shopItemInfo = {
    image: shopItem.querySelector('img').src,
    title: shopItem.querySelector('h5').textContent,
    price: shopItem.querySelector('p strong').textContent,
    id: shopItem.querySelector('a').getAttribute('data-id')
    }
    addIntoCart(shopItemInfo)
}

function addIntoCart(shopItem) {
    //create a <tr>
    const row = document.createElement('tr');

    //build the template
    row.innerHTML = `
    <tr>
        <td><img src="${shopItem.image}" width=50></td>
        <td>${shopItem.title}</td>
        <td>${shopItem.price}</td>
        <td><a href="#" class="remove" data-id="${shopItem.id}">X</a></td>
    </tr>    
    `;
    //add into the shopping cart
    shoppingCartContent.appendChild(row);

    //add the shop item into local storage
    saveIntoStorage(shopItem);
}

//add the shop item into local storage
function saveIntoStorage(shopItem) {

    let shopItems = getShopItemsFromStorage();

    //add shop itesm into the array
    shopItems.push(shopItem);

    //since storage only saves strings we need to convert to strings
    localStorage.setItem('shopItems', JSON.stringify(shopItems) );
}

//get the shop item from storage
function getShopItemsFromStorage() {
    
    let shopItems;

    //if something exists in storage get the values otherwise create an empty array
    if (localStorage.getItem('shopItems') === null) {
        shopItems = [];
    } else {
        shopItems = JSON.parse(localStorage.getItem('shopItems') )
    }
    return shopItems;
}

//remove shop item from cart
function removeShopItem (e) {
    let shopItem, shopItemId;

    if(e.target.classList.contains('remove') ) {
        e.target.parentElement.parentElement.remove();
        shopItem = e.target.parentElement.parentElement
        shopItemId = shopItem.querySelector('a').getAttribute('data-id');
    }
    //remove from local storage
    removeShopItemLocalStorage(shopItemId);
}

//remove from local storage
function removeShopItemLocalStorage(id) {

    //get the shop items from local storage
    let shopItemsLS = getShopItemFromStorage();

    //loop through the array and find the index to remove
    shopItemsLS.forEach(function(shopItemsLS, index) {
        if (courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });
    //add the rest of the array
    localStorage.setItem('shopItems', JSON.stringify(shopItemsLS) );
}

//Clear the cart
function clearCart(e) {
    //shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //Clears local storage
    clearLocalStorage();
}

function clearLocalStorage() {
    localStorage.clear();
}

//Loads when document is ready and prints shop items into shopping cart
function getFromLocalStorage() {

    let shopItemsLS = getShopItemsFromStorage();
    //loop through the shop items and print into shopping cart
    shopItemsLS.forEach(function(shopItem) {
         //create a <tr>
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
        <tr>
            <td><img src="${shopItem.image}" width=50></td>
            <td>${shopItem.title}</td>
            <td>${shopItem.price}</td>
            <td><a href="#" class="remove" data-id="${shopItem.id}">X</a></td>
        </tr>    
        `;
        shoppingCartContent.appendChild(row);
    })

}
