function toggleAddressFields() {
  var addressSelect = document.getElementById("addressSelect");
  var existingAddressDiv = document.getElementById("existingAddress");
  var newAddressDiv = document.getElementById("newAddress");

  if (addressSelect.value === "existing") {
    existingAddressDiv.style.display = "block";
    newAddressDiv.style.display = "none";
  } else if (addressSelect.value === "new") {
    existingAddressDiv.style.display = "none";
    newAddressDiv.style.display = "block";
  }
}
