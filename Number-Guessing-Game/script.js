    // Generate a random number between 1 and 100
    let randomNumber = Math.floor(Math.random() * 100) + 1;

    // Set the number of guesses allowed
    let guessesLeft = 10;

    // Store previous guesses as a string
    let previousGuesses = "";

    // Get references to DOM elements
    const guessField = document.querySelector('.guessField');
    const guessSubmit = document.querySelector('.guessSubmit');
    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');

    // Function to check the user's guess
    function checkGuess(event) {
        event.preventDefault(); 

        let userGuess = guessField.value.trim(); 

        // Input validation: check if input is empty
        if (userGuess === "") {
            lowOrHi.textContent = "Please enter a value.";
            guessField.focus();
            return;
        }
        // Input validation: check if input is a valid number between 1 and 100
        if (isNaN(userGuess) || Number(userGuess) < 1 || Number(userGuess) > 100) {
            lowOrHi.textContent = "Please enter a number between 1 and 100. Negative numbers are not allowed.";
            guessField.value = "";
            guessField.focus();
            return;
        }

        userGuess = Number(userGuess); // Convert input to number

        // Add guess to previous guesses string
        if (previousGuesses !== "") {
            previousGuesses += ", ";
        }
        previousGuesses += userGuess;
        guesses.textContent = previousGuesses; // Display previous guesses

        guessesLeft--; // Decrement guesses left
        lastResult.textContent = guessesLeft; // Display guesses left

        // Check if guess is correct
        if (userGuess === randomNumber) {
            lowOrHi.textContent = "Congratulations! You guessed right!";
            guessField.disabled = true; // Disable input
            guessSubmit.disabled = true; // Disable submit button
        } else if (guessesLeft === 0) {
            // If no guesses left, game over
            lowOrHi.textContent = "Game Over! The number was " + randomNumber;
            guessField.disabled = true;
            guessSubmit.disabled = true;
        } else if (userGuess < randomNumber) {
            // Guess is too low
            lowOrHi.textContent = "Too low!";
        } else if (userGuess > randomNumber) {
            // Guess is too high
            lowOrHi.textContent = "Too high!";
        }

        guessField.value = ""; // Clear input field
        guessField.focus(); // Focus input field
    }

    // Add event listener to submit button
    guessSubmit.addEventListener('click', checkGuess);