

    var result = 0;

    function sum(x) {
        if (x === undefined) {
            return result;
        }
        result += x;
        return sum;
    }




alert(sum(1)(2)(3)())