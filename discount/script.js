function calculateDiscount(bill) {
    let discount = 0;

    if (bill >= 500) {
        discount = bill * 0.20;
    } else if (bill >= 200) {
        discount = bill * 0.10;
    } else if(bill < 200) {
        discount = 0; 
    }

    return bill - discount; 
}

// Loop for 3 customers
for (let i = 1; i <= 3; i++) {
    let bill = prompt(`Enter total bill for Customer ${i}:`);
    bill = Number(bill);

    if (isNaN(bill) || bill <= 0) {
        alert("Please enter a valid bill amount.");
       
    } else {
        let finalAmount = calculateDiscount(bill);
        alert(`Customer ${i} → Original Bill: ${bill}, Final Bill after Discount: ${finalAmount}`);
        
    }
    console.log(`Customer ${i} → Original Bill: ${bill}, Final Bill after Discount: ${finalAmount}`)
}
