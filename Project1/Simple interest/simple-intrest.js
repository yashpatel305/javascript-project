
function calculate(){
    let principal=document.getElementById("principal")
    let rate=document.getElementById("rate")
    let time=document.getElementById("time")
    let ans=document.getElementById("ans")
    let j=Number(principal.value)*Number(rate.value)*Number(time.value)/100;
   if(principal.value<"0" || rate.value<"0" || time.value<"0"){
       alert("Please enter positive values")
   }else{
     ans.innerText=`after ${time.value} years, the simple interest will be ${j} and the total amount will be ${Number(principal.value)+j}`
   }
}