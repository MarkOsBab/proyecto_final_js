let productos 
let container = document.getElementById("container")

    let response = fetch("./public/cakes.json").then(response => response.json())
    .then(cakes=> {
        console.log(cakes)
        cakes.cakes.forEach((productoEnArray) => {
            let caja = document.createElement("div")
            caja.classList.add('wrapper')
            caja.innerHTML = `
            <picture class="picture">
                <img class="pictureImg" src="${productoEnArray.image}" alt="">
            </picture>
            <div class="box">
                <h2 class="title">${productoEnArray.title}</h2>
                <p class="description">${productoEnArray.previewDescription}</p>
                <div class="btnBox">
                    <button class="buyBtn">Añadir al carrito</button>
                </div>
            </div>
            `
                container.append(caja)
            
        });
    }).catch(
        error => console.log(error)
    )