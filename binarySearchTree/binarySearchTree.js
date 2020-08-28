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

function getHalvesAtMedian(array) {
    
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const dataTree = new BinarySearchTree(data);
