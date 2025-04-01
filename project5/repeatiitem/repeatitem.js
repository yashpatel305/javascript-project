// Most Frequent Array Item

// Write a JavaScript program to find the most frequent item in an array.

// Sample array : var arr1=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];

// Sample Output : a ( 5 times )
let arr1 = [3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
let count = 0;
let item;
arr1.forEach((i) => {
    let c = 0;
    arr1.forEach((j) => {
        if (i === j) {
            c++;
        }
    });
    if (c > count) {
        count = c;
        item = i;
    }
});
console.log(`${item} ( ${count} times )`);