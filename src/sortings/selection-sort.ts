///////////////////////////////////////////////////////////////////////////////////////
/// Selection Sort
/// Start from i = 0, for any given element A, picked the smallest(or largest
/// if want to order in non-ascending way) B from A's right side, exchange
/// A and B. Obviously, during the process, the left side subarray of A is
/// always sorted while right side subarray of A is unsorted.

///////////////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// Always O(n^2) since for any A, it unavoidably needs to compare every B
/// on its right side regardless array's initial order/status.

///////////////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// Always O(1)
/// Reason: input array passed by reference, and it's in-place algorithm, no
/// need extra space/additional data structure to store the output, etc.

/// Assumption: Suppose now we sort in non-descending order

const selectionSort = (array: Array<number> = []) : Array<number> => {
    // We only need to iterate till the (n-1)th element, think about why?
    for(let i = 0; i < array.length - 1; i++){
        // pick current unsorted element from array
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