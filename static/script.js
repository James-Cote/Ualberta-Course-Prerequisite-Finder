let course = ""

const body = document.querySelector("body");
body.setAttribute("style", "display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0px")

const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 2000px; height: 100px; background-color: #285D39; color: white; font-size: 48px; font-family: Verdana; display: flex; align-items: center; justify-content: center; margin-top: 0px")
banner.textContent = "Course Prequisite Finder"

body.appendChild(banner);

const inputs = document.createElement("div")
inputs.setAttribute("style", "display: flex; align-items: center")

const userInput = document.createElement("input")
userInput.setAttribute("style","margin:16px; height: 32px; width: 200px;")
userInput.setAttribute("id", "userInput")
userInput.setAttribute("type","text")
userInput.setAttribute("placeholder", "Example: 'CMPUT 101'")
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        course = document.getElementById("userInput").value
        console.log(course)
    }
  });


const button = document.createElement("button")
button.setAttribute("style", "width: 64px; height: 32px; background-color: #285D39; color: white")
button.addEventListener("click", function(){
    course = document.getElementById("userInput").value
    console.log(course)
})
button.textContent = "Submit"



inputs.appendChild(userInput)
inputs.appendChild(button)

body.appendChild(inputs)
