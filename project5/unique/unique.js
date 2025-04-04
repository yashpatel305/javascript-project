// => find unique element from array
let arr = [1,1,3,4,88,7,7,8]
let ans = []
for (let i = 0; i < arr.length; i++) {
    let c = 0;
    for (let j = 0; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
            c++;
        }
    }
    if (c === 1) {
        ans.push(arr[i]);
    }
}
console.log(ans);
