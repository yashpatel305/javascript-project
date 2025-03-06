function swap(){
    let num1= document.getElementById("num1").value;
    let num2= document.getElementById("num2").value;
    let temp;
    temp=num1;
    num1=num2;
    num2=temp;

    let ans = document.getElementById("result");
    ans.innerHTML = "after swap, <br>First Number: " + num1 + "<br>Second Number: " + num2;
}
