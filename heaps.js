class MinHeap {
  constructor(maxSize) {
    this.heap = new Array(maxSize);
    this.size = 0;
    this.maxSize = maxSize;
  }

  parentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  leftChildIndex(i) {
    return 2 * i + 1;
  }

  rightChildIndex(i) {
    return 2 * i + 2;
  }

  isLeaf(i) {
    return this.leftChildIndex(i) >= this.size;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(task) {
    if (this.size >= this.maxSize) {
      console.warn("Heap is full");
      return;
    }

    this.heap[this.size] = task;
    let current = this.size;

    while (
      current > 0 &&
      this.heap[current].priority < this.heap[this.parentIndex(current)].priority
    ) {
      this.swap(current, this.parentIndex(current));
      current = this.parentIndex(current);
    }

    this.size++;
  }

  