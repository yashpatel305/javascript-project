// =>Find Element in Array
// Write a JavaScript function to find an array containing a specific element.

let arr = [3, 5, 7, 5, 2, 7, 4];
let num = ("Enter a number to find it in the array");

if (arr.includes(num)) {
    console.log("The entered number is available in the array.");
} else {
    console.log("The entered number is not available in the array.");
}