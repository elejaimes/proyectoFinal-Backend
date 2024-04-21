document.addEventListener("DOMContentLoaded", function () {
  const quantityForms = document.querySelectorAll(".update-quantity-form");

  quantityForms.forEach((form) => {
    form.addEventListener("change", function (event) {
      event.preventDefault();

      const productId = form.dataset.productId;
      const quantity = event.target.value;

      // Enviar la solicitud AJAX al servidor
      fetch(`/cart/update-quantity/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: form.dataset.productId, // Assuming data-productId holds the cartId
          productId: form.dataset.productId,
          quantity: event.target.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log("Carrito actualizado:", data);
          } else {
            console.log("Error al actualizar el carrito.");
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  });
});
