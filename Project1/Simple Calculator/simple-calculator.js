let no1=document.getElementById("num1")
let no2=document.getElementById("num2")
let ans=document.getElementById("ans")
function addition(){
    let j=Number(no1.value)+Number(no2.value);
    console.log(j);
    ans.value=j
}
function subtraction(){
    let j=Number(no1.value)-Number(no2.value);
    console.log(j);
    ans.value=j
}
function multiplication(){
    let j=Number(no1.value)*Number(no2.value);
    console.log(j);
    ans.value=j
}
function division(){
    let j=Number(no1.value)/Number(no2.value);
    console.log(j);
    ans.value=j
}
function modulus(){
    let j=Number(no1.value)%Number(no2.value);
    console.log(j);
    ans.value=j
}
function clearAll(){
    no1.value="";
    no2.value="";
    ans.value="";
}
