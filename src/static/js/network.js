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
      }),
      "themeManager.changesDivBackground": true,
      "themeManager.currentTheme": document.getElementById('theme').value
    });
  

  // Creates themes
  myDiagram.themeManager.set('base', {
    colors: {
      background: '#285D39',
      text: '#FFF',
      shadow: '#9ca3af',
      outline: "#000000"
    }
  });

  // PRETTY
  myDiagram.themeManager.set('pretty', {
    colors: {
      background: '#DD70A9',
      text: '#fff',
      shadow: '#111827',
    }
  });

myDiagram.nodeTemplate =
    new go.Node("Horizontal",
    // the entire node will have a light-blue background
    {
      isShadowed: true,
      shadowOffset: new go.Point(0, 2)
    })
  .add(
    new go.Panel(go.Panel.Auto, { name: 'BODY', width: 150, dragSelect: null})
    .add(
        // define the node's outer shape
        new go.Shape('RoundedRectangle', {
          name: 'SHAPE',
          strokeWidth: 0,
          fill: '#285D39',  
          portId: '',
          spot1: go.Spot.TopLeft,
          spot2: go.Spot.BottomRight,
          outline: "#000000"
        }).theme('fill', 'background'),
        new go.TextBlock("Default Text",  // the initial value for TextBlock.text 
            // some room around the text, a larger font, and a white stroke:
            { margin: 12, font: "16px sans-serif", textAlign: "center" })
        // TextBlock.text is data bound to the "name" property of the model data
        .bind("text", "key")
        .theme("stroke", "text"),
        new go.TextBlock("Default Text",  // the initial value for TextBlock.text
          // some room around the text, a larger font, and a white stroke:
          { margin: 12, font: "16px sans-serif", textAlign: "center" })
        // TextBlock.text is data bound to the "name" property of the model data
        .bind("text", "key")
        .theme("stroke", "text")
        )
    ).theme('shadowColor', 'shadow');

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

// Change theme when button is pressed
function changeTheme() {
  const myDiagram = go.Diagram.fromDiv('myDiagramDiv');
  if (myDiagram) {
    myDiagram.themeManager.currentTheme = document.getElementById('theme').value;
  }
}

export function changeGraph() {
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

// function loadingGraph() {
//   const myDiagram = go.Diagram.fromDiv('myDiagramDiv');
//   myDiagram.model = new go.GraphLinksModel(
// }

fetch('../static/js/JSON/diagramData.json')
  .then(response => response.json())
  .then(data => {
    console.log(data),
    myDiagram.model = new go.GraphLinksModel(
      data[0], data[1]
    );
  })
  .catch(error => console.error('Error loading file:', error));
