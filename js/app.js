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

    //Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
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
        shipping: shopItem.querySelector('.shipping').textContent,
        id: shopItem.querySelector('a').getAttribute('data-id')
    }
    
    addIntoCart(shopItemInfo);
}

function addIntoCart(shopItemInfo) {
    //create a <tr>
    const row = document.createElement('tr');

    //Build the template
    row.innerHTML = `
        <tr>
        <td><img src="${shopItem.image}" alt="" width="50"></td>
        <td width="100">${shopItem.title}</td>
        <td>${shopItem.price}</td>
        <td>${shopItem.shipping}</td>
        <td><a href="#" class="remove" data-id=${shopItem.id}>X</a></td>
        </tr>
    `;
    //add row into html
    shoppingCartContent.appendChild(row);

    //add to shop item to local storage
    saveIntoStorage(shopItem);

}

function saveIntoStorage(shopItem) {
    let storageItems = getFromStorage();

    //add the shop item into the array
    storageItems.push(shopItem);

    //since storage only saves strings we need to convert JSON into string
    localStorage.setItem('storageItems', JSON.stringify(storageItem) );
}

//get the contents from storage
function getFromStorage() {

    let storageItems;

    //if something exists on local storage then we get the value, otherwise create an empty array
    if(localStorage.getItem('shopItems') === null) {
        storageItems = [];
    } else {
        storageItems = JSON.parse(localStorage.getItem('storageItems') );
    } 
    return storageItems;
}

function removeItem(e) {

    //remove from the DOM
    if(e.target.classList.contains('remove') ) {
        e.target.parentElement.parentElement.remove();
        shopItem = e.target.parentElement.parentElement;
        shopItemId.querySelector('a').getAttribute('data-id'); 
    }

    //remove from local storage
    let shopItem, shopItemId;
    removeShopItemLocalStorage(shopItemId);

}
//remove from local storage
function removeShopItemLocalStorage(id) {
    //get the local storage datas 
    let storageItemsLS = getFromStorage();

    //loop through the array and find the index to remove
    storageItemsLS.forEach(function (storageItemsLS, index)  {
        if (storageItemLS.id === id) {
            storageItemsLS.splics(index, 1)
        }

         });

    //add the rest of the array
    localStorage.setItem('shopItems', JSON.stringify(storageItemsLS) )  ;

}

//Clears the cart
function clearCart(e) {
    while(shoppingCartContent) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //clear from local storage
    clearLocalStorage();
}

//Clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

//Loads when document is ready and prints from local storage
function getFromLocalStorage() {
    let storageItemsLS = getFromStorage();

    //loop through the courses and print into the cart
    storageItemsLS.forEach(storageItem => {
        //create the <tr>
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
        <tr>
        <td><img src="${shopItem.image}" alt="" width="50"></td>
        <td width="100">${shopItem.title}</td>
        <td>${shopItem.price}</td>
        <td>${shopItem.shipping}</td>
        <td><a href="#" class="remove" data-id=${shopItem.id}>X</a></td>
        </tr>    
        `;
        shoppingCartContent.appendChild(row);

    });
}