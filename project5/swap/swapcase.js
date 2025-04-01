// Swap Case in String

// Write a JavaScript program that accepts a string as input and swaps the case of each character. For example if you input 
// 'The Quick Brown Fox' the output should be 'tHE qUICK bROWN fOX'.
let swapCase = (str) => {
    let swapped = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase()) {
            swapped += str[i].toLowerCase();
        } else {
            swapped += str[i].toUpperCase();
        }
    }
    return swapped;
}
console.log(swapCase('The Quick Brown Fox'));