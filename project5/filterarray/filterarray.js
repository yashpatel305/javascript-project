// =>Filter Array Values
// Write a JavaScript function to filter false, null, 0 and blank values from an array.
// [5,"x",100,0,null,true]

// Test Data :

// console.log(filter_array_values([58, '', 'abcd', true, null, false, 0]));
// [58, "abcd", true]

let arr = [58,'', 'abcd', true, null, false, 0];
let filteredArr = arr.filter(Boolean);
console.log(filteredArr);
for(x of filteredArr){
    console.log(x);
}