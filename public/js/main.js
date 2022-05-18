class Products {
    constructor (nombre, size, precio) {
        this.nombre = nombre;
        this.size = size;
        this.precio = precio;
    }
}

const Product1 = new Products('Chajá', 'Mediano', 1200);
const Product2 = new Products('Massini', 'Grande', 1600);
const Product3 = new Products('Alpino de chocolate', 'Mediano', 1300);
const Product4 = new Products('Cheese Cake', 'Chico', 1100);
const Product5 = new Products('Galletitas decoradas', 'Chico', 50);
const Product6 = new Products('Torta rogel', 'Mediano', 1000);

let destacados = [Product1, Product2, Product3, Product4, Product5, Product6];

let carrito = [];

if (localStorage.getItem('carrito')) {
    //Conversión de JSON a OBJETO
    carrito = JSON.parse(localStorage.getItem('carrito'));
} else {
    //Conversión objeto a json
    localStorage.getItem('carrito', JSON.stringify(carrito));
}

// Variables
let divCarrito = document.querySelector('#elementosCarrito_vista');
let divDestacados = document.querySelector('#destacados');
let spanCarrito = document.querySelector('#elementosCarrito');
// Mostramos los productos en su caja contenedora
destacados.forEach((productoEnArray, indice) => {
    divDestacados.innerHTML += `
        <div class="col-sm-6 col-md-3 col-lg-3 border m-3 p-3" id="destacado${indice}>
            <h2 class="text-center"><b>${productoEnArray.nombre}</b></h2>
            <small>(${productoEnArray.size})</small>
            <h4><b>$${productoEnArray.precio}</b></h4>
            <div class="row justify-content-center mt-3">
                <button id="boton-destacado${indice}" class="btn btn-success"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
    `
});
// Seleccionamos el span para mostrar la cantidad de elementos en el carrito
spanCarrito.innerText = '(' + carrito.length +')';

destacados.forEach((productoEnArray, indice) => {
    document.querySelector(`#boton-destacado${indice}`).addEventListener('click', (event) => {
        event.preventDefault();
        // Sumamos productos al carrito
        let getLenght = carrito.length;
        let i=1;
        let sumCart = getLenght + i;
        spanCarrito.innerText = '(' + sumCart +')';
        let productoCarrito = destacados[indice];
        carrito.push(productoCarrito);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        divCarrito.innerHTML += `
            <div class="w-100 d-flex justify-content-center" id="carrito${indice}">
                <h3 class="m-2">${productoEnArray.nombre} <small>(${productoEnArray.size})</small></h3>
                <h3 class="m-2">${productoEnArray.precio}</h3>
            </div>
            <hr/>
        `
        
    });
});

// Mostramos los elementos en el carrito
carrito.forEach((carritoEnArray, indice) => {
    divCarrito.innerHTML += `
        <div class="w-100 d-flex justify-content-center" id="carrito${indice}">
            <h3 class="m-2">${carritoEnArray.nombre} <small>(${carritoEnArray.size})</small></h3>
            <h3 class="m-2">${carritoEnArray.precio}</h3>
        </div>
        <hr/>
    `
});

// Vaciamos el carrito
let vaciaCarrito = document.querySelector('#vaciaCarrito');
vaciaCarrito.addEventListener('click', (event) => {
    event.preventDefault();
    let sumCart = 0;
    spanCarrito.innerText = '(' + sumCart +')';
    localStorage.clear();
    document.querySelector('#cartFather').removeChild(divCarrito);
});
