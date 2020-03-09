///////////////////////////////////////////////////////////////////////////////////////
/// Conception
/// 1.  (Binary) Heap
///     Can be presented as a (complete) binary tree
/// 2.  Max(Min)-Heap
///     For any subtree X (excluding non-trival tree), the root denotes as X,
///     and X's left child is L, and X's right child is R, then:
///     X is the largest(smallest) one among X, L, R.
/// 3.  The height of a node in heap
///     The number of edges on the longest simple downward path from the node
///     to a leaf. For example, the leaf has height of 0, the parent of leaf
///     has height of 1.
/// 4.  The height of a heap
///     = the height of root = O(lgn) if heap has size = n.

///////////////////////////////////////////////////////////////////////////////////////
/// Algorithm Ideas
/// 1.  For a given array A, suppose we already have a max-heap to regardless
///     how we get it, then how could we sort? Since a max-heap always imply
///     the root of A is largest one (obviously), so we switch A[0] with last
///     one A[n-1] (which also must be a leaf), and remove last one which is
///     the largest, and we denote B as the result position:
///     B[n-1] = A[n-1] then adjust the heap to make it still a max-heap, then
///     do again - switch A[0] with A[n-2] (since what we already obtained will
///     not in the heap anymore, for example, like here said, removal from heap)
///     B[n-2] = A[n-1], then adjust heap, ...
///     Recursivly do it untial switch A[0] and A[1], done! B is the sorted array
///     and obviously it's in non-descending order.
///
/// 2.  Now it turns to a problem - how could we make A as a max-heap?
///     Since max-heap means root of ANY subtree is largest one among it and children,
///     it's turns to an other question:
///     If we can make any possible subtree that root is the largest, then the whole
///     tree is max-heap! <= Obviously!
///     Now the question is, given any subarray's root (by index, suppose A[i]), how
///     could we make sure A[i] is largest one among it and children? Simple! Compare
///     and switch!


///////////////////////////////////////////////////////////////////////////////////////
/// Notice
/// The following implmenetation looks complex is due to we want to fully present how
/// the Heap and Node of Heap looks like regarding data structure. However, of course
/// we can simply adopt the key idea and write less and concise code, but it's not the
/// purpose of this file :)
///
/// PLEASE LOOK INTO ANOTHER FILE (heapsort/index.ts) TO SEE PURE ALGORITHM

///////////////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// Always O(nlgn)
/// Reason: Since the recursive heapify() when rooted at any given index i is at most
/// O(lgn), and the build max-heap iterates at most O(n/2), so it takes at most O(nlgn),
/// while actually it can be bounded by O(n) (skip proof), and finally runs O(n) time
/// to call heapify, therefore the whole heapsort() costs:
/// O(n) + O(n)O(lgn) = O(nlgn)

///////////////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// Always O(1)
/// Reason:
/// 1. in-place
/// 2. no extra auxiliary data structure
/// 3. no recursion call stack (only for and while loop)

export class HeapNode {
    public value: number;
    // We switch value to present switch node, so index in array shouldn't be changed.
    public readonly index: number;
    // We can find 'parent' is hardly used actually, here is for descriptive purpose.  
    public parent: HeapNode;            
    public left: HeapNode;
    public right: HeapNode;

    constructor(value: number, index: number){
        this.value = value;
        this.index = index;
    }
    
}

class Heap {
    // Just like regular array, we present heap by using an array of heap nodes,
    // when draw the tree, we iterate this array from 0 to n-1, and draw tree from
    // left to right, top to bottom direction.
    protected heapNodes: Array<HeapNode>;
    // heapSize is used to determine A[0, 1, ..., size-1] is in heap range, while
    // [size, size+1, ..., n-1] is already switched and sorted part
    protected heapSize: number;

    // If we just talke about heap sort algorithm, then all stuffs inside the constructor
    // is off topic, but again, it's for better illustration.
    constructor (array: Array<number>){
        const len = array.length;
        // Initialize the array A
        this.heapNodes = new Array();
        for(let i = 0; i < len; i++){
            this.heapNodes[i] = new HeapNode(array[i], i);
        }
        /*
            1.  Only root (i=0) of A has no parent
            2.  If any node is at index i, then left child index = 2i+1, right child
                index is 2i+2 (can draw a tree to verify)
            3.  use leftIndex & rightIndex < n - 1 to check if child exists or not.
        */
        for(let i = 0; i< len; i++){
            this.heapNodes[i].parent = i ? this.heapNodes[Math.floor((i-1)/2)] : null;
            const leftIndex = 2*i + 1;
            const rightIndex = 2*i + 2;
            this.heapNodes[i].left = leftIndex < len ? this.heapNodes[leftIndex] : null;
            this.heapNodes[i].right = rightIndex < len ? this.heapNodes[rightIndex] : null;
        }
        // Initially, heapSize is the n - 1, which means cover the whole tree.
        this.heapSize = len;
    }

    // As said above, when switch node we only switch value, we treat node as position
    // However, a more completed way to present heap & heap node, may be changing parent,
    // left, right as well => but we will realize it's not easy to print the heap out.
    protected swap(node1: HeapNode, node2: HeapNode){
        const tempValue = node1.value;
        node1.value = node2.value;
        node2.value = tempValue;
    }

    // As long as we are given the index, we can find a subtree rooted at A[i]
    protected heapify(index: number){
        while(true){
            // Get current node's info
            let currentNode = this.heapNodes[index];
            let currentValue = currentNode.value;
            // Get left node's info
            let leftNode = this.heapNodes[index].left;
            let leftValue = leftNode?.value;
            let leftIndex = leftNode?.index;
            // Get right node's info
            let rightNode = this.heapNodes[index].right;
            let rightValue = rightNode?.value;
            let rightIndex = rightNode?.index;

            // Determine which is largest one in current scope (this.heapSize)
            let largestIndex = index;
            let largestNode = currentNode;
            if(leftIndex < this.heapSize && leftValue > currentValue){
                largestIndex = leftIndex;
                largestNode = leftNode;
            }                
            if(rightIndex < this.heapSize && rightValue > largestNode.value){
                largestIndex = rightIndex;
                largestNode = rightNode;
            }           
            if(largestIndex !== index){
                this.swap(largestNode, currentNode);
                // top-to-bottom to check iteratively
                index = largestIndex;
            }
            else
                break;
        }
    }

    protected buildHeap(){
        /*
            Actually we can heapify from the very end till root, however, it does
            lots of unnecessary work, since all leaves shouldn't need be heapified
            since the subtrees rooted at leave are non-trival tree (size = 1)
            The first leave has index of Math.floor(this.heapSize/2) <= draw to verify
        */
        const startIndex = Math.floor(this.heapSize/2) - 1;
        for(let i = startIndex; i >=0 ; i --)
            this.heapify(i);
    }

    /*
        Build max-heap and do what we initial said in Algorithm Ideas, here we use
        this.heapSize-- to represent that we remove the swapped and current largest
        one from heap scope.
    */
    public heapSort(){
        this.buildHeap();
        const lastIndex = this.heapNodes.length - 1;
        for(let i = lastIndex; i >= 1; i--){
            this.swap(this.heapNodes[i], this.heapNodes[0])
            this.heapSize--;
            this.heapify(0);
        }
    }

    public printHeap(){
        let str = '';
        for(let i = 0; i < this.heapNodes.length; i++){
            str += this.heapNodes[i].value + ' '
        }
        console.log(str);
    }
}

export default Heap;
