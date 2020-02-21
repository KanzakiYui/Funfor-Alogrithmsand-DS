////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// Always O(n*logn)
/// Reason: Since regardless of its initial order, for every two
/// divided subarrays, we still need to compare one by one. Every 'Combine'
/// takes O(n), while it repeat (recurrsion) in logarithmic time, for example,
/// nearly log2(n) if each time we divide array equally.

////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// Always: O(n)        -------------   if use array not linked list
/// Reason: Please note that the actual code exection is not run in parallel
/// and every time the function exist (and return back to caller), the memory
/// is freed due to garbage collection. Let's use n = 4 as an example shown
/// below, same for n = 8, n = 16, etc. The total space used AT ANY TIME POINT
/// is always O(n)
/*                                                        
    (2, not yet)     =>          2   (2, not yet)    =>     2     2  => final
    / \                              / \
   1   1      (total = 2)           1   1   (total = 4)     (total =4)
*/

////////////////////////////////////////////////////////////////////////////
/// Note:
/// When calcualte time complexity, we do accumulation (sum up all), of course.
/// When calcualte space complexity, we only consider at a given time point,
/// how many resource/auxiliary are used. (consider garbage collection etc.)

/// Assumption: Suppose now we sort in non-descending order

const mergeSort = (array : Array<number> = []) : Array<number> => {
    const sort = (array: Array<number>, startIndex: number, endIndex: number) => {
        if(startIndex === endIndex)
            return;
        const middleIndex = Math.floor((startIndex + endIndex) / 2);

        // [startIndex, middleIndex], [middleIndex+1, endIndex]
        sort(array, startIndex, middleIndex);
        sort(array, middleIndex+1, endIndex);

        const tempArray = array.slice(startIndex, middleIndex+1);
        const leftLength = middleIndex - startIndex + 1;
        let leftPointer = 0, rightPointer = middleIndex + 1, modifiedPointer = startIndex;

        while(leftPointer < leftLength && rightPointer <= endIndex){
            array[modifiedPointer++] = tempArray[leftPointer] < array[rightPointer]
                ? tempArray[leftPointer++]
                : array[rightPointer++]
        }

        while(leftPointer < leftLength){
            array[modifiedPointer++] = tempArray[leftPointer++]
        }
    }
    sort(array, 0, array.length - 1);
    return array;
}

export default mergeSort;