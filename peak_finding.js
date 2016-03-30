"use strict";


class PeakFinder {
  find(type, arr){
    switch (type) {
      case '1d_n':
        return this._find_1d_n(arr);
        break;
      case '1d_logn':
        return this._find_1d_logn(arr);
        break;
      case '2d_n':
        return this._find_2d_n(arr);
        break;
      case '2d_logn':
        return this._find_1d_logn(arr);
        break;
    }
    throw "Bad Type";
  }

  _find_1d_n (arr) {
    for (var i = 0; i < arr.length; i++) {
      var maybePeak = arr[i];

      if((i === 0 || maybePeak >= arr[i - 1]) &&
         (i === arr.length - 1 || maybePeak >= arr[i + 1])){
           return { idx : i, val : arr[i] };
      }
    }
  }

  _find_1d_logn (arr) {
    var idx = Math.floor(arr.length/2);

    if(arr[idx - 1] && arr[idx] < arr[idx - 1]) {
      return this._find_1d_logn(arr.slice(0, idx));
    } else if (arr[idx + 1] && arr[idx] < arr[idx + 1]) {
      var val = this._find_1d_logn(arr.slice(idx + 1));

      if(val){
        idx = idx + val.idx + 1;
      }
    }

    return { idx : idx, val: arr[idx] };
  }
}

var pf = new PeakFinder();

var arr = [];
for (var i = 49000000; i >= 0 ; i--) {
  arr.push(i)
}

console.log("starting n");
console.log(pf.find('1d_n', arr));
console.log("starting logn");
console.log(pf.find('1d_logn', arr));
