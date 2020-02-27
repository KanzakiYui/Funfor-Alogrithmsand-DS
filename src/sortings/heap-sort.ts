////////////////////////////////////////////////////////////////////////////
/// Conception
/// 1.  The height of a node in heap
///     The number of edges on the longest simple downward path from the node
///     to a leaf. For example, the leaf has height of 0, the parent of leaf
///     has height of 1.
/// 2.  The height of a heap
///     = the height of root = O(lgn) if heap has size = n.

class HeapNode {
    public value: number;
    public readonly index: number;
    public parent: HeapNode;
    public left: HeapNode;
    public right: HeapNode;

    constructor(value: number, index: number){
        this.value = value;
        this.index = index;
    }
    
}

class Heap {
    private nodeTree: Array<HeapNode>
    private heapSize: number

    constructor (array: Array<number>){
        const len = array.length;
        // build binary tree represent of given array.
        this.nodeTree = new Array();
        for(let i = 0; i < len; i++){
            this.nodeTree[i] = new HeapNode(array[i], i);
        }
        for(let i = 0; i< len; i++){
            this.nodeTree[i].parent = i ? this.nodeTree[Math.floor(i/2)] : null;
            const leftIndex = 2*i + 1;
            const rightIndex = 2*i + 2;
            this.nodeTree[i].left = leftIndex < len ? this.nodeTree[leftIndex] : null;
            this.nodeTree[i].right = rightIndex < len ? this.nodeTree[rightIndex] : null;
        }
        this.heapSize = len;
    }

    private swap(node1: HeapNode, node2: HeapNode){
        const tempValue = node1.value;
        node1.value = node2.value;
        node2.value = tempValue;
    }

    // The requirement of using heapify is that the node at the given 
    // index must be a root of a non-trivial subtree, otherwise useless,
    // for example, the leaves are no need to be heapified.
    private heapify(index: number){
        const currentNode = this.nodeTree[index];
        const currentValue = currentNode.value;
        const leftNode = this.nodeTree[index].left;
        const leftValue = leftNode?.value || Number.MIN_SAFE_INTEGER;
        const rightNode = this.nodeTree[index].right;
        const rightValue = rightNode?.value;
        const isLeftExistInHeap = leftNode && leftNode.index < this.heapSize;
        const isRightExistInHeap = rightNode && rightNode.index < this.heapSize;
        if(  isLeftExistInHeap && leftValue > currentValue && (isRightExistInHeap ? leftValue >= rightValue : true)){
            this.swap(leftNode, currentNode);
            this.heapify(leftNode.index);
        }      
        else if( isRightExistInHeap && rightValue > currentValue && (isLeftExistInHeap ? rightValue >= leftValue : true)){
            this.swap(rightNode, currentNode);
            this.heapify(rightNode.index);
        }
    }

    private buildHeap(){
        const startIndex = Math.floor(this.heapSize/2) - 1;
        for(let i = startIndex; i >=0 ; i --)
            this.heapify(i);
    }

    public heapSort(){
        this.buildHeap();
        const lastIndex = this.nodeTree.length - 1;
        for(let i = lastIndex; i >= 1; i--){
            this.swap(this.nodeTree[i], this.nodeTree[0])
            this.heapSize--;
            this.heapify(0);
        }
    }

    public printHeap(){
        let str = '';
        for(let i = 0; i < this.nodeTree.length; i++){
            str += this.nodeTree[i].value + ' '
        }
        console.log(str);
    }
}

export default Heap;
