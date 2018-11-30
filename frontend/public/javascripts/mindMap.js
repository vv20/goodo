var container = document.getElementById('visualisation');
var network = new vis.Network(container, {
    nodes: new vis.DataSet(data.nodes),
    edges: new vis.DataSet(data.edges)
}, options);
