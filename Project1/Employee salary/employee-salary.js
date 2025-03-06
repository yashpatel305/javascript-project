function calculateSalary() {
   let month = Number(document.getElementById("month").value);
   let salary = Number(document.getElementById("salary").value);
   let bonus = Number(document.getElementById("bonus").value);
   let total = document.getElementById("total");

   total.value = salary * month + bonus;
}
