///////////////////////////////////////////////////////////////////////////////////////
/// Insertion Sort
/// Start from 2nd elements, comparing current one with each element in the 
/// subarray on left side which is already sorted, and move those larger (or
/// smaller if want to sort in non-ascending order) right by one position,
/// and insert current one in the correct position.

///////////////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// Worst case: O(n^2)          --- when current order is in reverse order
/// Average case: O(n^2)
/// Best case: O(n)             --- when current order is exact same as goal

///////////////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// Always O(1)
/// Reason:
/// 1. in-place
/// 2. no extra auxiliary data structure
/// 3. no recursion call stack (only for loop)

/// Assumption: Suppose now we sort in non-descending order

const insertionSort = (array: Array<number> = []) : Array<number> => {
    // Checking all elements start from 2nd one.
    for(let i = 1; i < array.length; i++){
        // pick current unsorted element from array
        const currentUnsortedElement = array[i];
        /*
            For a given current element A = n[i], compare it with every element
            B = n[j] in the sorted subarray on the left, here we iterate j from
            i-1 to 0. If B > A, which means B needs move rightforward
            by one position to leave a (potential) vacancy for A, then n[j+1]=n[j].
            Until B=n[k] <= A, then it means A should be just right of B=n[k], so
            n[k+1] = A.
            In such method, if we change comparison condition to x[j] < x[i], which
            means B < A, then we will sort in non-ascending order, think about why?
        */
        let j : number;
        for(j = i-1; j >= 0; j--){
            if(array[j] > currentUnsortedElement)
                array[j+1] = array[j];
            else
                break; 
        }
        array[j+1] = currentUnsortedElement;
    }
    return array;
}

export default insertionSort;