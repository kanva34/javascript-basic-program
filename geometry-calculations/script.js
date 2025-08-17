//* Program to calculate area of a circle

const PI = 3.14159;

let radius = prompt("Enter the radius of the circle:");
radius = Number(radius);

if (isNaN(radius) || radius <= 0) {
    alert("Please enter a valid positive number for radius.");
} else {
    let area = PI * radius * radius;
    alert(`The area of the circle is: ${area}`);
}