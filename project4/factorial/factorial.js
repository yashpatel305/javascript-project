//Q : Write a program to find the factorial of a number using recursion.

// get the number from user
let num=Number(prompt("Enter a number to find its factorial"));
// initialize the fact variable to store the factorial of the number
let fact=1;
// define a function to find the factorial of a number
// using recursion
function factorial(n){
    if(n==0){
        return 1;
    }
    else{
        return n*factorial(n-1);
    }
}
// call the function 
alert(factorial(num));
