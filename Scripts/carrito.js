let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.getElementById("carrito-vacio");
const contenedorCarritoProductos = document.getElementById("carrito-productos");
const contenedorCarritoAcciones = document.getElementById("carrito-acciones");
const contenedorCarritoComprado = document.getElementById("carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.getElementById("carrito-acciones-vaciar");
const contenedorTotal = document.getElementById("total");
const botonComprar = document.getElementById("carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("d-none");
        contenedorCarritoProductos.classList.remove("d-none");
        contenedorCarritoAcciones.classList.remove("d-none");
        contenedorCarritoComprado.classList.add("d-none");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("card-group");
            div.innerHTML = `
            <div class="card border-light mb-3" style="max-width: 1024px;">
            <div class="row g-0">
              <div class="col-md-4 d-flex flex-column align-items-center">
                <img src="${producto.img}" style="max-width: 100px;" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <ul class="list-group list-group-horizontal text-center">
                    <li class="list-group-item list-group-item border-0">
                        <p class="card-text">Cantidad ${producto.cantidad}</p> 
                    </li>
                    <li class="list-group-item list-group-item border-0 ms-lg-3 d-none d-sm-block">
                        <p class="card-text">Precio $${producto.precio}</p>
                    </li>
                    <li class="list-group-item list-group-item border-0 ms-lg-4">
                        <p class="card-text">Subtotal $${producto.precio * producto.cantidad}</p>
                    </li>
                    <li class="list-group-item list-group-item border-0 ms-lg-4">
                        <button type="button" class="carrito-producto-eliminar btn btn-light  btn-sm" id="${producto.id}">Eliminar</button>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    } else {
        contenedorCarritoVacio.classList.remove("d-none");
        contenedorCarritoProductos.classList.add("d-none");
        contenedorCarritoAcciones.classList.add("d-none");
        contenedorCarritoComprado.classList.add("d-none");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("d-none");
    contenedorCarritoProductos.classList.add("d-none");
    contenedorCarritoAcciones.classList.add("d-none");
    contenedorCarritoComprado.classList.remove("d-none");

    Swal.fire({
        icon: 'success',
        title: 'Compra Finalizada',
        confirmButtonColor: '#ffcd39',
        confirmButtonText: 'Volver a la Tienda'
    }).then((result) => {
        if (result.value) {
            window.location.href="../pages/tienda.html";
        }
    })

}
