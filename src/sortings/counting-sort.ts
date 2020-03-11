///////////////////////////////////////////////////////////////////////////////////////
/// Counting Sort
/// It has some condition:
/// 1.  Array A only consists of integers (can be positive, 0, or negative)
/// 2.  Integers in A are bounded, min <= A[i] <= max for i=0, 1, ..., n and
///     min and max are KNOWN constants
/// Idea:
/// The idea is not using the comparison between elements like other sorts (heap,
/// qucik, etc), instead, we know that the index of array from left to right is natually
/// ascending! And the `index` can hold non-descending values. On the other hand, for
/// any element E with value X, if we already knew how many elements in A has smaller value,
/// then the actual position of E in the output array is easily determined!
/// Approach:
/// 1.  map A's element values to temp array B's index
/// 2.  find a way so that for any element with value of X at index Y in B, it means
///     A has Y elements whose values are not larger than X.
/// 3.  combine (1) and (2) and get the output array C.

///////////////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// Alwasy O(n+k)           ------- k is the range = max - min + 1
/// Reason:
/// k could be significantly larger than n

///////////////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// Always: O(n+k)

const countingSort = (array : Array<number>, min: number, max: number) : Array<number> => {
    // Firstly, we must say here the bound (min-max) is explicitly provided, but
    // even not provided, we can easily use O(n) time to find max and min of given array.
    
    // countingArray starts with [0, ..., 0] with length of max-min+1
    const range = max - min + 1;
    const countingArray = new Array(range).fill(0);

    const len = array.length;
    const resultArray = new Array(len);

    // The following loop makes any element with value X at index of i in countingArray
    // means that A has X elements whose value = i.
    // Note that the '-min' means offset, so that:
    // B[0] => min, B[1] => min+1, ... B[max-min] = max
    // A simple example is min = 0, which means A only consists of non-negative integers.
    for(let i=0; i<len; i++)
        countingArray[array[i]-min]++;

    // The following loop makes any element with value X at index of i in countingArray
    // means that A has X elements whose value <= i.
    for(let i=1; i<range; i++)
        countingArray[i] += countingArray[i-1];

    /*
        Use the following loop to count instead, will sort array in non-ascending order:
        for(let i=range-2; i>=0; i--)
            countingArray[i] += countingArray[i+1];
    */

    // if there are X elements in A has value not larger than Y, then
    // element with value Y should be place at:
    // A[0, 1, ..., X-2, X-1]
    // ^ since A[0, ..., X-2] has length of X-1, and the Xth one which
    // is current picked element, should be placed at Xth position, which
    // means A[X-1]
    for(let i=0; i<len; i++){
        const currentValue = array[i];
        const numberOfSmallerElements = countingArray[currentValue-min];
        resultArray[numberOfSmallerElements-1] = currentValue;
        // Also, once assigned element to the output array, it will be no longer
        // considered, should be removed from scope of countingArray, which implies
        // the number of elements share the same value is decreased by 1.
        countingArray[currentValue-min]--;
    }
    return resultArray;
}

export default (array?: Array<number>)=>{
    // Please note that finding the max or min only in an array, will always be
    // O(n) regarding time complexity
    const min = Math.min(...array);
    const max = Math.max(...array);
    return countingSort(array, min, max);
};
