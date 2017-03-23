"use strict";
(function () {
    var user = {
        uname : "Vasya",
        greet: function () {
            return this.uname + ' say Hello';
        }
    };

    function Bind(context,greet) {

        return function () {return greet.call(context) };


    }
    var admin = {
        uname:"Admin"
    };

    var greet = Bind(user,user.greet);

    alert(greet());
    alert(greet(admin));

})();