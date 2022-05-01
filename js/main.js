class postre {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
// Definimos los articulos de la tienda
const cheeseCake = new postre('Cheese cake', 1000);
const lemonPie = new postre('Lemon pie', 1150);
const rogelCake = new postre('Torta rogel', 850);

let userName = prompt('Cual es tu nombre?');

// Validamos que el nombre del usuario no este vacio
if (userName == '') {
    alert('Debes ingresar un nombre');
} else {
    // Condiciones para saber que quiere comprar el usuario
    let preguntaCheeseCake = prompt('Te gustaria comer un ' + cheeseCake.name +'?');
    if (preguntaCheeseCake == 'si' || preguntaCheeseCake == 'Si') {
        console.log(userName + ' has comprado ' + cheeseCake.name + ' por el precio de $' + cheeseCake.price);
    } else {
        let preguntaLemonPie = prompt('Te gustaria comer un ' + lemonPie.name +'?');

        if (preguntaLemonPie == 'si' || preguntaLemonPie == 'Si') {
            console.log(userName + ' has comprado ' + lemonPie.name + ' por el precio de $' + lemonPie.price);
        } else {
            let preguntaRogelCake = prompt('Te gustaria comer un ' + rogelCake.name +'?');

            if (preguntaRogelCake == 'si' || preguntaRogelCake == 'Si') {
                console.log(userName + ' has comprado ' + rogelCake.name + ' por el precio de $' + rogelCake.price);
            } else {
                console.log('Gracias por tu visita, te esperamos pronto :)');
            }
        }
    }
}