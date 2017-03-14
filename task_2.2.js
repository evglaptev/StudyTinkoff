(function () {
    var a = [-3, 5, 6, 0, 1];
    var b = [2, 5, -3, 10, 22, 7, 1];

    var c = [];
    var d = [];
    var k = 0; //counter for d[]
    for (var i = 0; i < a.length; i++) {
        c[a[i]] = 1;
    }


    for (var i = 0; i < b.length; i++) {
        if (c[b[i]] !== undefined) {
            d[k] = b[i];
            k++;
        }
    }

    alert(d);
})();