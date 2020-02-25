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
    public nodeTree: Array<HeapNode>

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
    }

    private swap(node1: HeapNode, node2: HeapNode){
        const tempValue = node1.value;
        node1.value = node2.value;
        node2.value = tempValue;
    }

    private heapify(index: number){
        const currentNode = this.nodeTree[index];
        const currentValue = currentNode.value;
        const leftNode = this.nodeTree[index].left;
        const leftValue = leftNode?.value;
        const rightNode = this.nodeTree[index].right;
        const rightValue = rightNode?.value;
        if(leftValue > currentValue && leftValue > rightValue){
            this.swap(leftNode, currentNode);
            this.heapify(leftNode.index);
        }      
        else if(rightValue > currentValue && rightValue > leftValue){
            this.swap(rightNode, currentNode);
            this.heapify(rightNode.index);
        }
    }

    private buildHeap(){
        for(let i = Math.floor(this.nodeTree.length/2); i >=0 ; i --)
            this.heapify(i);
    }

    public heapSort(){
        this.buildHeap();
        for(let i = this.nodeTree.length; i > 0; i++){
            this.swap(this.nodeTree[i], this.nodeTree[0])
            
        }
    }

    public printHeap(){
        for(let i = 0; i < this.nodeTree.length; i++){
            const currentNode = this.nodeTree[i];
            console.log(`Node at index of ${i} has value of ${currentNode.value},
            parent is ${currentNode.parent?.value},
            left is ${currentNode.left?.value},
            right is ${currentNode.right?.value}
            `)
        }
    }
}

export default Heap;
