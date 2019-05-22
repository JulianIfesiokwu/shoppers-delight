//Variables
const shopFloor = document.getElementById('shop-floor');





//Eventlisteners
loadEventListeners();

function loadEventListeners() {
    shopFloor.addEventListener('click', buyItem);
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