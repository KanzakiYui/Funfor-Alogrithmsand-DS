///////////////////////////////////////////////////////////////////////////////////////
/// Quick Sort
/// Similar to Merge Sort, it used the `Divide and Conquer` methodology, the generic
/// idea works like follow:
/// 1.  Partition(startIndex, endIndex)
///     For any subarray A[startIndex, endIndex], we partition it by arranging it thus:
///     it becomes:
///     [startIndex, ..., partitionIndex, partitionIndex+1, partitionIndex+2, ..., endIndex]
///     (1) elements in array[startIndex, ..., partitionIndex] <= array[partitionIndex+1]
///     (2) elements in array[partitionIndex+2, ..., endIndex] > array[partitionIndex+1]
/// 2.  Conquer
///     Recursively solve each parts, for example, array[startIndex, ..., partitionIndex]
///     becomes new subarray awaiting process in next recursion. Termination is of course,
///     if endIndex <= startIndex, return directly since it's trival
/// 3.  Combine
///     since for any subarray A[startIndex, endIndex], its left parts, right parts are
///     already sorted, and middle element is exactly not smaller than left, and smaller
///     than right, thus NO extra action is needed, hence subarray is sorted.

///////////////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// 1. Worst case:      O(n^2)
///     The worst case happens when the array is ALREADY sorted in non-descending or
///     non-ascending. Since each time it divides problem of T(n) into T(n-1) and T(1)
///     problems, thus we have:
///     T(n) = T(n-1) + O(1) + O(n) where the O(n) means the execution of partition.
///     => we got T(n) = O(n^2)
/// 2. Best case:       O(nlgn)
///     The best case happens when each recursion partition the array of n into two n/2,
///     which implies it divide evenly (as possible), and we have easily get:
///     T(n) = 2T(n/2) + O(n)
///     => we got T(n) = O(nlgn)
/// 3. Average case:    O(nlgn)
///     The average case happens when array is random, and we skip proof here. Intuitively,
///     It's not hard to find out:
///     T(n) = T((1-x)n) + T(xn) + O(n)

///////////////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// O(lgn)
/// Reason:
/// 1. in-place
/// 2. no extra auxiliary data structure
/// 3. recursion call stack while the depth is O(lgn)

const quickSort = (array?:Array<number>): Array<number> => {
    /*
        Partitioning:
        For any given subarray, we partition it in-place by:
        1. use the value of array[endIndex] as partition comparer, denote X.
        2. re-arrange the array so that:
            (1) left side array[startIndex, ..., partitionIndex]:
                every element is not larger than X.
            (2) array[partitionIndex+1] = X
            (2) right side array[partitionIndex+2, ..., endIndex]:
                every element is larger than X.
        [Note] Another interesting thing we can easily find out is, if X is
        already the minimum one, then the loop won't be 'really' executed, and
        only result in that A[endIndex] (which has value of X) swap with
        array[partitionIndex+1] = A[startIndex], thus X is place at first, other
        elements since all larger than X, keep unchanged!

        Time Complexity:
        O(n) where n = endIndex - startIndex
    */
    const partitioning = (startIndex : number, endIndex : number) => {
        if(endIndex <= startIndex)
            return;

        // initially assume no one is smaller than X, and we need to
        // find out all smaller one, and place them on the left side.
        let partitionIndex = startIndex - 1;
        let partitionComparer = array[endIndex];
        // we iterate from startIndex to endIndex - 1, and we can get
        // two parts: array[startIndex, ..., partitionIndex] which are
        // all not larger than array[endIndex], and
        // array[partitionIndex+1, ..., endIndex-1] which are all larger
        // than array[endIndex], finally, we swap array[partitionIndex+1]
        // and array[endIndex], to get final result:
        for(let i = startIndex; i <= endIndex - 1; i++){
            const currentValue = array[i];
            if(currentValue <= partitionComparer){
                partitionIndex++;
                // swap in order to let this found one place at left side
                array[i] = array[partitionIndex];
                array[partitionIndex] = currentValue;
            }
        }
        array[endIndex] = array[partitionIndex+1];
        array[partitionIndex+1] = partitionComparer;
        /*
            We recursivly solve problems:
            (1) left part: Array[startIndex, partitionIndex] (recursion till trival)
            (2) Array[partitionIndex+1] (skip)
            (3) right part: Array[middleIndex + 2, endIndex] (recursion till trival)
        */
        partitioning(startIndex, partitionIndex);
        partitioning(partitionIndex+2, endIndex);
    }

    partitioning(0, array.length - 1);
    return array;
}

export default quickSort;