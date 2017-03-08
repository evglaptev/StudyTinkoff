function Run() {
    var firstWord = prompt("Input first word: ");
    var secondWord = prompt("Input second word: ");
    function anagramTest(firstStr, secondStr) {
        var isAnagram = true;

        if (firstStr.length == secondStr.length) {
            while (firstStr.length > 0) {
                var search = secondStr.indexOf(firstStr[0]);
                if (search == -1) {
                    isAnagram = false;
                    break;
                }
                else {
                    firstStr = firstStr.substr(1); // New string without first char.
                    secondStr = secondStr.substring(0, search) + secondStr.substr(search + 1); // New string without search char.
                }
            }
        }
        else {
            isAnagram = false;
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

