if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

totaljs = 0;

function ready() {

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {

    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    totaljs = Math.round(totaljs) / 100

    // this section is to be checked through
    
        $ ( document ).ready(function() {
            var exp = 0;
    
    
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://id2tes-fe40.restdb.io/rest/userinfo",
                "method": "GET",
                "headers": {
                "content-type": "application/json",
                "x-apikey": "63e5fe33478852088da67ff1",
                "cache-control": "no-cache"
                }
            }
    
            $.ajax(settings).done(function (response) {
                let id = localStorage.getItem("id")
                for (var i = 0; i < response.length; i++ )
                {
                    if (id == response[i]._id)
                    {
                        exp = response[i].Exp;
                        exp += totaljs;
    
                        //need to look at this tommorow
    
                        var jsondata = {"Exp": exp};
                        var settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": `https://id2tes-fe40.restdb.io/rest/userinfo/${id}`,
                            "method": "PUT",
                            "headers": {
                                "content-type": "application/json",
                                "x-apikey": "63e5fe33478852088da67ff1",
                                "cache-control": "no-cache"
                            },
                            "processData": false,
                            "data": JSON.stringify(jsondata)
                        }
                    
                        $.ajax(settings).done(function (response) {
                            console.log(exp);
                        });
                    }
    
                }
            });
    
    
    
    
    
        })

    let popup = document.getElementById('lottie-anim')
    popup.classList.toggle('active')
    delay(2500).then(deactivate);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time)); // in ms
  }

function deactivate() {
    let popup = document.getElementById('lottie-anim')
    popup.classList.toggle('active')
}



function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var total = 0;
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    totaljs += total
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
