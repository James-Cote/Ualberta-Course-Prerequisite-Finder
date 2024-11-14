//theme functions

edge_colors = [
    "#DE2332",
    "#23DE32",
    "#3223DE",
    "#32DEDE",
    "#DE23DE",
    "#DEDE32"
]

function getEdgeColor(color) {
    console.log(color);
    color = color % 6;
    return edge_colors[color];
}

// Initialize Cytoscape
var cy = cytoscape({
    container: document.getElementById('cy'),  // The HTML element to hold the graph
  
    elements: [
      // List of nodes
      { data: {"id": "Enter a Course :D", "level": 0, "catalog":""} }

      // { data: { source: 'node1', target: 'node2' } }
    ],
  
    style: [
      {
        selector: 'node',
        style: {
            'background-color': '#285D39',
            'font-family': 'Verdana',
            'label': 'data(id)',
            'shape': 'roundrectangle',
            'color': '#fff',
            'font-size': '12px',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': 'label',
            'height': 'label',
            'padding': '10px',
            "ghost": "yes",
            "ghost-opacity": 0.5,
            "ghost-offset-x": 1,
            "ghost-offset-y": 1
        }
      },
      {
        selector: 'edge',
        style: {
            'width': 3,
            'line-color': function (ele) {
                const colorIndex = ele.data('line_color'); // Get the color index from edge data
                return getEdgeColor(colorIndex); // Call the function to get the color
            },
            "curve-style": "round-taxi",
            "taxi-direction": "downward",
            "taxi-turn": 20,
            "taxi-radius": 5
        }
      }
    ],
  
    layout: {
        name: 'breadthfirst',
        directed: true,
        spacingFactor: 0.7,
        avoidOverlap: true,
        grid: false
    },

    // Zooming Options
    zoomingEnabled: true, // Allow zooming
    minZoom: 0.8,         // Minimum zoom level
    maxZoom: 3,           // Maximum zoom level
    wheelSensitivity: 0.2, // Controls the zoom speed (higher value = faster zooming)
  });

cy.zoom({ level: 1.5 });
cy.center();

// Click event to nodes to open a URL when clicked
cy.on('tap', 'node', function(event) {
    var node = event.target;
    var url = node.data('catalog');
    if (url) {
      window.open(url, '_blank'); // Open the link in a new tab
    }
  });