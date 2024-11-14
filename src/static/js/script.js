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

function easeIntoGraph() {
  cy.layout({
      name: 'breadthfirst',
      directed: true,
      spacingFactor: 0.8,
      avoidOverlap: true,
      grid: false,
      animate: false
  }).run();

  // Adjust node positions after the layout for custom vertical spacing
  cy.batch(() => {
    cy.nodes().forEach(node => {
      const position = node.position();
      // Shift nodes slightly upward to reduce vertical spacing
      node.position({
        x: position.x,
        y: position.y * 0.8  // Decrease to bring nodes closer vertically
      });
    });
  });

  cy.zoom({ level: 1.5 });
  cy.center();
  cy.panBy({x:0, y: cy.height() / 4});

  // Step 3: Animate pan and zoom back to center for the upward effect
  cy.animate({
    panBy: { x: 0, y: -cy.height() / 4 }  // Center the graph
  }, {
    duration: 400,
    easing: 'cubic-bezier(.35,.08,.08,1)'
  });
}

function changeGraph() {
    const myDiagram = go.Diagram.fromDiv('myDiagramDiv');
    fetch('../static/js/JSON/diagramData.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Free diagram bby
      let node_data = data[0];
      let edge_data = data[1];

      cy.elements().remove();

      let all_elements = [];
      for (let i = 0; i < node_data.length; i++) {
        all_elements.push({"data": node_data[i]});
      }

      for (let i = 0; i < edge_data.length; i++) {
        all_elements.push({"data": edge_data[i]});
        // console.log(edge_data[i]);
      }

      console.log(all_elements);
    
      cy.add(all_elements);

      easeIntoGraph();
    })
    .catch(error => console.error('Error loading file:', error));
}

function loadingGraph() {
    cy.elements().remove();
    cy.add([
      {data: {"id": "Loading", "level": 0, "catalog": ""}},
      {data: {"id": "dot.", "level": 1, "catalog": ""}},
      {data: {"id": "dot..", "level": 2, "catalog": ""}},
      {data: {"id": "dot...", "level": 3, "catalog": ""}},
      {data: {"source":"Loading", "target":"dot."}},
      {data: {"source":"dot.", "target":"dot.."}},
      {data: {"source":"dot..", "target":"dot..."}}
    ])

    easeIntoGraph();
}

