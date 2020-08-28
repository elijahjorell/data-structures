const performance = require('perf_hooks').performance;

module.exports = {
    getRuntime: function(fn, printResults) {
        const tries = 1000000;
        var startTime;
        var finishTime;
        var times = [];
        var averageTime;
        
        for (var i = 0; i < tries; i++) {
            startTime = performance.now();
            fn;
            finishTime = performance.now();
            times.push(finishTime - startTime);
        }
        
        averageTime = times.reduce((acc, val) => acc + val) / tries;

        if (printResults) {
            console.log(`Average runtime over ${tries} times: ${averageTime} milliseconds`);
        }

        return averageTime;
    }
}
