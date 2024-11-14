//theme functions

let cur_theme = "base";

const themes = {
    "base": {
        "edge_colors": [
            "#DE2332",
            "#23DE32",
            "#3223DE",
            "#32DEDE",
            "#DE23DE",
            "#DEDE32"
        ],
        "levels": [
            "#285D39",
            "#396E4A",
            "#4A7F5B",
            "#5B8F6C",
            "#6C9F7D"
        ]
    },
    "pretty": {
        "edge_colors": [
            "#DE6776",
            "#9F2B68",
            "#DE3163",
            "#F88379",
            "#FF69B4",
            "#FFB6C1"
        ],
        "levels": [
            "#DD70A9",
            "#DE80B9",
            "#DF90C9",
            "#E1A0D9",
            "#E2B0E9"
        ]
    }
};

function changeTheme() {
    cur_theme = document.getElementById('theme').value;
    
    cy.batch(() => {
        cy.nodes().forEach(node => {
            node.style({
                'background-color': function (ele) {
                    const colorIndex = ele.data('level'); // Get the color index from edge data
                    return getNodeColor(colorIndex); // Call the function to get the color
                }
            });
        });

        cy.edges().forEach(edge => {
            edge.style({
                'line-color': function (ele) {
                    const colorIndex = ele.data('line_color'); // Get the color index from edge data
                    return getEdgeColor(colorIndex); // Call the function to get the color
                }
            });
        });
    });
}

function changeLevelView() {
    visible_levels = parseInt(document.getElementById('level-chooser').value);

    cy.batch(() => {
        cy.nodes().forEach(node => {
            if (node.data('level') <= visible_levels) {
                node.style({'display': 'element'});
            } else {
                node.style({'display': 'none'});
            }
        });
    });
}

function getEdgeColor(color) {
    console.log(color);
    color = color % 6;
    return themes[cur_theme]["edge_colors"][color];
}

function getNodeColor(level) {
    const levels = themes[cur_theme]["levels"];
    if (level >= levels.length) {
        level = levels.length - 1;
    }
    return levels[level];
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
            'background-color': function (ele) {
                const colorIndex = ele.data('level'); // Get the color index from edge data
                return getNodeColor(colorIndex); // Call the function to get the color
            },
            'font-family': 'Verdana',
            'label': 'data(id)',
            'shape': 'roundrectangle',
            'color': '#fff',
            'font-size': '12px',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': 100,
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