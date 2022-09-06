const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const botonVaciar = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contadorCarrito");

const precioTotal = document.getElementById("precioTotal");

// let carrito = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) !== null ? JSON.parse(localStorage.getItem('carrito')) : []
console.log(carrito)

//Consumo datos de api simulada en url mediante FETCH
let url = "https://www.mockachino.com/f6331d36-ef9d-4a/productos";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    let productos = json.productos;

    //Renderiza cards
    productos.forEach((producto) => {
      const { id, nombre, img, precio } = producto;
      const div = document.createElement("DIV");
      div.classList.add("producto");
      div.innerHTML = `
                  <img src=${img} alt="">
                  <h2>${nombre}</h2>
                  <p class="precioProducto">Precio: $ ${precio}</p>
                  <button id="agregar${id}" class="btn boton-agregar">Agregar <i class= "fas-fa-shopping-cart"></i></button>
                  `;

      contenedorProductos.appendChild(div);

      const boton = document.getElementById(`agregar${id}`);

      boton.addEventListener("click", () => {
        agregarCarrito(id);
      });
    });

    // document.addEventListener("DOMContentLoaded", () => {
    //   if (localStorage.getItem("carrito")) {
    //     //carga la informacion guardada en localStorage
    //     carrito = JSON.parse(localStorage.getItem("carrito"));
    //     actualizarCarrito();
    //   }
    // });


    actualizarCarrito()


    //Vaciar carrito y borrar del storage
    botonVaciar.addEventListener("click", () => {
      carrito.length = 0;
      actualizarCarrito();
      localStorage.clear();
      swal({
        title: "Vaciaste el carrito con exito!",
        icon: "success",
        button: "Ok",
      });
    });

    //Agregar al carrito
    const agregarCarrito = (prodId) => {
      const exist = carrito.some((prod) => prod.id === prodId);
      
      if (exist) {
        const prod = carrito.map((prod) => {
          if (prod.id === prodId) {
            prod.cantidad++; //Falta
          }
        });
      } else {
        const item = productos.find((prod) => prod.id === prodId);
        carrito.push(item);
        //console.log(carrito)
        swal({
          title: `Agregaste ${item.nombre} al carrito!`,
          icon: "success",
          button: "Ok",
        });
      }
      actualizarCarrito();
    };


  });

//Eliminar un producto del carrito
const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
  // swal({
  //   title: `Eliminaste ${item.nombre} del carrito!`,
  //   icon: "error",
  //   button: "Ok",
  // });
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
//Actualiza el carrito
const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((prod) => {
    const { id, nombre, img, precio } = prod;
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
                    <p>${nombre}</p>
                    <p>Precio: $ ${precio}</p>
                    
                    <button onclick="eliminarDelCarrito(${id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `; //<p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>

    //guarda carrito en localStorage
    contenedorCarrito.appendChild(div);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });

  //Contador
  contadorCarrito.innerText = carrito.length;
  //Suma el precio de cada producto agregado
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + parseInt(prod.precio),
    0
  );
};




const botonComprar = document.getElementById("comprar");

botonComprar.addEventListener("click", () => {
  if (carrito.length !==0)
 {swal({
    title: `Compra realizada con exito!`,
    text: `Total a pagar: $ ${precioTotal.innerText}.`,
    icon: "success",
    button: "Ok",
  });
 
  carrito.length = 0;
  actualizarCarrito();
  localStorage.clear();}
  else{
    swal({
      title: "El carrito está vacio!",
      icon: "error",
      button: "Ok",
    });
  }
 
});