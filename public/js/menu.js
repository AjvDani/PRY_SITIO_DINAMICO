document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("productos");
    const modalBody = document.getElementById("modalBody");

    try {
        // 🔹 Cargar datos desde el JSON
        const respuesta = await fetch("./public/data/productos.json");
        const productos = await respuesta.json();

        // 🔹 Renderizar productos dinámicamente
        productos.forEach(producto => {
            const col = document.createElement("div");
            col.className = "col-md-6";

            col.innerHTML = `
                <div class="card border-0 shadow-sm h-100" style="background-color: #f2e6d9;">
                    <img src="${producto.imagen}" class="card-img-top rounded-top" alt="${producto.nombre}">
                    <div class="card-body text-center">
                        <h5 class="card-title" style="color: #5b3a29;">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcionCorta}</p>
                        <button class="btn btn-sm ver-detalle" 
                            style="background-color: #a7744c; color: #fff;"
                            data-bs-toggle="modal" 
                            data-bs-target="#detalleProducto"
                            data-descripcion="${producto.descripcionLarga}">
                            Ver detalle
                        </button>
                    </div>
                </div>
            `;

            contenedor.appendChild(col);
        });

        // 🔹 Escuchar clics en los botones generados
        contenedor.addEventListener("click", e => {
            if (e.target.classList.contains("ver-detalle")) {
                const descripcion = e.target.getAttribute("data-descripcion");
                modalBody.innerHTML = `<p>${descripcion}</p>`;
            }
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar el menú ☕</p>`;
    }
});
