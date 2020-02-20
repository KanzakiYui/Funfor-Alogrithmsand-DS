const mergeSort = (array : Array<number> = []) : Array<number> => {
    const len = array.length;
    if(len === 1)
        return array;
    const splitPos = Math.ceil(len/2);
    const leftArray = array.slice(0, splitPos);
    const rightArray = array.slice(splitPos);
    const sortedLeft = mergeSort(leftArray);
    const sortedRight = mergeSort(rightArray);
    const rightLength = len - splitPos;
    let i=0, j=0;
    for(let k=0; k<len; k++){
        if(sortedLeft[i] <= sortedRight[j] || j >= rightLength){
            array[k] = sortedLeft[i];
            i++;
        }
        else{
            array[k] = sortedRight[j];
            j++;
        }
    }
    return array;
}

export default mergeSort;