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
            'text-wrap': 'wrap',
            'label': function (ele) {
                let label_text = ele.data('id'); // Get the main label (id)
                if (ele.data('catalog')) {
                    label_text += '\n\nView Catalog'; // Add space for catalog if catalog data exists
                }
                return label_text; // Return the combined label
            },
            'shape': 'roundrectangle',
            'color': '#fff',
            'font-size': '16px',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': 140,
            'height': 'label',
            'padding': '12px',
            "ghost": "yes",
            "ghost-opacity": 0.5,
            "ghost-offset-x": 1,
            "ghost-offset-y": 1,
            "corner-radius": 5
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
            "taxi-radius": 5,
            "ghost": "yes",
            "ghost-opacity": 0.2,
            "ghost-offset-x": 1,
            "ghost-offset-y": 1
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
    minZoom: 0.5,         // Minimum zoom level
    maxZoom: 3,           // Maximum zoom level
    wheelSensitivity: 0.2, // Controls the zoom speed (higher value = faster zooming)
  });

cy.zoom({ level: 1.3 });
cy.center();

// Click event to nodes to open a URL when clicked
cy.on('tap', 'node', function(event) {
    const node = event.target;
    const url = node.data('catalog');
    if (url) {
      window.open(url, '_blank'); // Open the link in a new tab
    }
  });

cy.on('mouseover', 'node', function(event) {
    const node = event.target;
    if (node.data('catalog')) {
        const bbox = node.boundingBox();  // Get the bounding box of the node
        
        // Get the mouse position relative to the graph container
        const mousePos = event.originalEvent;

        console.log(mousePos);

        // Check if the mouse is in the bottom half of the node
        const mouseY = mousePos.clientY; // Mouse Y position relative to the document
        const nodeBottom = bbox.y2; // Bottom Y position of the node
        const nodeTop = bbox.y1; // Top Y position of the node
        const nodeHeight = nodeBottom - nodeTop;

        // Determine if the mouse is hovering over the bottom part of the node (e.g., lower 50%)
        if (mouseY >= nodeBottom - nodeHeight / 2 && mouseY <= nodeBottom) {
            console.log('Mouse is over the bottom part of the node');
        }
    }
});