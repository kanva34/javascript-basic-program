document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    let Age = document.getElementById("age").value;
    let messageDiv = document.getElementById("message");
    let currentYear = new Date().getFullYear();
    if (!isNaN(Age) && Age.trim() !== "") {
        let currentAge = currentYear - Age;
        messageDiv.textContent = `your age is: ${currentAge}`
    } else {
        messageDiv.textContent = "please inter a valide value"
    }

})



