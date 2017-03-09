function Run() {
    var firstWord = prompt("Input first word: ");
    var secondWord = prompt("Input second word: ");
    function anagramTest(firstStr, secondStr) {
        var isAnagram = false;

        if (firstStr.length == secondStr.length) {
            var array1 = firstStr.split();
            array1.sort();
            var array2 = secondStr.split();
            array1 == array2;
            isAnagram = true;
        }
        printResult(isAnagram);
    }
    function printResult(isAnagram) {
        if (isAnagram) {
            alert("Words are anagrams.");
        }
        else {
            alert("Words aren`t anagrams.");
        }
    }
    anagramTest(firstWord, secondWord);
}
Run();

