const contenedorLibros = document.querySelector("#contenedor-libros");
const btnCategorias = document.querySelectorAll(".btn-categoria");
let tituloCategoria = document.querySelector("#titulo-categoria");
let btnAgregarCarrito = document.querySelectorAll(".agregar-carrito");
const masVendidos = document.querySelector("#libros-mas-vendidos");

function newBtnAgregarCarrito() {
    btnAgregarCarrito = document.querySelectorAll(".agregar-carrito");
    btnAgregarCarrito.forEach(btn => {
        btn.addEventListener("click", agregarCarrito);
    });
}

let productosElegidos;
async function cargarLibros(categoriaSeleccionada = null) {
    const respuesta = await fetch("data.json");
    productosElegidos = await respuesta.json();
    contenedorLibros.innerHTML = "";

    productosElegidos.forEach(libro => {
        if (!categoriaSeleccionada || libro.categoría.id === categoriaSeleccionada) {
            const div = document.createElement("div");
            div.classList.add("libro");
            div.innerHTML = `
                <img class="libro-imagen" src="${libro.imagen}" alt="${libro.nombre}">
                <div class="detalles">
                    <h3 class="libro-titulo">${libro.nombre}</h3>
                    <p>Autor/a: ${libro.autor}</p>
                    <p>$${libro.precio}</p>
                    <button class="agregar-carrito" id="${libro.id}">AGREGAR AL CARRITO</button>
                </div>
            `;
            contenedorLibros.append(div);
        }
    });

    newBtnAgregarCarrito();
}

cargarLibros();

let librosCarrito;
let carrito = localStorage.getItem("libros-carrito");

carrito 
    ? librosCarrito = JSON.parse(carrito)
    : librosCarrito = [];

btnCategorias.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const categoriaSeleccionada = e.currentTarget.id;
        if (categoriaSeleccionada !== "todos") {
            tituloCategoria.innerText = categoriaSeleccionada;
            cargarLibros(categoriaSeleccionada);
        } else {
            tituloCategoria.innerText = "todos";
            cargarLibros();
        }
    });
});

function agregarCarrito(e) {
    const idLibro = e.currentTarget.id;
    const libroAgregado = productosElegidos.find(libro => libro.id == idLibro);

    if (libroAgregado) {
        const libroEnCarrito = librosCarrito.find(libro => libro.id == idLibro);

        if (libroEnCarrito) {
            libroEnCarrito.cantidad++;
        } else {
            libroAgregado.cantidad = 1;
            librosCarrito.push(libroAgregado);
        }

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se agregó al carrito",
            showConfirmButton: false,
            timer: 1500
        });
        localStorage.setItem("libros-carrito", JSON.stringify(librosCarrito));
        subirLibrosAlCarrito();
    }
}

const librosMasVendidos = async () => {
    const respuesta = await fetch("data.json");
    const librosVendidos = await respuesta.json();

    const librosMasVendidos = librosVendidos.filter(libro => libro.masVendidos === true);

    librosMasVendidos.forEach(libro => {
        const divMasVendidos = document.createElement("div");
        divMasVendidos.classList.add("libro");
        divMasVendidos.innerHTML = `
            <img class="libro-imagen" src="${libro.imagen}" alt="${libro.nombre}">
            <div class="detalles">
                <h3 class="libro-titulo">${libro.nombre}</h3>
                <p>Autor/a: ${libro.autor}</p>
                <p>$${libro.precio}</p>
                <button class="agregar-carrito" id="${libro.id}">AGREGAR AL CARRITO</button>
            </div>
        `;
        masVendidos.append(divMasVendidos);
    });

    newBtnAgregarCarrito();
}

// Llama a la función librosMasVendidos para cargar los libros más vendidos
librosMasVendidos();