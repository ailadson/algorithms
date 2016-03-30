"use strict";

class Heap {
  constructor (elements, comparator) {
    if(typeof comparator !== 'function') {
      comparator = function (a, b) {
        return a > b;
      }
    }

    this.store = [];
    this.comparator = comparator;
    this.offset = 0;
    this.constructHeap(elements);
  }

  constructHeap (elements) {
    elements.forEach((ele) => {
      this.push(ele);
    });
  }

  push (ele) {
    this.store.push(ele);
    this.heapifyUp(this.store.length - 1);
  }

  heapifyUp (idx) {
    if(idx === 0){ return; }

    var ele = this.store[idx];
    var parentIdx = this._parent(idx);
    var parent = this.store[parentIdx];

    if(this.comparator(ele, parent)){
      this.store[idx] = parent;
      this.store[parentIdx] = ele;
      this.heapifyUp(parentIdx);
    }
  }

  heapifyDown (idx) {
    var leftIdx = this._leftChild(idx);
    var rightIdx = this._rightChild(idx);

    var ele = this.store[idx];
    var left = this.store[leftIdx];
    var right = this.store[rightIdx];

    if(left && (!right || left > right) && this.comparator(left, ele)){
      this.store[idx] = left;
      this.store[leftIdx] = ele;
      this.heapifyDown(leftIdx);
    } else if(right && this.comparator(right, ele)){
      this.store[idx] = right;
      this.store[rightIdx] = ele;
      this.heapifyDown(rightIdx);
    }

  }

  getMax () {
    return this.store[0];
  }

  extractMax () {
    var max = this.store.shift();
    if(this.store.length){
      this.store.unshift(this.store.pop());
      this.heapifyDown(0);
    }
    return max;
  }

  _parent (i) {
    return Math.floor((i+1)/2) - 1;
  }

  _leftChild (i) {
    return ((i+1) * 2) - 1;
  }

  _rightChild (i) {
    return ((i+1) * 2);
  }
}

Heap.sort = function (elements, comparator) {
  var h = new Heap(elements, comparator);
  var max = h.extractMax();
  var sorted = [];

  while(max !== undefined){
    sorted.push(max);
    var max = h.extractMax();
    console.log(h.store);
  }

  return sorted;
}

var eles = [];

for (var i = 0; i <= 10; i++) {
  eles.push(i);
}
console.log(eles);

console.log(Heap.sort(eles));
