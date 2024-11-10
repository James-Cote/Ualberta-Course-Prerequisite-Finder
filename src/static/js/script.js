let course = ""

function encodeJSONData(course)
{
    // JSON Encode the data
    data = {name: course}

    console.log(data)

    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            data
        })
        .catch(error => console.error('Error:', error));
}

function changeGraph() {
    const myDiagram = go.Diagram.fromDiv('myDiagramDiv');
    fetch('../static/js/JSON/diagramData.json')
    .then(response => response.json())
    .then(data => {
      console.log(data),
      myDiagram.model = new go.GraphLinksModel(
        data[0], data[1]
      );
    })
    .catch(error => console.error('Error loading file:', error));
  }

function loadingGraph() {
  const myDiagram = go.Diagram.fromDiv('myDiagramDiv');
  myDiagram.model = new go.GraphLinksModel([{key:"Loading", level:0},{key:"dot.", level:1},{key:"dot..", level:2},{key:"dot...", level:3}], [{from:"Loading", to:"dot."}, {from:"dot.", to:"dot.."}, {from:"dot..", to:"dot..."}]);
}


function sendData(course) {
    console.log(course);
    loadingGraph();
    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: course })  // Send the message as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.reply);
        changeGraph();
    })
    .catch(error => console.error('Error:', error));

    
}

const body = document.querySelector("body");
body.setAttribute("style", "display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0px")

const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 100%; height: 100px; background-color: #285D39; box-shadow: 3px 3px 3px #CCCCCC; color: white; font-size: 48px; font-family: Verdana; display: flex; align-items: center; justify-content: center; margin-top: 0px")

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

        sendData(course)
    }
  });

const button = document.createElement("button")
//button.setAttribute("style", "width: 64px; height: 32px; background-color: #285D39; color: white")
button.setAttribute("class", "box-div")
button.addEventListener("click", function(){
    course = document.getElementById("userInput").value
    console.log(course)

    sendData(course)
})
button.textContent = "Submit"

inputs.appendChild(userInput)
inputs.appendChild(button)
body.appendChild(inputs)

//theme build
theme_colors = {
  "base":"#285D39",
  "pretty":"#DD70A9"
}

//make variable theme
function changeMainTheme() {
  banner.style.backgroundColor = theme_colors[document.getElementById('theme').value];

  // box-div elements
  const elements = document.querySelectorAll(".box-div");

  elements.forEach(element => {
      element.style.backgroundColor = theme_colors[document.getElementById('theme').value];;
  });
}


const footer = document.createElement("div")
footer.setAttribute("id", "footer")
footer.setAttribute("style", "width: 100%; height: 30px; background-color: #285D39; color: white; font-size: 16px; font-family: Verdana; display: flex; align-items: center; justify-content: center")

const members = document.createElement("div")
members.textContent = "Ben Bui, Olivia Cai, Kevin Cao, James Cotey, Vinson Lou"
members.setAttribute("style", "cursor: pointer; color: white;")

footer.appendChild(members)
body.appendChild(footer)
