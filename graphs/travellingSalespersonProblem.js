/*

PROBLEM: 
    Given a set of cities and the time it takes to travel between each city, 
    find the quickest path which visits all cities and returns to the original city

*/

const nodes = {};

// set edges of directed graph 
function addEdge(nodes, u, v, w) {
    if (!nodes[u]) {
        nodes[u] = {};
    }
    nodes[u][v] = w;
}

addEdge(nodes, 'a', 'b', 4);
addEdge(nodes, 'a', 'c', 1);
addEdge(nodes, 'a', 'd', 9);
addEdge(nodes, 'b', 'a', 3);
addEdge(nodes, 'b', 'c', 6);
addEdge(nodes, 'b', 'd', 11);
addEdge(nodes, 'c', 'a', 4);
addEdge(nodes, 'c', 'b', 1);
addEdge(nodes, 'c', 'd', 2);
addEdge(nodes, 'd', 'a', 6);
addEdge(nodes, 'd', 'b', 5);
addEdge(nodes, 'd', 'c', -4);

const uniqueNodes = Object.keys(nodes);
var paths = Object.keys(nodes);
var pathTimes = {};

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
    pathTimes[path] = path.split('').reduce((data, v, vIdx) => {
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
    if (!quickestPath.path || time < quickestPath.time) {
        quickestPath.path = path;
        quickestPath.time = time; 
    }
    return quickestPath;
}, {path: undefined, time: undefined});

console.log(quickestPath);
