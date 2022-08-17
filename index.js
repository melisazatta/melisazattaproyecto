let productos = [
    {
        id: 1,
        nombre: "Camisa",
        img: "/assets/descarga.jpg",
        precio: 3000,
        //cantidad: 1
    },
    {
        id: 2,
        nombre: "Campera",
        img: "/assets/descarga.jpg",
        precio: 5000
    },
    {
        id: 3,
        nombre: "Zapatillas",
        img: "/assets/descarga.jpg",
        precio: 7000
    },
    {
        id: 4,
        nombre: "Pantalon",
        img: "/assets/descarga.jpg",
        precio: 2500
    },
    {
        id: 5,
        nombre: "Remera",
        img: "/assets/descarga.jpg",
        precio: 2300
    },
    {
        id: 6,
        nombre: "Jean",
        img: "/assets/descarga.jpg",
        precio: 6000
    },
    {
        id: 7,
        nombre: "Bufanda",
        img: "/assets/descarga.jpg",
        precio: 2000
    },
    {
        id: 8,
        nombre: "Sandalias",
        img: "/assets/descarga.jpg",
        precio: 4000
    },
]
const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('contenedor-carrito');

const botonVaciar = document.getElementById('vaciar-carrito');
const contadorCarrito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        //carga la informacion guardada en localStorage
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//Vaciar carrito y borrar del storage
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    localStorage.clear();
})
//Renderiza cards
productos.forEach((producto) => {
    const div = document.createElement('DIV');
    div.classList.add('producto');
    div.innerHTML = `
    <img src=${producto.img} alt="">
    <h2>${producto.nombre}</h2>
    <p class="precioProducto">Precio: $ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class= "fas-fa-shopping-cart"></i></button>
    `

    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
       agregarCarrito(producto.id) 
    })
    
});
//Agregar al carrito
const agregarCarrito = (prodId) => {
    const exist = carrito.some (prod => prod.id === prodId)
    if (exist) {
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++ //Falta
            }
        })
    }else {

    const item = productos.find((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)
}
actualizarCarrito()
}
//Eliminar un producto del carrito
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}
//Actualiza el carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
                    <p>${prod.nombre}</p>
                    <p>Precio: $ ${prod.precio}</p>
                    
                    <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `//<p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>

        //guarda carrito en localStorage
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    //Contador
    contadorCarrito.innerText = carrito.length
    //Suma el precio de cada producto agregado
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + parseInt(prod.precio), 0)

}




