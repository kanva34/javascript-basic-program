document.querySelector("form").addEventListener("submit",(event)=>{
event.preventDefault();
let messageDiv = document.getElementById("message")
let text = document.getElementById("word-counter").value
const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
messageDiv.textContent = `Word count: ${wordCount}`
})