function sendData(course) {
    console.log("Loading: " + course);
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


///
/// Banner
///
const banner = document.createElement("div");
banner.setAttribute("class", "banner main-header")

banner.textContent = "Course Prerequisite Finder"
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
button.setAttribute("style", "width: 64px; height: 32px; color: white")
button.setAttribute("class", "box-div theme-color")
button.setAttribute("id", "submit")
button.addEventListener("click", function(){
    course = document.getElementById("userInput").value
    console.log(course)

    sendData(course)
})
button.textContent = "Submit"


const secondRowAll = document.createElement("div")
secondRowAll.setAttribute("style", "position: relative; width: 100%")

const secondRow = document.createElement("div")
secondRow.setAttribute("style", "display: flex; justify-content: center; align-items: center")

const legend = document.createElement("div")
legend.setAttribute("class", "theme-color legend")

const tip1 = document.createElement("p")
tip1.textContent = "Tip: You can click on the node to view the catalog and drag to move them."
const tip2 = document.createElement("p")
tip2.textContent = "Tip: Classes connected with the same colour line are equivalent; you can do either one."
legend.appendChild(tip1)
legend.appendChild(tip2)

secondRowAll.appendChild(legend)
secondRow.appendChild(userInput)
secondRow.appendChild(button)
secondRowAll.appendChild(secondRow)

body.appendChild(secondRowAll)


//body.appendChild(legend)
//inputs.appendChild(userInput)
//inputs.appendChild(button)
//body.appendChild(inputs)

//theme build
theme_colors = {
  "base":"#285D39",
  "pretty":"#DD70A9"
}

//make variable theme
function changeMainTheme() {
  banner.style.backgroundColor = theme_colors[document.getElementById('theme').value];

  // box-div elements
  const elements = document.querySelectorAll(".theme-color");

  elements.forEach(element => {
      element.style.backgroundColor = theme_colors[document.getElementById('theme').value];;
  });
}


////////////////////////////////////////////////
// FOOTER     //////////////////////////////////
////////////////////////////////////////////////

const footer = document.createElement("div")
footer.setAttribute("id", "footer")
footer.setAttribute("style", "padding: 16px; margin: 16px; width: 100%; background-color: #285D39; color: white; font-size: 16px; font-family: Verdana; display: flex; flex-direction: column; align-items: center; justify-content: center;")
footer.setAttribute("class", "box-div theme-color")

// Information
const about = document.createElement("div")
about.setAttribute("style", "display: flex; flex-direction: column; align-items: center")

const aboutTitle = document.createElement("h1")
aboutTitle.setAttribute("class", "main-header")
aboutTitle.setAttribute("style", "font-size: 36px")
aboutTitle.textContent = "About"
about.appendChild(aboutTitle);

const aboutInformation = document.createElement("p")
aboutInformation.setAttribute("style", "color: white; font-family: Verdana; width: 40%; text-align: center; line-height: 2")
aboutInformation.setAttribute("class", "basic-link")
aboutInformation.innerHTML = `
This project <strong>WON</strong> the <a href="https://hackedbeta2024.devpost.com" target="_blank">HackED Beta</a> 24-hour hackathon hosted by the Computer Engineering Club of the University of Alberta.
The inspiration was to create a clean looking flow diagram that displayed course requirements to save time when deciding which courses to take.
The project files can be viewed on <a href="https://github.com/ConnorMcDonalds97/Ualberta-Course-Prerequisite-Finder/tree/main" target="_blank">Github</a>,
and the project portfolio can be viewed on <a href="https://devpost.com/software/ualberta-course-prereq-helper?ref_content=my-projects-tab&ref_feature=my_projects" target="_blank">DevPost</a>.
Have fun looking at the monstrous courses or take some time
to look into some of the courses you are interested in to see how to achieve your desired schedule. (Note that UofA catalog sometimes makes prerequisites general
and without any specific courses so make sure to click on View Catalog to verify the courses you will need) :D
`
about.appendChild(aboutInformation)

footer.appendChild(about);

// Plug

const plugMessage = document.createElement("div")
plugMessage.setAttribute("style", "margin-top: 40px; color: white; font-family: Verdana; text-decoration: underline")
plugMessage.textContent = "Check out our github profiles by clicking our names below!"
footer.appendChild(plugMessage)

// MEMBER LIST
const members = document.createElement("div");
members.setAttribute("style", "width: 100%; margin-bottom: 20px; display:flex; gap: 30px; justify-content:center; align-items: center");

// Member data array
const memberData = [
  { name: "Ben Bui", url: "https://github.com/maggiSauce" },
  { name: "Olivia Cai", url: "https://github.com/olivecai" },
  { name: "Kevin Cao", url: "https://github.com/ConnorMcDonalds97" },
  { name: "James Cote", url: "https://github.com/James-Cote" },
  { name: "Vinson Lou", url: "https://github.com/Enagarii" }
];

// Loop through member data and create elements
memberData.forEach(member => {
  const anchor = document.createElement("a");
  anchor.setAttribute("class", "github-link");
  anchor.setAttribute("href", member.url);
  anchor.setAttribute("style", "cursor: pointer;");
  anchor.setAttribute("target", "_blank");
  anchor.setAttribute("rel", "noopener noreferrer");
  anchor.textContent = member.name;

  members.appendChild(anchor);
});

// Append the member list to the document
document.body.appendChild(members);

footer.appendChild(members)
body.appendChild(footer)