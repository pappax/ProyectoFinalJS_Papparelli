class Regalo {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
  }
}

const Regalo_1 = new Regalo("1", "Buzo", 350, "../images/buzo.jpg");
const Regalo_2 = new Regalo("2", "Remera", 1550, "../images/remera.jpg");
const Regalo_3 = new Regalo("3", "Gorra", 600, "../images/gorra.jpg");
const Regalo_4 = new Regalo("4", "Taza", 1200, "../images/taza.jpg");
const Regalo_5 = new Regalo("5", "Parche", 1200, "../images/parche.jpg");
const Regalo_6 = new Regalo("6", "Mascara", 1200, "../images/mascara.jpg");
const Regalo_7 = new Regalo("7", "Distraz T-rex", 1200, "../images/Distraztrex.jpg");
const Regalo_8 = new Regalo("8", "Parasaurolophus", 350, "../images/parasaurolophus.jpg");
const Regalo_9 = new Regalo("9", "Tiranosurio Rex", 1550, "../images/tiranosaurio.jpg");
const Regalo_10 = new Regalo("10", "Ankylosaurus", 600, "../images/ankylosaurus.jpg");
const Regalo_11= new Regalo("11", "Stegosaurus", 1200, "../images/stegosaurus.jpg");
const Regalo_12= new Regalo("12", "Triceratops", 1200, "../images/triceratops.jpg");
const Regalo_13 = new Regalo("13", "Cryolophosaurus", 1200, "../images/cryolophosaurus.jpg");
const Regalo_14 = new Regalo("14", "Velociraptor", 1200, "../images/velociraptor.jpg");
const Regalo_15 = new Regalo("15", "Braquiosaurio", 1200, "../images/braquiosaurio.jpg");


const productos = [Regalo_1, Regalo_2, Regalo_3, Regalo_4, Regalo_5, Regalo_6, Regalo_7, Regalo_8, Regalo_9, Regalo_10, Regalo_11, Regalo_12, Regalo_13, Regalo_14, Regalo_15];


const contenedorProductos = document.getElementById("contenedor-productos");
const botonesCategorias = document.getElementById("boton-categoria");
const tituloPrincipal = document.getElementById("titulo-principal");
let botonesAgregar = document.getElementById("producto-agregar");
const numero = document.getElementById("numero");


function cargarProductos(productosElegidos) {

  contenedorProductos.innerHTML = "";

  productosElegidos.forEach(producto => {

    const div = document.createElement("div");
    div.className = "col"
    div.innerHTML = `
            <div class="card p-3">
                <img src="${producto.img}" class="card-img-top rounded">
                <div class="card-body">        
                    <h5 class="card-title">${producto.nombre}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">$${producto.precio}</li>
                    <button class="producto-agregar btn btn-warning m-3" id="${producto.id}">Agregar</button>
                 </ul>
             </div>
        `;

    contenedorProductos.append(div);
  })

  actualizarBotonesAgregar();
}

cargarProductos(productos);


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarnumero();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarnumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarnumero() {
        
    let nuevonumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    console.log(nuevonumero)
    numero.innerText = nuevonumero;
}