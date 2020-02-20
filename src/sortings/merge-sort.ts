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
    const len = array.length;
    // Conquer: also it's the terminate of the recursion
    if(len === 1)
        return array;

    const splitPos = Math.ceil(len/2);
    // Divide:  it can also be done by using loop to assign to new arrays.
    const leftArray = array.slice(0, splitPos);
    const rightArray = array.slice(splitPos);
    // Recursion
    const sortedLeftArray = mergeSort(leftArray);
    const sortedRightArray = mergeSort(rightArray);
    // Combine: combine sortedLeftArray and sortedRightArray subarrays.
    const rightArrayLength = len - splitPos;
    // i points to the current smallest one in left array, initially it's 0
    // j points to the current smallest one in right array, initially it's 0
    let i=0, j=0;
    for(let k=0; k<len; k++){
        /*
            there is an edge case, suppose one of the array already be fully
            picked, here we use 'j >= rightArrayLength' to imply sortedRightArray
            is all picked, then we must pick from the other one, here means
            sortedLeftArray.
            Fact 1: when both arrays are fully picked, the for loop terminates,
            which means exactly when k = len, think about why?
            Fact 2: when we use 'sortedLeftArray[i] > sortedRightArray[j]' instead,
            it will sort in non-ascending order, think about why?
        */
        if(sortedLeftArray[i] <= sortedRightArray[j] || j >= rightArrayLength){
            array[k] = sortedLeftArray[i];
            // once used, move the pointer right forwad.
            i++;
        }
        else{
            array[k] = sortedRightArray[j];
            j++;
        }
    }
    return array;
}

export default mergeSort;