function Run() {
    var firstWord = prompt("Input first word: ");
    var secondWord = prompt("Input second word: ");
    function anagramTest(firstStr, secondStr) {
        var isAnagram = false;

        if (firstStr.length == secondStr.length) {
            isAnagram = firstStr.toLowerCase().split('').sort().join('') == secondStr.toLowerCase().split('').sort().join('');
        }
        printResult(isAnagram);
    }
    function printResult(isAnagram) {
        isAnagram ? alert("Words are anagrams.") : alert("Words aren`t anagrams.");
    }

    anagramTest(firstWord, secondWord);
}
Run();

