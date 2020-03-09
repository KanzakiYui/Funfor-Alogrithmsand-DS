const heapSort = (array?: Array<number>) : Array<number> => {
    const len = array.length;
    let heapsize = len;

    const heapify = (index: number) => {
        let current = array[index];
        let largestIndex = index;
        while(true){
            let leftIndex = 2 * index + 1;
            let rightIndex = leftIndex + 1;
            if(leftIndex < heapsize && array[leftIndex] > current)
                largestIndex = leftIndex
            if(rightIndex < heapsize && array[rightIndex] > array[largestIndex])
                largestIndex = rightIndex
            if(largestIndex !== index){
                array[index] = array[largestIndex];
                array[largestIndex] = current;
                index = largestIndex;
            }
            else
                break;
        }  
    }

    for(let i=Math.floor(len/2)-1; i>=0; i--)
        heapify(i);
    for(let i=len-1; i>0; i--){
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        heapsize --;
        heapify(0);
    }

    return array;
}

export default heapSort