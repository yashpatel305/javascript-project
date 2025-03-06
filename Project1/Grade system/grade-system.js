function calculate() {
    let math = Number(document.getElementById("math").value);
    let science =Number(document.getElementById("science").value);
    let english =Number(document.getElementById("english").value);
    let total = math + science + english;
    let all = document.getElementById("total");
    all.value = total;

    let percentage = (total / 300) * 100;
    let per = document.getElementById("percentage");
    per.value = percentage;

    let grade, result;

    if (percentage >= 90) {
        grade = "A";
        result = "Excellent";
    } else if (percentage >= 75) {
        grade = "B";
        result = "Good";
    } else if (percentage >= 60) {
        grade = "C";
        result = "Average";
    } else if (percentage >= 35) {
        grade = "D";
        result = "Needs Improvement";
    } else {
        grade = "F";
        result = "Fail";
    }

    document.getElementById("grade").value = grade;
    document.getElementById("result").value = result;
}


