// You can specify options in the Diagram's second argument
// These options not only include Diagram properties, but sub-properties, too.
const myDiagram =
  new go.Diagram("myDiagramDiv",
    { // enable Ctrl-Z to undo and Ctrl-Y to redo
      "undoManager.isEnabled": true,
      allowCopy: false,
      allowDelete: false,
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
      levels: [
        "#285D39",
        "#396E4A",
        "#4A7F5B",
        "#5B8F6C",
        "#6C9F7D",
      ],
      stroke_lines: [
        "#DE2332",
        "#23DE32",
        "#3223DE",
        "#32DEDE",
        "#DE23DE",
        "#DEDE32"
      ],
      text: '#FFF',
      shadow: '#9ca3af',
      extra: " "
    }
  });

  // PRETTY
  myDiagram.themeManager.set('pretty', {
    colors: {
      background: '#DD70A9',
      levels: [
        "#DD70A9",
        "#DE80B9",
        "#DF90C9",
        "#E1A0D9",
        "#E2B0E9",
      ],
      stroke_lines: [
        "#DE6776",
        "#9F2B68",
        "#DE3163",
        "#F88379",
        "#FF69B4",
        "#FFB6C1"
      ],
      text: '#fff',
      shadow: '#111827',
      extra: "<3"
    }
  });

function findLevelColor(node) {
  if (node.data.level > 4) {
    return 4;
  }
  return node.data.level;
}

function findStrokeColor(link) {
  return link.data.line_color % 6;
}

// Visible Node Changer
var visible_levels = 100;
function findVisibleLevel(node) {
  console.log(visible_levels);
  if (node.level > visible_levels) {
    return false;
  }
  return true;
}

myDiagram.nodeTemplate =
    new go.Node("Horizontal",
    // the entire node will have a light-blue background
    {
      isShadowed: true,
      shadowOffset: new go.Point(0, 2)
    })
  .bind("visible", "", findVisibleLevel)
  .add(
    new go.Panel(go.Panel.Auto, {
      name: 'BODY',
      width: 150,
      dragSelect: null
    })
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
        }).themeObject('fill', '', 'levels', findLevelColor),

        new go.TextBlock("Default Text",  // the initial value for TextBlock.text 
            // some room around the text, a larger font, and a white stroke:
            { margin: 12, font: "16px sans-serif", textAlign: "center" })
        // TextBlock.text is data bound to the "name" property of the model data
        .bind("text", "key")
        .theme("stroke", "text")
    ).theme('shadowColor', 'shadow'),

    new go.TextBlock("Default Text",  // the initial value for TextBlock.text
      // some room around the text, a larger font, and a white stroke:
      { bold: true, font: "16px sans-serif", textAlign: "left", })
    // TextBlock.text is data bound to the "name" property of the model data
    .theme("text", "extra")
    .theme("stroke", "background")
  );

myDiagram.nodeTemplate.selectionAdornmentTemplate = new go.Adornment('Spot')
  .add(
    new go.Panel('Auto')
      .add(
        new go.Shape('RoundedRectangle', { fill: null, strokeWidth: 2 })
        .theme("stroke", "background"),
        new go.Placeholder() // a Placeholder sizes itself to the selected Node
      )
    );

myDiagram.linkTemplate =
  new go.Link(
      // default routing is go.Routing.Normal
      // default corner is 0
      {
        isShadowed: true,
        shadowBlur: 2.5,
        shadowOffset: new go.Point(0.5, 0.5),

        routing: go.Routing.AvoidsNodes,
        corner: 5 })
        .themeObject('shadowColor', '', 'stroke_lines', findStrokeColor)
    .add(
      // the link path, a Shape
      new go.Shape({ strokeWidth: 3 })
      .themeObject('stroke', '', 'stroke_lines', findStrokeColor)
      // if we wanted an arrowhead we would also add another Shape with toArrow defined:
      //new go.Shape({  toArrow: "Standard", stroke: null  })
    );

// Change theme when button is pressed
function changeTheme() {
  if (myDiagram) {
    myDiagram.themeManager.currentTheme = document.getElementById('theme').value;
  }
}

// Change the level you see
function changeLevelView() {
  visible_levels = parseInt(document.getElementById('level-chooser').value);
  myDiagram.updateAllTargetBindings();
  // loadingGraph();
  // refreshDiagram();
}

myDiagram.model = new go.GraphLinksModel([{"key":"Enter a Course :D", "level":0}],[]);