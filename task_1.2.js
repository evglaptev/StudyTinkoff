function run() {
    for (var i = 0; i < 10; i++) {
        (function () {
            var t = i;
            setTimeout(function () {
                console.log(t);
            }, 1000);
        })();

    }

}
run();