function profitLoss(){
    let costPrice = document.getElementById("costPrice").value;
    let sellingPrice = document.getElementById("sellingPrice").value;
    let profit = sellingPrice - costPrice;
    let loss = costPrice - sellingPrice;
    let result = document.getElementById("result");
    if(profit > 0){
        result.innerHTML = "Profit is " + profit;
    } else if(loss > 0){
        result.innerHTML = "Loss is " + loss;
    } else{
        result.innerHTML = "No Profit No Loss";
    }
}