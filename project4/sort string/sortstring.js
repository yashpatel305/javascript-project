 // Q :Sort String Alphabetically 

 //get the string from the user
let str=prompt("Enter a string to sort alphabetically : ");
//split the string into an array of characters
let arr=str.split("");
//sort the array
arr.sort();
let res="";
//loop for the array and meage it to the result string
for(let i=0;i<arr.length;i++){
    res+=arr[i];
}
//display the result
alert(res);
