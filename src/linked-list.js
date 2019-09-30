const Node = require("./node");

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this._head) {
      this._head = newNode;
    } else {
      newNode.prev = this._tail;
      this._tail.next = newNode;
    }

    this._tail = newNode;
    this.length++;

    return this;
  }

  head() {
    return this._head ? this._head.data : null;
  }

  tail() {
    return this._tail ? this._tail.data : null;
  }

  at(index) {
    if (index >= this.length || index < 0) return this;

    let currentNode = this.traverseToIndex(index);
    return currentNode.data;
  }

  insertAt(index, data) {
    if (index >= this.length || index < 0) return this;

    let newNode = new Node(data);
    let currentNode = this.traverseToIndex(index);

    newNode.prev = currentNode.prev;
    newNode.next = currentNode;
    currentNode.prev.next = newNode;
    currentNode.prev = newNode;
    this.length++;

    return this;
  }

  isEmpty() {
    return !this.length;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;

    return this;
  }

  deleteAt(index) {
    if (index >= this.length || index < 0) return this;

    let currentNode = this.traverseToIndex(index);
    if (currentNode.prev) currentNode.prev.next = currentNode.next;
    if (currentNode.next) currentNode.next.prev = currentNode.prev;
    this.length--;

    return this;
  }

  reverse() {
    let temp = null;
    let currentNode = this._head;

    while (currentNode) {
      temp = currentNode.prev;
      currentNode.prev = currentNode.next;
      currentNode.next = temp;
      currentNode = currentNode.prev;
    }

    this._tail = this._head;
    if (temp) this._head = temp.prev;

    return this;
  }

  indexOf(data) {
    if (!this.length) return -1;

    let index = 0;
    let currentNode = this._head;

    while (index < this.length) {
      if (currentNode.data === data) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }

    return -1;
  }

  traverseToIndex(index) {
    let counter = 0;
    let currentNode = this._head;

    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }

    return currentNode;
  }
}

module.exports = LinkedList;
