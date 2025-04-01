// =>Remove Duplicates
// Write a JavaScript program to remove duplicate items from an array (ignore case sensitivity).
let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
let unique = [];
arr.forEach((item) => {
   c=0;
    unique.forEach((i)=>{
         if(item===i){
              c++;
         }
    });
    if(c===0){
         unique.push(item);
    }
});
console.log(unique);