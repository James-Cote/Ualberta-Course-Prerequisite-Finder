// You can specify options in the Diagram's second argument
// These options not only include Diagram properties, but sub-properties, too.
const myDiagram =
  new go.Diagram("myDiagramDiv",
    { // enable Ctrl-Z to undo and Ctrl-Y to redo
      "undoManager.isEnabled": true,
      layout: new go.TreeLayout({
        treeStyle: go.TreeStyle.LastParents,
        arrangement: go.TreeArrangement.Horizontal,
        // properties for most of the tree:
        angle: 90,
        layerSpacing: 35,
        // properties for the "last parents":
        alternateAngle: 90,
        alternateLayerSpacing: 35,
        alternateAlignment: go.TreeAlignment.Bus,
        alternateNodeSpacing: 20
      })
    });

myDiagram.nodeTemplate =
    new go.Node("Horizontal",
    // the entire node will have a light-blue background
    { background: "#33CC33" })
  .add(
    new go.Panel(go.Panel.Auto, { name: 'BODY', width: 150})
    .add(
        new go.TextBlock("Default Text",  // the initial value for TextBlock.text
            // some room around the text, a larger font, and a white stroke:
            { margin: 12, stroke: "white", font: "16px sans-serif", textAlign: "center" })
        // TextBlock.text is data bound to the "name" property of the model data
        .bind("text", "key"),
        )
    );

myDiagram.linkTemplate =
  new go.Link(
      // default routing is go.Routing.Normal
      // default corner is 0
      { routing: go.Routing.Orthogonal, corner: 5 })
    .add(
      // the link path, a Shape
      new go.Shape({ strokeWidth: 3 })
      .bind("stroke", "color"),
      // if we wanted an arrowhead we would also add another Shape with toArrow defined:
      //new go.Shape({  toArrow: "Standard", stroke: null  })
    );

// // Fetch JSON data and apply it to the model
// fetch("diagramData.json")
//   .then(response => response.json())
//   .then(data => {
//     myDiagram.model = new go.GraphLinksModel(data.nodeDataArray, data.linkDataArray);
//   })
//   .catch(error => console.error("Error loading JSON data:", error));

fetch('../static/js/JSON/diagramData.json')
  .then(response => response.json())
  .then(data => {
    console.log(data),
    myDiagram.model = new go.GraphLinksModel(
      data[0], data[1]
    );
  })
  .catch(error => console.error('Error loading file:', error));


// myDiagram.model = new go.GraphLinksModel(
//   [ // the nodeDataArray
//     { key: "CMPUT 201"},
//     { key: "CMPUT 175"}, 
//     { key: "MATH 144"},
//     { key: "CMPUT 179"}
//   ],
//   [ // the linkDataArray
//     { from: "CMPUT 201", to: "CMPUT 175", color: "#005533" },
//     { from: "CMPUT 201", to: "CMPUT 179", color: "#005555" },
//     { from: "CMPUT 179", to: "MATH 144", color: "#550000" },
//     { from: "CMPUT 175", to: "MATH 144", color: "#000055" }
//   ]);