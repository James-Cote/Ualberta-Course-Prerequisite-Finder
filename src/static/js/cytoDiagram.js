// Initialize Cytoscape
var cy = cytoscape({
    container: document.getElementById('cy'),  // The HTML element to hold the graph
  
    elements: [
      // List of nodes
      { data: {"id": "Enter a Course :D", "level": 0, "catalog":""} },
      { data: {"id": "WHAT", "level": 0, "catalog":""} },
      { data: {"source":"WHAT", "target":"Enter a Course :D"} }

      // { data: { source: 'node1', target: 'node2' } }
    ],
  
    style: [
      {
        selector: 'node',
        style: {
            'background-color': '#285D39',
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
            'line-color': '#DE2332',
            "curve-style": "round-taxi",
            "taxi-direction": "downward",
            "taxi-turn": 20,
            "taxi-turn-min-distance": 5,
            "taxi-radius": 10
        }
      }
    ],
  
    layout: {
        name: 'breadthfirst',
        directed: true,
        spacingFactor: 0.5
    },

    // Zooming Options
    zoomingEnabled: true, // Allow zooming
    minZoom: 0.8,         // Minimum zoom level
    maxZoom: 3,           // Maximum zoom level
    wheelSensitivity: 0.2, // Controls the zoom speed (higher value = faster zooming)
  });

cy.zoom({ level: 1.5 });
cy.center();