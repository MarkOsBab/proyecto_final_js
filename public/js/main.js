let productos 
let container = document.getElementById("container")
let cart = document.getElementById("cart")
let cartCount = document.getElementById("cartCount")
let showItemsInCart = document.getElementById('showItemsInCart')
let textTotal = document.getElementById("total")
let trash = document.getElementById("trash")
let carrito = []
if (localStorage.getItem('carrito')) {
    //Conversión de JSON a OBJETO
    carrito = JSON.parse(localStorage.getItem('carrito'));
} else {
    //Conversión objeto a json
    localStorage.getItem('carrito', JSON.stringify(carrito));
}
function showData()
{
    const traerDatosJson = async () => {
        let response = await fetch("./cakes.json")
        let data = await response.json()
        cakes = data.cakes

        for (const product of cakes) {
        let caja = document.createElement("div")
        caja.classList.add('wrapper')
        caja.setAttribute("id", `container${product.id}`);
        caja.innerHTML = `
        <picture class="picture">
            <img class="pictureImg" src="${product.image}" alt="">
        </picture>
        <div class="box">
            <h2 class="title">${product.title}</h2>
            <p class="description">${product.previewDescription}</p>
            <div class="btnBox">
                <button id="addToCart${product.id}" class="buyBtn">Añadir al carrito</button>
            </div>
        </div>
        `
        container.append(caja)
        document.querySelector(`#addToCart${product.id}`).addEventListener('click', (event) => {
            event.preventDefault();
            // Sumamos productos al carrito
            let productoCarrito = product
            carrito.push(productoCarrito)
            localStorage.setItem('carrito', JSON.stringify(carrito))
            function sumCart() {
                // Sumamos datos al carrito
                cartCount.innerText = '(' + carrito.length +')'
            }
            sumCart()
            Toastify({
                text: `${product.title} se añadido al carrito`,
                duration: 3000,
                gravity: "bottom",
                close: true,
                stopOnFocus: true,
                style: {background: "#383838"},
                }).showToast();
                    showItemsInCart.innerHTML += `
                    <tr>
                        <td>${product.title}</td>
                        <td>${product.previewDescription}</td>
                        <td>$${product.price}</td>
                    </tr>
                    `
                    getTotal()
        })
        trash.addEventListener('click', (event) => {
            event.preventDefault();
            showItemsInCart.innerHTML = ""
            localStorage.removeItem('carrito', carrito.length)
            setInterval("location.reload()",500);
        })
        }
    }
    return traerDatosJson()
}

showData()

carrito.forEach((carritoEnArray) => {
    showItemsInCart.innerHTML += `
    <tr>
        <td>${carritoEnArray.title}</td>
        <td>${carritoEnArray.previewDescription}</td>
        <td>$${carritoEnArray.price}</td>
    </tr>
    `
});

function getTotal(arr) {
    'use strict';

    let total = 0.00;
    carrito.forEach(function(item) {
        total += (item.price);
    });
    textTotal.innerHTML = total
    return total;
    
}
getTotal()
const pagar = async () => {

    const productosToMap = carrito.map(Element => {
        let nuevoElemento = 
        {
            id: Element.id,
            title: Element.title,
            description: Element.previewDescription,
            picture_url: Element.img,
            category_id: Element.id,
            quantity: 1,
            currency_id: "ARS",
            unit_price: Element.price
        }
        return nuevoElemento
    })
    let response = await fetch("https://api.mercadopago.com/checkout/preferences", {

        method: "POST",
        headers: {
            Authorization: "Bearer TEST-2415153398066479-052719-b115e83753fdb7d1100912530c7ac480-60191006"
        },
        body: JSON.stringify({
            items: productosToMap
        })
    })
    let data = await response.json()
    console.log(data)
    window.open(data.init_point, "_blank")
}