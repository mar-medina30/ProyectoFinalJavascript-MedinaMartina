let librosCarrito = localStorage.getItem("libros-carrito");
librosCarrito = JSON.parse(librosCarrito);
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoBotones = document.querySelector("#carrito-botones");
const contLibrosCarrito = document.querySelector("#cont-libros-carrito");
let eliminarLibro = document.querySelectorAll(".carrito-eliminar");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const carritoComprar = document.querySelector("#carrito-comprar");
const total = document.querySelector("#total");

function subirLibrosAlCarrito() {
    if(librosCarrito && librosCarrito.length > 0) {
        carritoVacio.classList.add("no-mostrar");
        contLibrosCarrito.classList.remove("no-mostrar");
        carritoBotones.classList.remove("no-mostrar");
        carritoComprar.classList.remove("no-mostrar");

        contLibrosCarrito.innerHTML = "";
    
        librosCarrito.forEach(libro => {
        const contenedor = document.createElement("div");
        contenedor.classList.add("carrito-libro")
            contenedor.innerHTML = `
            <img class="carrito-libro-img" src="${libro.imagen}" alt="${libro.nombre}">
            <div class="carrito-libro-titulo">
                <small>Título</small>
                <h3>${libro.nombre}</h3>
            </div>
            <div class="carrito-libro-cantidad">
                <small>Cantidad</small>
                <p>${libro.cantidad}</p>
            </div>
            <div class="carrito-libro-precio">
                <small>Precio</small>
                <p>$${libro.precio * libro.cantidad}</p>
            </div>
    
            <button class="carrito-eliminar" id="${libro.id}"><i class="fa-solid fa-trash-can"></i></button>
            `;
    
            contLibrosCarrito.append(contenedor);
    
        })
    }else{
        carritoVacio.classList.remove("no-mostrar");
        contLibrosCarrito.classList.add("no-mostrar");
        carritoBotones.classList.add("no-mostrar");
        carritoComprar.classList.add("no-mostrar");
    }
    newBtnEliminarCarrito();
    compraTotal();
    
} 

subirLibrosAlCarrito();


function newBtnEliminarCarrito() {
    eliminarLibro = document.querySelectorAll(".carrito-eliminar");
    eliminarLibro.forEach(btn => {
        btn.addEventListener("click", eliminarLibroDelCarrito)
    });
}

contLibrosCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("carrito-eliminar")) {
        eliminarLibroDelCarrito(e);
    }
});

function eliminarLibroDelCarrito(e) {
    const idBtn = e.currentTarget.id; 
    const indice = librosCarrito.findIndex(libro => libro.id == idBtn);
    if (indice !== -1) {
        librosCarrito.splice(indice, 1);
        subirLibrosAlCarrito();
        localStorage.setItem("libros-carrito", JSON.stringify(librosCarrito));
    }
}

vaciarCarrito.addEventListener("click", vaciarElCarrito);

function vaciarElCarrito() {
    librosCarrito.length = 0;
    localStorage.setItem("libros-carrito", JSON.stringify(librosCarrito));
    subirLibrosAlCarrito();
    newBtnEliminarCarrito()
}

function compraTotal() {
    const calcularTotal = librosCarrito.reduce((i, libro) => i + (libro.precio * libro.cantidad), 0);
    total.innerText = `$${calcularTotal}`;
}

