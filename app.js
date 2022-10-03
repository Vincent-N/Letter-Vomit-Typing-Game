/* Created by Vincent Nguyen */
/* n.vincentq@gmail.com / vincentnguyen@utexas.edu */

// Settings
const TOTAL_CHARACTER = 310;
const MAX_CHARS_PER_WORD = 6;
const MIN_CHAR_PER_WORD = 3;

// const TOTAL_CHARACTER = 200;
// const MAX_CHARS_PER_WORD = 25;
// const MIN_CHAR_PER_WORD = 22;

var untypedWordsList = [];

/**
 * Waits for HTML elements to be loaded before generating random values
 */
document.addEventListener('DOMContentLoaded', function(event) {
    // HTML Objects
    var toType = document.getElementById("toType");
    var userInputTextArea = document.getElementById("typeInputText");
    var alreadyTyped = document.getElementById("alreadyTyped");
    var correctTyping = document.getElementById("correctTyping");
    var errorTyping = document.getElementById("errorTyping");

    toType.innerHTML = generateParagraph(TOTAL_CHARACTER, MAX_CHARS_PER_WORD, MIN_CHAR_PER_WORD);

    // Check whenever user types in input text box
    userInputTextArea.addEventListener('input', function(event) {
        let currInput = userInputTextArea.value;
        // Check if user typed correct word and update if so
        if (untypedWordsList != null && untypedWordsList.length != 0) {
            if (untypedWordsList[0] + " " === currInput) {
                // In this case, the user has finished a word
                alreadyTyped.innerHTML += untypedWordsList.shift() + " ";
                toType.innerHTML = untypedWordsList.join(" ");

                // Reset values
                userInputTextArea.value = "";
                correctTyping.innerHTML = "";
                errorTyping.innerHTML = "";
    
                // User finished, restart game
                if (untypedWordsList.length == 0) {
                    toType.innerHTML = generateParagraph(TOTAL_CHARACTER, MAX_CHARS_PER_WORD, MIN_CHAR_PER_WORD);
                    alreadyTyped.innerHTML = "";
                }
            } else {
                // User in progress of typing a word
                let correctLetters = "";
                let wrongLetters = "";
                let lettersWrong = false;
                let lastIndex = -1;
                
                // Get all correct and wrong letters
                for (let i = 0; i < currInput.length && i < untypedWordsList[0].length; i++) {
                    let currCharInput = currInput[i];
                    let currCharGenerated = (untypedWordsList[0])[i];
                    if (currCharInput === currCharGenerated && !lettersWrong) { 
                        correctLetters += currCharInput;
                    } else {
                        lettersWrong = true; // Counts all letters after first occurence of wrong letter as wrong
                        // wrongLetters += currChar; // This will display the letters that the user typed
                        wrongLetters += currCharGenerated; // This will display the letters the user didn't type
                    }
                    lastIndex = i;
                }
                
                // Coordinates displays between toType, correctTyping, and errorTyping
                let displayUntypedWordsList = untypedWordsList.slice();
                let restOfWord = (displayUntypedWordsList.shift()).substring(lastIndex + 1);
                displayUntypedWordsList.unshift(restOfWord);
                let displayUntypedWords = displayUntypedWordsList.join(" ");

                // Because using .join(" "), need to add space whenever the
                // user has enough input for the whole word
                if (lastIndex + 1 == (untypedWordsList[0]).length) {
                    displayUntypedWords = "&#8202" + displayUntypedWords
                }

                // Update HTML
                toType.innerHTML = displayUntypedWords;
                correctTyping.innerHTML = correctLetters;
                errorTyping.innerHTML = wrongLetters;
            }
        }
    });
});

/**
 * Generates a paragraph of words with random letters
 * @param {*} totalCharacters Total allowed characters in paragraph
 * @param {*} maxCharsPerWord Largest length a word can be
 * @param {*} minCharsPerWord Smallest length a word can be, maxCharsPerWords must be >= minCharsPerWord
 * @returns string of words with random letters
 */
function generateParagraph(totalCharacters, maxCharsPerWord, minCharsPerWord) {
    let wordLengthList = []; // list of the length of each word in order
    let numCharSoFar = 0;
    while (numCharSoFar <= totalCharacters - maxCharsPerWord) { // Stops slightly before totalCharacters to ensure we never infinitely loop (although this is very unlikely)
        let currNumChar = Math.floor(Math.random() * (maxCharsPerWord - minCharsPerWord + 1) + minCharsPerWord); // Numbers from minCharsPerWord to maxCharsPerWord
        wordLengthList.push(currNumChar);
        numCharSoFar += currNumChar + 1; // +1 for space
    }
    // Create all words
    untypedWordsList = wordLengthList.map(n => generateWord(n));
    // untypedWordsList = "bax rhdq quo naa kgps vgk paf oyq qexu yhh qtgu eat xxw jvno qnvc ifnc vpwfh tezd hyfxc qseeo zrgm".split(" "); // For testing
    let paragraph = untypedWordsList.join(" ");
    return paragraph;
}

// List of possible letters to type, currently experimenting with different lists
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var symbols = "{}[]:;\"',.!@#$%^&*()-=+";
var numbers = "1234567890";

function generateWord(numChars) {
    let listToUse = alphabet;
    let word = "";
    let letterList = [];
    for (let i = 0; i < numChars; i++) {
        letterList.push(listToUse.charAt(Math.floor(Math.random() * listToUse.length))); // Select random character from list
    }
    word = letterList.join("");
    return word;
}











/* Created by Vincent Nguyen */
/* n.vincentq@gmail.com / vincentnguyen@utexas.edu */

