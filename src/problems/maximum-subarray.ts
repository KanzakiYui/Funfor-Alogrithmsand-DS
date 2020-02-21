////////////////////////////////////////////////////////////////////////////
/// Maximum Subarray
/// Given an array A of numbers, find a non-empty contiguous subarray B
/// (contiguous means picked elements from A are consecutive), so that the
/// sum of the all elements in this B is maximum.
/// For example: A = [1, -2, 3, -4, 5], then B = [5]

const findMaxCrossingSubarray = (
    array: Array<number>,
    startIndex: number,
    middleIndex: number,
    endIndex: number
) : Array<number> => {

    // array[middleIndex] must be included
    let leftMaxSum = array[middleIndex];
    let leftMaxIndex = middleIndex;
    let accumulatedLeftSum = leftMaxSum;

    for(let i = middleIndex-1; i >= startIndex; i--){
        accumulatedLeftSum += array[i];
        if(accumulatedLeftSum > leftMaxSum){
            leftMaxSum = accumulatedLeftSum;
            leftMaxIndex = i;
        }
    }

    // array[middleIndex + 1] must be included
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
    const [startIndexOnLeft, endIndexOnLeft, sumOnLeft] =
        getMaximumSubarray(array, startIndex, middleIndex);
    const [startIndexOnRight, endIndexOnRight, sumOnRight] =
        getMaximumSubarray(array, middleIndex+1, endIndex);
    const [startIndexOnCross, endIndexOnCross, sumOnCross] =
        findMaxCrossingSubarray(array, startIndex, middleIndex, endIndex);
    
    if(sumOnLeft >= sumOnRight && sumOnLeft >= sumOnCross)
        return [startIndexOnLeft, endIndexOnLeft, sumOnLeft];
    else if(sumOnRight >= sumOnLeft && sumOnRight >= sumOnCross)
        return [startIndexOnRight, endIndexOnRight, sumOnRight];
    else
        return [startIndexOnCross, endIndexOnCross, sumOnCross];
    
}

const maximumSubarray = (array : Array<number>) : void => {
    const [startIndex, endIndex, maxSum] =
        getMaximumSubarray(array, 0, array.length - 1);

    console.log(
        'The maximum subarray is',
        array.slice(startIndex, endIndex+1),
        'with total sum of',
        maxSum
    );
};

export default maximumSubarray;