////////////////////////////////////////////////////////////////////////////
/// Maximum Subarray
/// Given an array A of numbers, find a non-empty contiguous subarray B
/// (contiguous means picked elements from A are consecutive), so that the
/// sum of the all elements in this B is maximum.
/// For example: A = [1, -2, 3, -4, 5, 2, -1], then B = [5, 2]


////////////////////////////////////////////////////////////////////////////
/// Solution - Divide and Conquer
/// Please note that divide and conquer may not be the whole solution of the
/// problem, but CAN be PART of solution of the whole problem. Therefore,
/// it's hard to find we can find the following facts:
/// for any array A = [x1, x2, ..., xn], and suppose n is even and maximum
/// subarray is: B = [xi, ..., xj], then A must meet exact one of the three
/// conditions:
/// case (1): 1 <= xi <= xj <= n/2 ( B is inside left subarray of A)
/// case (2): xi <= n/2 < xj (when B cross the middle of A)
/// case (3): n/2 < xi <= xj <= n ( B is inside right subarray of A)
/// Get the maximum one from the result of (1), (2), (3) and that is the 
/// maximum for current A.

////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// T(n) = O(nlgn)
/// Reason: suppose size n is a power of 2, and note time complexity as T(n)
/// Beside those constant time O(1), we can easily have:
/// T(n) = 2T(n/2) + O(n) => Obviously, findMaxCrossingSubarray takes O(n):

////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// O(lgn)
/// Reason: for each recursion, only O(1) is taken (e.g. no auxiliary is used)
/// while there are O(lgn) times recusion (the recursion tree depth), so O(lgn) 

/// This method is dedicated to solve the case (2) --- when cross the middle one.
const findMaxCrossingSubarray = (
    array: Array<number>,
    startIndex: number,
    middleIndex: number,
    endIndex: number
) : Array<number> => {

    // array[middleIndex] MUST be included, obviously
    let leftMaxSum = array[middleIndex];
    let leftMaxIndex = middleIndex;
    let accumulatedLeftSum = leftMaxSum;

    // check every element start from middleIndex - 1, 
    // since middle point is already included
    for(let i = middleIndex-1; i >= startIndex; i--){
        accumulatedLeftSum += array[i];
        // the conception of accumulation sum is from the problem itself
        if(accumulatedLeftSum > leftMaxSum){
            leftMaxSum = accumulatedLeftSum;
            leftMaxIndex = i;
        }
    }

    // array[middleIndex + 1] must be included, why?
    // because if it's not included, then it will goes to case (1)
    // and should be enter this function body.
    let rightMaxSum = array[middleIndex + 1];
    let rightMaxIndex = middleIndex + 1;
    let accumulatedRightSum = rightMaxSum;

    for(let i = middleIndex + 2; i <= endIndex; i++){
        accumulatedRightSum += array[i];
        if(accumulatedRightSum > rightMaxSum){
            rightMaxSum = accumulatedRightSum;
            rightMaxIndex = i;
        }
    }
    
    // the corresponding start/endIndex as well as the sum
    return [leftMaxIndex, rightMaxIndex, leftMaxSum + rightMaxSum]
}

const getMaximumSubarray = (
    array: Array<number>,
    startIndex: number,
    endIndex: number
) : Array<number> => {
    // Termination, as we said, the 'getMaximumSubarray' can't return empty array.
    if(startIndex === endIndex)
        return [startIndex, endIndex, array[startIndex]]
    
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    // left half, [startIndex, ..., middleIndex]
    const [startIndexOnLeft, endIndexOnLeft, sumOnLeft] =
        getMaximumSubarray(array, startIndex, middleIndex);
    // right half, [middleIndex+1, ..., endIndex]
    const [startIndexOnRight, endIndexOnRight, sumOnRight] =
        getMaximumSubarray(array, middleIndex+1, endIndex);
    // cross case: [..., middleIndex, middleIndex+1, ...]
    const [startIndexOnCross, endIndexOnCross, sumOnCross] =
        findMaxCrossingSubarray(array, startIndex, middleIndex, endIndex);
    
    if(sumOnLeft >= sumOnRight && sumOnLeft >= sumOnCross)
        return [startIndexOnLeft, endIndexOnLeft, sumOnLeft];
    else if(sumOnRight >= sumOnLeft && sumOnRight >= sumOnCross)
        return [startIndexOnRight, endIndexOnRight, sumOnRight];
    else
        return [startIndexOnCross, endIndexOnCross, sumOnCross];
    
}

const divideAndConquer = (array : Array<number>) : void => {
    const [startIndex, endIndex, maxSum] =
        getMaximumSubarray(array, 0, array.length - 1);

    console.log(
        'The maximum subarray of',
        array,
        'is',
        array.slice(startIndex, endIndex+1),
        'with total sum of',
        maxSum
    );
};

export default divideAndConquer;