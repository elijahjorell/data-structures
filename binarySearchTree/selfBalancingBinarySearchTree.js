const Tools = require('../tools');

class BinarySearchTree {
    constructor(array) {
        this.empty = true;
        this.rootValue = undefined;
        this.tree = {};
        this.initalise(array);
    }
    add(value) {
        if (this.validate(value)) {
            this.tree[value] = new Node(value);
            if (this.empty) {
                this.empty = false;
                this.rootValue = value;
                this.tree[value].depth = 0;
            } else {
                this.traverse(value, (currentValue, direction, continuing, currentDepth) => {
                    if (!continuing) {
                        this.tree[currentValue][direction] = value;
                        this.tree[value].depth = currentDepth;
                    }
                });
            }
        }
    }
    contains(value) {
        var currentValue = this.rootValue;

        while (currentValue !== value) {
            if (value < currentValue) {
                if (this.tree[currentValue].left) {
                    currentValue = this.tree[currentValue].left;
                } else {
                    return false;
                }
            } else {
                if (this.tree[currentValue].right) {
                    currentValue = this.tree[currentValue].right;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
    initalise(array) {
        if (array) {
            if (Array.isArray(array) && array.length > 0) {
                const depths = [];
                var currentDepth = [];
                var indices = [[... new Set(array).keys()]];

                while (indices.length > 0) {
                    indices.map((val, idx, arr) => {
                        const median = getMedianIndex(val);
                        currentDepth.push(arr[idx].splice(median, 1)[0]);
                        arr[idx] = splitArray(arr[idx], median);
                    });
                    indices = [].concat(...indices);
                
                    depths.push(currentDepth);
                    currentDepth = [];
                }

                depths.map((queue) => {
                    queue.map((idx) => this.add(idx));
                })
                
            } else {
                throw new TypeError('input must be an non-empty array');
            }
        } 
    }
    path(value) {
        const path = [];
        this.traverse(value, (currentValue, direction, continuing) => {
            path.push({ value: currentValue, direction: direction });
        });
        return path;
    }
    traverse(searchValue, callbackfn) {
        var currentValue = this.rootValue;
        var currentDepth = 0;

        while (currentValue !== searchValue) {
            currentDepth++;
            if (searchValue < currentValue) {
                if (this.tree[currentValue].left) {
                    if (callbackfn) callbackfn(currentValue, 'left', true, currentDepth);
                    currentValue = this.tree[currentValue].left;
                } else {
                    if (callbackfn) callbackfn(currentValue, 'left', false, currentDepth);
                    return false;
                }
            } else {
                if (this.tree[currentValue].right) {
                    if (callbackfn) callbackfn(currentValue, 'right', true, currentDepth);
                    currentValue = this.tree[currentValue].right;
                } else {
                    if (callbackfn) callbackfn(currentValue, 'right', false, currentDepth);
                    return false;
                }
            }
        }
        return true;
    }
    validate(value) {
        return typeof value === 'number' && !this.tree[value];
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.left = undefined;
        this.right = undefined;
        this.depth = undefined;
    }
}

function getMedianIndex(array) {
    return Math.ceil(array.length/2 - 1);
}

function splitArray(array, index) {
    if (array.length < 3) {
        return array.map((val) => [val]);
    } else {
        return [array.slice(0, index), array.slice(index, array.length)];
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const dataRows = 100000;
const data = [...Array(dataRows).keys()];
const dataTree = new BinarySearchTree(data);
const searchNumber = Math.random(0, dataRows);

Tools.getRuntime(data.includes(searchNumber));
Tools.getRuntime(dataTree.contains(searchNumber));

