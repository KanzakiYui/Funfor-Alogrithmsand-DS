////////////////////////////////////////////////////////////////////////////
/// Selection Sort
/// Start from i = 0, picked the smallest (or largest if want to order in 
/// inverted way) from its right side, exchange these two elements, and of
/// course, we know that for any 'current element', the left side subarray
/// is sorted while right side subarray is unsorted, for example:
/// [ [sorted A] [unsorted B] ]

/// Inplace: true

/// Suppose we sort in non-descending order

const selectionSort = (array: Array<number> = []) : Array<number> => {
    // We only need to iterate till the (n-1)th element, think about why?
    for(let i = 0; i < array.length - 1; i++){
        const currentUnsortedElement = array[i]
        /*
            check everyone on the right side
            initially we assume current one is the smallest comparing
            right subarray.
        */
        let minIndex = i;
        for(let j = i+1; j < array.length; j++){
            if(array[j] < array[minIndex])
                minIndex = j;
        }
        // after found out which one is smallest one, exchange it with current
        array[i] = array[minIndex];
        array[minIndex] = currentUnsortedElement;
    }
    return array;
}

export default selectionSort;