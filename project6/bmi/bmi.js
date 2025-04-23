
function  calculate () {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;

    height = parseFloat(height);
    weight = parseFloat(weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight!");
        return;
    }

    var heightInMeters = height / 100;


    var bmi = weight / (heightInMeters * heightInMeters);
    bmi=bmi.toFixed(2);

    var result = "";
    if (bmi < 18.5) {
        result = "Underweight";
    } else if (bmi < 25) {
        result = "Normal weight";
    } else if (bmi < 30) {
        result = "Overweight";
    } else {
        result = "overweight";
    }
let bmiValue=document.querySelector("#bmi");
let bmiResult=document.querySelector("#feedback");
bmiValue.innerHTML=bmi;
bmiResult.innerHTML=result;
}

