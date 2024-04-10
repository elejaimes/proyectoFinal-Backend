// configuración de boton "Ver detalles" de las cards

document.addEventListener("DOMContentLoaded", function () {
  const viewDetailsButtons = document.querySelectorAll(".view-details");
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const productId = this.getAttribute("data-product");
      const detailsContainer = document.getElementById(`details_${productId}`);
      const buttonText = this.textContent.trim();

      // Si el contenedor de detalles está visible, ocúltalo; de lo contrario, muéstralo
      if (detailsContainer.style.display === "block") {
        detailsContainer.style.display = "none";
        // Cambia el texto del botón a "Ver detalles" cuando los detalles están ocultos
        this.textContent = "Ver detalles";
      } else {
        // Oculta todos los detalles antes de mostrar el seleccionado
        document.querySelectorAll(".details-container").forEach((container) => {
          container.style.display = "none";
        });

        // Muestra los detalles del producto seleccionado
        detailsContainer.style.display = "block";
        // Cambia el texto del botón a "Ocultar detalles" cuando los detalles están visibles
        this.textContent = "Ocultar detalles";
      }
    });
  });
});

//solo números

function soloNumeros(event) {
  const charCode = event.keyCode || event.which;
  const charStr = String.fromCharCode(charCode);
  // Solo permitir la entrada de números
  if (!/^\d+$/.test(charStr)) {
    event.preventDefault();
  }
}
