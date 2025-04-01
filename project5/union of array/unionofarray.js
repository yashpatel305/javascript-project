// Union of Two Arrays
// Write a JavaScript program to compute the union of two arrays.
// and display array in sorting order
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [4, 5, 9, 3, 7, 8];
let union = [];
arr1.forEach((item) => {
    union.push(item);
});
arr2.forEach((item) => {
    let c = 0;
    union.forEach((i) => {
        if (item === i) {
            c++;
        }
    });
    if (c === 0) {
        union.push(item);
    }
});
console.log(union.sort());
