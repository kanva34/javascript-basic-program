//* This program asks the user to enter a starting and ending number, checks if the input is valid, and if the starting value is greater
//* than or equal to the ending value, it runs a reverse loop from start down to end; otherwise, it shows an alert message.

let startingnum = prompt('Enter starting number')
let endinggnum = prompt('Enter ending number')

 startingnum = Number(startingnum)
 endinggnum = Number(endinggnum)

if (isNaN(startingnum) || isNaN(endinggnum)) {
    alert("please enter valide number")

} else if (startingnum < endinggnum) {
    alert("Starting value must be greater than or equal to ending value!")
}else{
   for(let i = startingnum; i >= endinggnum; i--){
    console.log(i)
   }
}