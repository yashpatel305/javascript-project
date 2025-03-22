//Q : find length of string without using length inbuilt method

//get the string from the user
let str=prompt("Enter a string to find length of it : ");

//initialize a variable to store the length of the string
let count=0;

//loop for the string and increment the count variable
//for each character in the string
for(let i in str){
    count++;
}
//display the length of the string
alert(count);