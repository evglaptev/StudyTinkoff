(function(){
var a = [1, 2, 3, 4, [3, 4], 5, 6, [7, 8], 9, 10];
var res = a.reduce(function (result, item) {
    return result.concat(item);
},[])
alert(res);
})();