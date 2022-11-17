var arr = [2, 8, 4, 10, 6];
var sArr = [],len=arr.length;
// var newarr = arr.sort((a, b) => {
//   return a - b;
// });

//  Sort Array
function sortArray(arr, len) {
  var temp, j;
  for (var i = 0; i < len; i++) {
    temp = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

// set New array  in an alternate order such that max value is followed by min value in a descending fashion
sortArray(arr, arr.length);
for (var n = 0; n < len; n++) {
  if (n % 2 == 0) sArr[n] = arr.pop();
   if (n % 2 != 0) sArr[n] = arr.shift();
}
console.log(sArr);
