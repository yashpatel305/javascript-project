//Q : check whether a number is palindrome or not.
// get the number from user
let n=Number(prompt("Enter a number to check whether it is palindrome or not"));
let rev=0;
let temp=n;
let rem;
// loop to reverse the number
while(n!=0){
    rem=n%10;
    rev=rev*10+rem;
    n=parseInt(n/10);
}
// check whether the number is palindrome or not
if(temp==rev){
    alert("The number is palindrome");
}else{
    alert("The number is not palindrome");
}