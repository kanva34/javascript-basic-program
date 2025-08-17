//*simple calculator

let num1 = Number(prompt("Enter the first number:"));
let num2 = Number(prompt("Enter the second number:"));

let choice = prompt("Enter your choice:\n1 for Add\n2 for Subtract\n3 for Multiply\n4 for Divide");

if (choice === "1") {
    console.log(`Result: ${num1 + num2}`);
} else if (choice === "2") {
    console.log(`Result: ${num1 - num2}`);
} else if (choice === "3") {
    console.log(`Result: ${num1 * num2}`);
} else if (choice === "4") {
    if (num2 !== 0) {
        console.log(`Result: ${num1 / num2}`);
    } else {
        console.log("Error: Division by zero not allowed.");
    }
} else {
    console.log("Invalid choice! Please enter 1, 2, 3, or 4.");
}