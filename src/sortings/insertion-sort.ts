////////////////////////////////////////////////////////////////////////////
/// Insertion Sort
/// Sort elements continuously from the unsorted subarray (right) B by
/// comparing it with all elements in the sorted subarray (left) A and insert
/// it into the  right position, for example: [ [sorted A] [unsorted B] ]

/// Inplace: true

/// Suppose we sort in non-descending order

const insertionSort = (array: Array<number> = []) : Array<number> => {
    // Checking all elements start from 2nd one in array B
    for(let i = 1; i < array.length; i++){
        // pick current unsorted element from array
        const currentUnsortedElement = array[i];
        // compare it with every element in the sorted non-descending subarray
        // A on the left.
        let j = i - 1;
        /*
            Only insert/reorder if it's smaller than existing one in A.
            since the best case is current one is larger than every one
            in A (which means larger than last element in A)
            suppose x[j] > x[i], then xj need rightforward one position, which
            means x[j+1] = x[j], then during the iteration, until we find
            the termination condition, suppose j = k, all we have so far is:
            x[i] = x[i-1]      // means x[i-1] (=x[j]) right forward one position
            x[i-1] = x[i-2]
            x[i-2] = x[i-3]
            ...
            x[k+2] = x[k+1]    // here j = k+1, then j = j - 1 = k
            // now j = k, meet the termiantion condition, and now we have:
            // x[0, 1, ... k] are smaller than x[i], while
            // x[k+2, k+3, ... i-1] are bigger than x[i], current x[i] has
            // value of previous x[i-1] since rightforwarded.
            // thus k+1 must be the correct position for x[i]
            x[k+1] = original value of x[i]
        */
        // if we change to `currentUnsortedElement > array[j]`, we can sort
        // in non-ascending order. Think about why?
        while(j >= 0 && currentUnsortedElement < array[j]) {
            array[j+1] = array[j];
            j = j - 1;
        }
        array[j+1] = currentUnsortedElement;
    }
    return array;
}

export default insertionSort;