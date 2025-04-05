let num=Number(prompt("Enter a number to find the sum of its digits"));
let rem;
let sum=0;
while(num!=0){
    rem=num%10;
    sum=sum+rem;
    num=parseInt(num/10);
}
alert(sum);
console.log(sum);