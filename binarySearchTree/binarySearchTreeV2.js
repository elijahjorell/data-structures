const Tools = require('../tools');

function forLoop(n) {
    const arr = [];
    for (var i = 1; i < n + 1; i++) {
        arr.push[i];
    }
    return arr;
}

function fillArray(n) {
    return [...Array(n + 1).keys()].slice(1);
}

Tools.getRuntime(forLoop(10000));
Tools.getRuntime(fillArray(10000));
