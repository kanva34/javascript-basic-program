// Initial balance
let balance = 1000;
let correctPIN = "1234";
let attempts = 0;
let maxAttempts = 3;

let withdraw = (amount) => {
  if (amount <= balance) {
    balance -= amount;
    alert(`Withdrawal successful! Remaining balance: $${balance}`);
  } else {
    alert("Insufficient balance!");
  }
};

while (attempts < maxAttempts) {
  let pin = prompt("Enter your 4-digit PIN:");

  if (pin === correctPIN) {
    let amount = prompt("Enter withdrawal amount:");
    amount = Number(amount);

    if (!isNaN(amount) && amount > 0) {
      withdraw(amount);
    } else {
      alert("Invalid amount entered.");
    }
    break;
  } else {
    attempts++;
    alert(`Incorrect PIN. Attempts left: ${maxAttempts - attempts}`);
  }

  if (attempts === maxAttempts) {
    alert("Your card is blocked due to too many wrong attempts.");
  }
}
