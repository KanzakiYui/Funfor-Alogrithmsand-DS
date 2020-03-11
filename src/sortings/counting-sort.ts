///////////////////////////////////////////////////////////////////////////////////////
/// Counting Sort
/// It has some condition:
/// 1.  Array A only consists of integers (can be positive, 0, or negative)
/// 2.  Integers in A are bounded, min <= A[i] <= max for i=0, 1, ..., n and
///     min and max are KNOWN constants

const countingSort = (array : Array<number>, min: number, max: number) : Array<number> => {
    const range = max - min + 1;
    const countingArray = new Array(range).fill(0);
    const len = array.length;
    const resultArray = new Array(len);
    for(let i=0; i<len; i++)
        countingArray[array[i]-min]++;
    // Till now, countingArray[i] = x means how many elements in A has value of i
    for(let i=1; i<range; i++)
        countingArray[i] += countingArray[i-1];
    // Till now, countingArray[i] = x means how many elements in A has value <= i
    // Obviously, for an element of value i, it should be placed at index = x
    for(let i=0; i<len; i++){
        const currentValue = array[i];
        const numberOfSmallerElements = countingArray[currentValue-min];
        resultArray[numberOfSmallerElements-1] = currentValue;
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
