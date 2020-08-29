/*

PROBLEM: 
    Given a set of cities and the time it takes to travel between each city, 
    find the quickest path which visits all cities and returns to the original city

*/

function addDirectedEdge(nodes, u, v, w) {
    if (!nodes[u]) {
        nodes[u] = {};
    }
    nodes[u][v] = w;
}

const Tools = require('../tools');
const nodes = {};

// set edges of directed graph 
Graphs.addDirectedEdge(nodes, 'a', 'b', 4);
Graphs.addDirectedEdge(nodes, 'a', 'c', 1);
Graphs.addDirectedEdge(nodes, 'a', 'd', 9);
Graphs.addDirectedEdge(nodes, 'b', 'a', 3);
Graphs.addDirectedEdge(nodes, 'b', 'c', 6);
Graphs.addDirectedEdge(nodes, 'b', 'd', 11);
Graphs.addDirectedEdge(nodes, 'c', 'a', 4);
Graphs.addDirectedEdge(nodes, 'c', 'b', 1);
Graphs.addDirectedEdge(nodes, 'c', 'd', 2);
Graphs.addDirectedEdge(nodes, 'd', 'a', 6);
Graphs.addDirectedEdge(nodes, 'd', 'b', 5);
Graphs.addDirectedEdge(nodes, 'd', 'c', -4);

const uniqueNodes = Object.keys(nodes);
var paths = Object.keys(nodes);
var pathTimes = {};

function getQuickestPath(nodes) {
    // get unique paths (return to starting node)
    for (var i = uniqueNodes.length - 1; i > 0; i--) {
        paths.map((path, pathIdx, pathsArr) => {
            pathsArr[pathIdx] = uniqueNodes.reduce((newPaths, uniqueNode) => {
                if (!path.includes(uniqueNode)) {
                    newPaths.push(path + uniqueNode);
                }
                return newPaths;
            }, []);
        });
        paths = [].concat(...paths);
    }
    paths.map((path, pathIdx, pathsArr) => {
        pathsArr[pathIdx] += path[0];
    });
    
    // get times of unique paths
    paths.map((path) => {
        pathTimes[path] = path.split('').reduce((data, v) => {
            if (!data.u) {
                data.u = v;
            } else {
                data.pathTime += nodes[data.u][v];
                data.u = v;
            }
            return data;
        }, {pathTime: 0, u: undefined}).pathTime;
    })
    
    // get quickest unique path
    var quickestPath = Object.entries(pathTimes).reduce((quickestPath, [path, time]) => {
        if (!quickestPath.quickestPath || time < quickestPath.time) {
            quickestPath.quickestPath = path;
            quickestPath.time = time; 
        }
        return quickestPath;
    }, {quickestPath: undefined, time: undefined});
    
    return quickestPath;
}

console.log(getQuickestPath(nodes));

Tools.getRuntime(getQuickestPath(nodes), true);
