document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const temperature = parseFloat(document.getElementById("temperature").value);
    const messageDiv = document.getElementById("message");
    if (!isNaN(temperature)) {
        const fahrenheit = (temperature * 9 / 5) + 32;
        messageDiv.textContent = `${temperature}°C is ${fahrenheit.toFixed(2)}°F`;
    } else {
        messageDiv.textContent = "Please enter a valid number.";
    }
});