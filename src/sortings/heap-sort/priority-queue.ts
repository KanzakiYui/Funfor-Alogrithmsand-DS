///////////////////////////////////////////////////////////////////////////////////////
/// Conception
/// 1.  Priority Queue
///     a data structure for maintaining a set S of elements, each with an associated
///     value called a key
/// 2.  Max Priority Queue S supports the following operations
///     function insert(newValue)
///     ------ inserts a new element x with key = newValue into the set S
///     function maximum()
///     ------ returns the element of S with the largest key.
///     function extractMax()
///     ------ removes and returns the element of S with the largest key.
///     function increaseKey(i, newValue)
///     ------ increases the value of element S[i]'s key to the newValue, and is assumed
///     ------ to be at least as large as x’s current key value
/// 3.  Min Priority Queue S supports insert(), minimum(), extractMin(), decreaseKey()

import Heap, { HeapNode } from './heap-sort';

class PriorityQueue extends Heap {

    constructor(array: Array<number>){
        super(array);
    }

    // Time complexity: O(1) + O(lgn) = O(lgn)
    private insert(newValue){
        // increase heap size since we add a new one.
        this.heapSize++;
        // now add a new node in the heap and setup all necessary info.
        const currentIndex = this.heapSize - 1;
        this.heapNodes[currentIndex] = new HeapNode(Number.MIN_SAFE_INTEGER, currentIndex);
        // It's leaf, then only has parent, no children
        // check if the new added one is root or not
        const currentNode = this.heapNodes[currentIndex];
        if(!currentIndex){
            currentNode.parent = null;
        }
        else{
            const parentIndex = Math.floor((currentIndex-1)/2);
            currentNode.parent = this.heapNodes[parentIndex];
        }
        currentNode.left = null;
        currentNode.right = null;
        this.increaseKey(currentIndex, newValue)
    }

    // Time complexity: O(1)
    private maximum():HeapNode{
        return this.heapNodes[0];
    }

    // Time complexity: O(1) + O(lgn) = O(lgn)
    private extractMaximum():HeapNode{
        if(!this.heapSize)
            return null;
        const max = this.heapNodes[0];
        // note the following three steps are also executed when we do
        // heap sort (see this.heapSort)
        this.swap(this.heapNodes[this.heapSize-1], this.heapNodes[0])
        this.heapSize--;
        this.heapify(0);
        return max;
    }

    // Time complexity: O(1) + O(lgn) = O(lgn)      <= tree height
    // TODO: verify this and add comments
    private increaseKey(i:number, newValue:number){
        const currentValue = this.heapNodes[i].value;
        if(newValue < currentValue)
            throw new Error('new key is smaller than current key');
        this.heapNodes[i].value = newValue;
        let currentIndex = i;
        while(currentIndex > 0){
            const parentNode = this.heapNodes[currentIndex].parent;
            const currentNode = this.heapNodes[currentValue];
            if(parentNode.value >= currentNode.value)
                break;
            this.swap(parentNode, currentNode);
            currentIndex = parentNode.index;
        }
    }
}

export default PriorityQueue;