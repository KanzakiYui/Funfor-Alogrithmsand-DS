///////////////////////////////////////////////////////////////////////////////////////
/// Conception
/// 1.  Priority Queue
///     a data structure for maintaining a set S of elements, each with an associated
///     value called a key
/// 2.  Max Priority Queue
///     A max-heap S which supports the following operations
///     function insert(newValue)
///     ------ inserts a new element x with key = newValue into the set S
///     function maximum()
///     ------ returns the element of S with the largest key.
///     function extractMax()
///     ------ removes and returns the element of S with the largest key.
///     function increaseKey(i, newValue)
///     ------ increases the value of element S[i]'s key to the newValue, and is assumed
///     ------ to be at least as large as x’s current key value
///     [Note]  Build a max priority queue is the same as build a max heap, here we just
///             make our PriorityQueue inherits from Heap.
/// 3.  Min Priority Queue
///     Similarly, S supports insert(), minimum(), extractMin(), decreaseKey()

import Heap, { HeapNode } from './heap-sort';

class PriorityQueue extends Heap {

    constructor(array: Array<number>){
        // use Heap constrcutor to build this.heapNodes
        super(array);
    }

    /*
        Build max priority queue = build max heap, while max priority queue
        supports more methods.
        Time complexity: O(nlgn)
    */
    public buildMaxPriorityQueue(){
        this.buildHeap();
    }

    /*
        Since it's technically a max-heap, the max one is always the 1st one (root).
        Time complexity: O(1)
    */
    public maximum():HeapNode{
        return this.heapNodes[0];
    }

    /*
        It's not hard to find out that, the implementation of 'extract maximum one from
        max-heap and maintain the remaining heap still as a max-heap' is just extactly
        each iteration of heap sort algorithm. (We can see the code are almost identical)
        Time complexity: O(lgn)
    */
    public extractMaximum():HeapNode{
        if(!this.heapSize)
            return null;
        const max = this.heapNodes[0];
        this.swap(this.heapNodes[this.heapSize-1], this.heapNodes[0])
        this.heapSize--;
        this.heapify(0);
        return max;
    }

    /*
        It's called increaseKey, therefore, newValue should be larger than current one,
        or meaningless. Once update the value, we can easily figure out there is a chance
        that the new heap is no longer a max-heap, therefore, we need to maintain it!
        1.  When we increase value at index i, we can easily find out that subtree/subheap
            rooted at i is still a max-heap.
        2.  Therefore, we only need to maintain bottom-to-top, which means from index i to
            it's parent node (e.g. new value larger than parent value), and upforward.
        Time complexity: O(lgn)      (obviously, consider the tree height)
    */
    public increaseKey(i:number, newValue:number){
        const currentValue = this.heapNodes[i].value;
        if(newValue < currentValue)
            throw new Error('new key is smaller than current key');
        this.heapNodes[i].value = newValue;
        let currentIndex = i;
        while(currentIndex > 0){
            const parentNode = this.heapNodes[currentIndex].parent;
            const currentNode = this.heapNodes[currentIndex];
            if(parentNode.value >= currentNode.value)
                break;
            this.swap(parentNode, currentNode);
            currentIndex = parentNode.index;
        }
    }

    /*
        Here insert only means 'array.push', which mean push at bottom, then we have
        the following things to do:
        1. initialize the new tail node with -∞ (this is in order to not break max-heap).
        2. append it at the end of current heap.
        3. connect with it's parent (and of course, it has no child since it's leaf)
        4. increase it's value from -∞ to given new value.
        Time complexity: O(lgn)
    */
    public insert(newValue){
        // Increase heap size since we add a new node at end.
        this.heapSize++;
        // Add a new node in the heap with -∞ in order not to break max-heap.
        const currentIndex = this.heapSize - 1;
        this.heapNodes[currentIndex] = new HeapNode(Number.MIN_SAFE_INTEGER, currentIndex);
        // Link it to its parent node, if itself is root, it will has no parent node.
        const currentNode = this.heapNodes[currentIndex];
        currentNode.parent = currentIndex
            ? this.heapNodes[Math.floor((currentIndex-1)/2)]
            : null;
        // It's leaf therefore no child
        currentNode.left = null;
        currentNode.right = null;
        this.increaseKey(currentIndex, newValue)
    }
}

export default PriorityQueue;