 const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const height = Number(document.getElementById("height").value);
      const weight = Number(document.getElementById("weight").value);
      const results = document.getElementById("results");

      if (!height || height <= 0 || isNaN(height)) {
        results.innerHTML = `Please enter a valid height.`;
      } else if (!weight || weight <= 0 || isNaN(weight)) {
        results.innerHTML = `Please enter a valid weight.`;
      } else {
        // BMI formula: weight (kg) / [height (m)]^2 frome chrome://bmi-calculator
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        // Determine the BMI category according to the BMI value
        let category = "";
        if (bmi < 18.6) {
          category = "Under Weight";
        } else if (bmi >= 18.6 && bmi <= 24.9) {
          category = "Normal Range";
        } else {
          category = "Overweight";
        }
        results.innerHTML = `<span>Your BMI is ${bmi} (${category})</span>`;

      } 
    });