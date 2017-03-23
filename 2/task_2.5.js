
"use strict";
(function () {
    var result = 0;

    function sum(x) {
        if (x === undefined) {
            return this;//result;
        }
        this.x += x;
        //result += x;
        return sum.bind(this);
    }




    alert(sum(1)(2)(3)());
})();
