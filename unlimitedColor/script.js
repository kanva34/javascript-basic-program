const randomColor = function () {
  const hex = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
};
let intervalid;
const strartChangingColor = function () {
  if (!intervalid) {
    intervalid = setInterval(changeBgColor, 1000);
  }
  function changeBgColor() {
    document.body.style.backgroundColor = randomColor();
  }
};
const stopChangingColor = function () {
  clearInterval(intervalid);
  intervalid = null;
};

document.getElementById("start").addEventListener("click", strartChangingColor);

document.getElementById("stop").addEventListener("click", stopChangingColor);
