let calculateGrade = ((marks) =>{
  if (marks >= 90) {
    return "Grade A";
  } else if (marks >= 75) {
    return "Grade B";
  } else if (marks >= 60) {
    return "Grade C";
  } else {
    return "Fail";
  }
}
)

for (let i = 1; i <= 3; i++) {
  let studentName = prompt(`Enter name of student ${i}:`);
  let studentMarks = Number(prompt(`Enter marks (out of 100) for ${studentName}:`));

  while (isNaN(studentMarks) || studentMarks < 0 || studentMarks > 100 ) {
    studentMarks = prompt(`Invalid input. Please enter marks (0-100) for ${studentName}:`    
    );
  }

  let grade = calculateGrade(studentMarks);

  console.log(`${studentName} scored ${studentMarks} → ${grade}`);
}