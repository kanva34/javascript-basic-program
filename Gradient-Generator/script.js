let btn1 = document.getElementById("mybtn1");
let btn2 = document.getElementById("mybtn2");
let copyDiv = document.querySelector(".copyCode")
let rgb1 = '#004773';
let rgb2 = '#54d542';


const hexValues = ()=>{
 let myHexaValues = "0123456789abcdef";
  let colors = "#"
  for (let i = 0; i < 6; i++) {
    colors += myHexaValues[Math.floor(Math.random()*16)]

  }
  return colors;
}

const hadleButton1 = () => {
 rgb1 = hexValues();
 console.log(rgb1)
 btn1.innerHTML = rgb1
 document.body.style.backgroundImage = `linear-gradient(to right , ${rgb1}, ${rgb2})`;
 copyDiv.innerHTML = ` background-image: linear-gradient(to right , ${rgb1} ${rgb2})`;

};

const hadleButton2 = () => {
  rgb2 = hexValues();
 console.log(rgb2)
  btn2.innerHTML = rgb2
  document.body.style.backgroundImage = `linear-gradient(to right , ${rgb1}, ${rgb2})`;
 copyDiv.innerHTML = ` background-image: linear-gradient(to right , ${rgb1} ${rgb2})`;
};

copyDiv.addEventListener("click",()=>{
    navigator.clipboard.writeText(copyDiv.innerText)
    alert("copied")
})

btn1.addEventListener("click", hadleButton1); 
btn2.addEventListener("click", hadleButton2);
