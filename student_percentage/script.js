//* Ask user their obtained and total marks

let obtainedMarks = prompt("Enter your obtained marks:");
let totalMarks = prompt("Enter your total marks:");

obtainedMarks = Number(obtainedMarks);
totalMarks = Number(totalMarks);

if (isNaN(obtainedMarks) || isNaN(totalMarks) || totalMarks <= 0) {
  alert("Please enter valid numbers!");
} else {
  
  let percentage = (obtainedMarks / totalMarks) * 100;

  alert("Your percentage is: " + percentage.toFixed(2) + "%");
}
