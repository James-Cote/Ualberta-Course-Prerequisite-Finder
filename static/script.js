
const body = document.querySelector("body");
body.setAttribute("style", "display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0px")

const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 2000px; height: 100px; background-color: #285D39; color: white; font-size: 48px; font-family: Verdana; display: flex; align-items: center; justify-content: center; margin-top: 0px")
banner.textContent = "4DG"

body.appendChild(banner);

const input = document.createElement("input")
input.setAttribute("style","margin:16px; height: 32px; width: 200px;")

body.appendChild(input)
