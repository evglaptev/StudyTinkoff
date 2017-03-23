(function () {

    function getDigit(num) {
        var ost = "" + num % 2;
        var t = Math.floor(num / 2);
        if (t !== 0) {
            return getDigit(t) + ost;
        }
        return ost;
    }
    var a = prompt("Enter number: ");
    alert(getDigit(a));
})();