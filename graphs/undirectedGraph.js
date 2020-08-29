class UndirectedGraph {
    constructor() {
        this.nodeCount = 0;
        this.nodes = {};
    }
    addEdge(u, v, w) {
        if (!this.nodes[u]) this.nodes[u] = {};
        if (!this.nodes[v]) this.nodes[v] = {};

        this.nodes[u][v] = w;
        this.nodes[v][u] = w;

        this.updateNodeCount();
    }
    addNode(u) {
        if (!this.nodes[u]) this.nodes[u] = {};

        this.updateNodeCount();
    }
    searchDepthFirst(startingNode, callbackFn) {
        if (!this.nodes[startingNode]) throw new ReferenceError('starting node not found');
        
        const searcher = {
            currentNode: undefined,
            pathStack: [],
            searchedNodes: {},
            validMoves: []
        };

        startingNode = typeof startingNode === 'string' ? startingNode : String(startingNode);
        searcher.currentNode = startingNode;
        
        while (true) {
            // add current node to path stack and mark it as searched
            searcher.pathStack.push(searcher.currentNode);
            searcher.searchedNodes[searcher.currentNode] = true;

            // check surrounding nodes for nodes that havent not yet been searched
            searcher.validMoves = Object.keys(this.nodes[searcher.currentNode]).filter((node) => !searcher.searchedNodes[node]);
            
            // backtrack if no valid moves and end search if backtrack to starting node with no more valid moves
            while (searcher.validMoves.length === 0) {
                if (searcher.currentNode === startingNode) return;
                searcher.pathStack.pop();
                searcher.currentNode = searcher.pathStack[searcher.pathStack.length - 1];
                searcher.validMoves = Object.keys(this.nodes[searcher.currentNode]).filter((node) => !searcher.searchedNodes[node]);
            }
            
            // run callbackFn if present
            if (callbackFn) callbackFn(searcher, this);

            // move to next node
            searcher.currentNode = searcher.validMoves[0];
        }
    }
    updateNodeCount() {
        this.nodeCount = Object.keys(this.nodes).length;
    }
}

const myGraph = new UndirectedGraph();

myGraph.addEdge(0, 1, 0);
myGraph.addEdge(0, 9, 0);
myGraph.addEdge(1, 8, 0);
myGraph.addEdge(9, 8, 0);
myGraph.addEdge(8, 7, 0);
myGraph.addEdge(7, 3, 0);
myGraph.addEdge(3, 4, 0);
myGraph.addEdge(3, 5, 0);
myGraph.addEdge(3, 2, 0);
myGraph.addEdge(5, 6, 0);
myGraph.addEdge(6, 7, 0);
myGraph.addEdge(7, 11, 0);
myGraph.addEdge(11, 10, 0);
myGraph.addNode(12);

console.log(myGraph);

myGraph.searchDepthFirst(0, (searcher, graph) => {
    
})