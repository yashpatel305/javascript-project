// Q : write a program to generate fibonacci series.
// get the number from user
let no=Number(prompt("Enter a number: "));
// initialize the first two numbers of the series
let a=0;
let b=1;
let c;
console.log(a);
console.log(b);
// loop for the series to generate the next number
while(no>2){
    c=a+b;
    console.log(c);
    a=b;
    b=c;
    no--;
}
