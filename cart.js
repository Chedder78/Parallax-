document.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.getElementById("homeButton");
    const editButton = document.getElementById("editButton");
    const refreshCartButton = document.getElementById("refreshCartButton");

    homeButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Update this URL to your home page path
    });

    editButton.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".item-checkbox");
        checkboxes.forEach((checkbox) => {
            checkbox.style.display = "inline-block";
        });
        alert("You can now select items to remove.");
    });

    refreshCartButton.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".item-checkbox");
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkbox.parentElement.remove();
            }
        });
        alert("Cart refreshed with your new selection.");
    });
});
