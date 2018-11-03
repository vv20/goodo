var container = document.getElementById('visualisation');
var network = new vis.Network(container, {nodes: new vis.DataSet(data)}, options);
