const performance = require('perf_hooks').performance;

module.exports = {
    getRuntime: function(fn) {
        const tries = 1000;
    
        var startTime;
        var finishTime;
        var times = [];
        
        for (var i = 0; i < tries; i++) {
            startTime = performance.now();
            fn;
            finishTime = performance.now();
            times.push(finishTime - startTime);
        }
    
        console.log(`Time elapsed: ${ times.reduce((acc, val) => acc + val) / tries } milliseconds`)
    }
}
