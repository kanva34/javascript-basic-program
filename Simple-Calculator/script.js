document.querySelector("button").addEventListener("click", (event) => {
            event.preventDefault();
            const numb1 = Number(document.getElementById("num1").value);
            const numb2 = Number(document.getElementById("num2").value);
            const operationvalue = document.getElementById("operation").value
            const messageDiv = document.getElementById("message")
            let result;
            switch (operationvalue) {
                case "add":
                    result = numb1 + numb2
                    break;
                case "subtract":
                    result = numb1 - numb2
                    break;
                case "multiply":
                    result = numb1 * numb2
                    break;
                case "divide":
                    if (num2 !== 0) {
                        result = numb1 / numb2;
                    } else {
                        result = "Error: Division by zero not allowed.";
                    }
                    break;

                default:
                    result = "Invalid operation.";
            }
            messageDiv.innerText = `Result: ${result}`

        })