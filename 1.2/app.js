
function run() {
    for (var i = 0; i < 10; i++) {
        var t = new Number(i);
        setTimeout(logWrite(t)
        , 1000);
    }
    function logWrite(t) {
        console.log(t);
    }
}
run();