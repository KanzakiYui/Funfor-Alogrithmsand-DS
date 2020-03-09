///////////////////////////////////////////////////////////////////////////////////////
/// Merge Sort
/// It used `Divide and Conquer` methodology, that is recursively solve the
/// similar subproblems, see below:
/// 1.  Divide: for any given array, divide into two subarrays equally.
/// 2.  Conquer: if current array (subproblem) is not small enough, divide
///     again (recursively), otherwise, solve it directly, for example here,
///     when subarray has length of 1, it must be sorted, just return it.
/// 3.  Combine: suppose left-array of length A and right-array of length B
///     are sorted, then for all vacancy 0 to A+B-1, pick smaller one from
///     smallest(which means first) of A and smallest(which means first) of B.

///////////////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// Always O(nlgn)
/// Reason: suppose T(n) is the time spent on worst case, then we have:
/// T(n) = 2T(m/2) + O(n) + O(1), which means
/// Total time = 2 * subproblems time + combine time + division time
/// Note that n is even or odd won't affect this formula.
/// Using Master Theorem, we can get T(n) = O(nlgn) where lgn means log2(n)
/// On the other hand, it's not hard to find out that each recursion costs
/// at most O(n), while there are O(lgn) times recursion (recursion tree)
/// thus, we can roughly estimate it's O(nlgn)

///////////////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// Always: O(n)        -------------   if use array not linked list
/// Before give reason, we need to know two facts:
/// 1.  when we calculate time complexity T(n), we accumulate all time spent
/// 2.  when we calculate space complexity S(n), we only consider at any
///     given time, at most how many resource/auxiliary are used. For example,
///     if we consider garbage collection when each recursive call exits.
/// Another important thing is, it may depend on our implement details, for
/// example, if we allocate two temp subarrays in each recursion before
/// merge-sort the two subarrays respectively recursively, then lots of spaces
/// resources may be taken!
/// However, in a standard merge sort algorithm, we don't need to do spend that
/// much, since we can use 'startIndex, endIndex' together with the global array
/// to 'simulate' the truncated subarray. See below implementation.
///
/// Reason:
/// 1.  Recursion call stack, depth is O(lgn)
/// 1.  In any recursion (n=k), there are only one tempArray created which is
///     used to combine two sorted parts (or we call 'subarrays').
/// 2.  tempArray is created after merge-sort 'subarrays', which used O(n).
/// 3.  Memory for tempArray is free after current call exits.
/// 4.  No other auxiliary data strcuture is used and it's in-place algorithm.
///     Total = call stack taken + each time a call internally taken = O(lgn) + O(n)
///     = O(n)

/// Assumption: Suppose now we sort in non-descending order

const mergeSort = (array : Array<number> = []) : Array<number> => {
    // Here we declared what the recursion function takes:
    // 1.   Always the global array (no need other space resource)
    // 2.   startIndex, endIndex to imply which 'subarray' we are processing now
    const sort = (array: Array<number>, startIndex: number, endIndex: number) : void =>
    {
        // if n = 1, solve directly, which means no need modify global array
        if(startIndex === endIndex)
            return;

        const middleIndex = Math.floor((startIndex + endIndex) / 2);
        /*
            Now we have two 'simulated' subarrays, which are:
            1. [startIndex, ..., middleIndex]
            2. [middleIndex+1, ..., endIndex]
        */
        // Divide and Recursion
        sort(array, startIndex, middleIndex);
        sort(array, middleIndex+1, endIndex);

        /*
            Now we have:
            1. sorted array[startIndex, ..., middleIndex] = A1
            2. sorted array[middleIndex+1, ..., endIndex] = A2
            How to combine? Of course, we need to iterate:
            A = [A1, A2] = [startIndex, ..., endIndex]
            Since it's what we need process in this recursion, and we use
            'iteratePointer' stands for corresponding iterator.

            In each iteration, we compare 'currently minimum' of sorted A1, A2.
            In order to preserve values of A1, we copy it to tempArray.
            We use another two iterators: 'leftPointer', 'rightPointer'.
        */

        // Copy
        const tempArray = array.slice(startIndex, middleIndex+1);

        // for A
        let iteratePointer = startIndex;    
        // for tempArray (copy from A1), range: 0 <= x < leftLength
        const leftLength = middleIndex - startIndex + 1;
        let leftPointer = 0;
        // for A2, range: middleIndex + 1 <= x <= endIndex
        let rightPointer = middleIndex + 1;

        while(leftPointer < leftLength && rightPointer <= endIndex){
            array[iteratePointer++] = tempArray[leftPointer] < array[rightPointer]
                ? tempArray[leftPointer++]
                : array[rightPointer++]
        }

        /*
            Finally, there are two edge cases:
            1.  tempArray finished iteration, A2 not yet, well, we leave remaining
                of A2 as where they are (think about why?)
            2.  A2 finished iteration, tempArray not yet, then continue copy remaining           
                of tempArray to remaining vacancy in A 
        */

        while(leftPointer < leftLength){
            array[iteratePointer++] = tempArray[leftPointer++]
        }
    }

    // Initially, of course, startIndex = 0, endIndex = array's length - 1
    sort(array, 0, array.length - 1);
    // Note that array changed in-place!
    return array;
}

export default mergeSort;