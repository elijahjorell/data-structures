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
            } else {
                this.search(value, (currentValue, direction, continuing) => {
                    if (!continuing) {
                        this.tree[currentValue][direction] = value;
                    }
                });
            }
        }
    }
    initalise(array) {
        if (array) {
            if (Array.isArray(array) && array.length > 0) {
                var sorted = [].concat(array).sort((a, b) => a - b);
                
            } else {
                throw new TypeError('input must be an non-empty array');
            }
        } 
    }
    path(value) {
        const path = [];
        this.search(value, (currentValue, direction, continuing) => {
            path.push({ value: currentValue, direction: direction });
        });
        return path;
    }
    search(searchValue, callbackfn) {
        var currentValue = this.rootValue;

        while (currentValue !== searchValue) {
            if (searchValue < currentValue) {
                if (this.tree[currentValue].left) {
                    callbackfn(currentValue, 'left', true);
                    currentValue = this.tree[currentValue].left;
                } else {
                    callbackfn(currentValue, 'left', false);
                    return false;
                }
            } else {
                if (this.tree[currentValue].right) {
                    callbackfn(currentValue, 'right', true);
                    currentValue = this.tree[currentValue].right;
                } else {
                    callbackfn(currentValue, 'right', false);
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
    }
}

function getMedianIndex(array) {
    return Math.ceil(array.length/2 - 1);
}

function getTree(array) {
    const queues = [];
    var currentQueue = [];
    var indices = [[... new Set(array).keys()]];

    while (indices.length > 0) {
        indices.map((val, idx, arr) => {
            const median = getMedianIndex(val);
            currentQueue.push(arr[idx].splice(median, 1)[0]);
            arr[idx] = splitArray(arr[idx], median);
        });
        indices = [].concat(...indices);
    
        queues.push(currentQueue);
        currentQueue = [];
    }

    console.log(queues);
}

function splitArray(array, index) {
    if (array.length < 3) {
        return array.map((val) => [val]);
    } else {
        return [array.slice(0, index), array.slice(index, array.length)];
    }
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

getTree(data);