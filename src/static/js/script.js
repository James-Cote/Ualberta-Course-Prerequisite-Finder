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

  
function sendData(course) {
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
    })
    .catch(error => console.error('Error:', error));

    changeGraph();
}

const body = document.querySelector("body");
body.setAttribute("style", "display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0px")

const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 100%; height: 100px; background-color: #285D39; color: white; font-size: 48px; font-family: Verdana; display: flex; align-items: center; justify-content: center; margin-top: 0px")
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



const footer = document.createElement("div")
footer.setAttribute("id", "footer")
footer.setAttribute("style", "width: 100%; height: 30px; background-color: #285D39; color: white; font-size: 16px; font-family: Verdana; position: absolute; bottom:0; left:0; display: flex; align-items: center; justify-content: center")

const aboutLink = document.createElement("a")
aboutLink.textContent = "about"
aboutLink.setAttribute("style", "cursor: pointer; color: white; text-decoration: none")
aboutLink.setAttribute("href", "../template/about.html")

footer.appendChild(aboutLink)
body.appendChild(footer)
