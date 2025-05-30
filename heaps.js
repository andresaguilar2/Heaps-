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

extractMin() {
    if (this.size <= 0) return null;

    const popped = this.heap[0];
    this.heap[0] = this.heap[this.size - 1];
    this.size--;
    this.minHeapify(0);
    return popped;
  }

  minHeapify(i) {
    if (!this.isLeaf(i)) {
      const left = this.leftChildIndex(i);
      const right = this.rightChildIndex(i);

      let smallest = i;

      if (
        left < this.size &&
        this.heap[left].priority < this.heap[smallest].priority
      ) {
        smallest = left;
      }

      if (
        right < this.size &&
        this.heap[right].priority < this.heap[smallest].priority
      ) {
        smallest = right;
      }

      if (smallest !== i) {
        this.swap(i, smallest);
        this.minHeapify(smallest);
      }
    }
  }

  printHeapPretty() {
    for (let i = 0; i < Math.floor(this.size / 2); i++) {
      const left = this.leftChildIndex(i);
      const right = this.rightChildIndex(i);

      let output = `Parent: ${this.heap[i].name}(${this.heap[i].priority})`;
      if (left < this.size)
        output += ` Left: ${this.heap[left].name}(${this.heap[left].priority})`;
      if (right < this.size)
        output += ` Right: ${this.heap[right].name}(${this.heap[right].priority})`;
      console.log(output);
    }
  }

  printHeap() {
    console.log(this.heap.slice(0, this.size).map(task => `${task.name}(${task.priority})`));
  }
}
