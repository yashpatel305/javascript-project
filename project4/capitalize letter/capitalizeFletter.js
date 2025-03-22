// Q :Capitalize First Letter of Each Word in a String

//get the string from the user
let str=prompt("Enter a string: ");
//split the string into an array of words
let arr=str.split(" ");
//declare an empty string to store the result
let res="";
//loop through the array and capitalize the first letter of each word
//and concatenate it to the result string
for(let i=0;i<arr.length;i++){
    res+=arr[i].charAt(0).toUpperCase()+arr[i].slice(1)+" ";
}
//display the result
alert(res);
