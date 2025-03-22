// Q = Write a program to reverse a number.

// get the number from user
let n=Number(prompt("Enter a number to reverse"));
let rev=0;
let rem;
// loop to reverse the number
while(n!=0){
    rem=n%10;
    rev=rev*10+rem;
    n=parseInt(n/10);
}
// display the reversed number
alert(rev);
