// Add Items to Array
// Write a JavaScript program to add items to a blank array and display them.
// Sample Screen :
// add elements in an blank array
// input box: __________
// add button
// display button

let arr = [];

let input = document.getElementById('input');
let display = document.getElementById('display');

let addition = () => {
    const item = input.value.trim(); 
    if (item) { 
        arr.push(item); 
        input.value = ''; 
    } else {
        alert('Please enter a valid item.'); 
    }
};

let show = () => {
    if (arr.length > 0) {
        display.innerText = arr.join(', '); 
    } else {
        display.innerText = 'The array is empty.'; 
    }
};
