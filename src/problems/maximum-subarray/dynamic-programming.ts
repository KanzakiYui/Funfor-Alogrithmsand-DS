////////////////////////////////////////////////////////////////////////////
/// Maximum Subarray
/// Given an array A of numbers, find a non-empty contiguous subarray B
/// (contiguous means picked elements from A are consecutive), so that the
/// sum of the all elements in this B is maximum.
/// For example: A = [1, -2, 3, -4, 5, 2, -1], then B = [5, 2]


////////////////////////////////////////////////////////////////////////////
/// Solution - Dynamic Programming
/// Dynamic Programming is usually suitable to solve overlapping subproblems.
/// Here we will skip the conception and any fundamental knowledges about it.
/// But in general, we cache/store the temp results to achieve Dynamic Programming.
/// Let's intuitively see how usually probably solve such problem:
/// 1. we denote B as the real maximum subarray of array A (size = n)
/// 2. we may pick the 1st one A[0] and start to look after the remainings
/// 3. there are two possibility for us to deal with B:
/// (1) don't do anything: if in some case, current situation is better,
///     for example, [1, 2, -1], we already start to check A[i] = -1, of course,
///     we don't wanna include -1 in it! <= we still need store maxSum = 3.
/// (2) do something, which means MOVE either (or both) startIndex and
///     endIndex of B right forward (obviously not left forward). However,
///     there are three possbilities under (2)
///     (2.1) startIndex move right, endIndex move right (possibile)
///     (2.2) startIndex don't move right, endIndex move right (possible)
///     (2.3) startIndex move right, endIndex don't move right (Impossible!!, why?)
///     So it's easy to understand, that if endIndex move right, startIndex may
///     or may not move right correspondingly, but if endIndex stay, then startIndex
///     must stay as well! Therefore, we only need pay attention to how endIndex
///     move => it's simple, either move to current i, or not (stay the same).
///     But how could we know if we should move endIndex to i? We compare! Compare
///     what? We compare:
///     (a). current maxSum of B
///     (b). current maxSum of new B (when B move endIndex to i)
///     (a) >= (b) then preserve B, otherwise B = new B (and other related updates)
///     (a) is simple, since we always cache/store the up-to-date B.
///     (b)? => it turns out to be: when endIndex = i is fixed, find maxSum etc.

////////////////////////////////////////////////////////////////////////////
/// Time Complexity
/// T(n) = O(n)     --- of course, only a single loop.

////////////////////////////////////////////////////////////////////////////
/// Space Complexity
/// O(1)            --- of course, no additional axuiliary used, just some numbers 

// Let's denote the global array as A (size = n)
const getMaximumSubarray = (array: Array<number>): Array<number> => {

    // For any given i = 0, 1, ..., n, denote B as the subarray of
    // A which has the maximum sum AMONG all of subarrays whose endIndex is
    // at i, for example:
    // A = [1, 3, -2, 10, 9], i = 2, then B = [1, 3, -2], since it has maximum
    // sum of [1, 3, -2], [3, -2], [-2].
    // another example, A = [-1, -2, 1, 2, 3], i = 2, then B = [1], since it
    // has maximum sum of [-1, -2, 1], [-2, 1], [1].
    let sumOfMaxSubarrayWhenEndsHere = array[0];
    let startIndexOfMaxSubarrayWhenEndsHere = 0;
    let endIndexOfMaxSubarrayWhenEndsHere = 0;

    // Denote the maximum subarray of A as C
    let sumOfMaxSubarrayWhenEndsSomewhere = array[0];
    let startIndexOfMaxSubarrayWhenEndsSomewhere = 0;
    let endIndexOfMaxSubarrayWhenEndsSomewhere = 0;

    for(let i = 1; i < array.length; i++){
        const currentElement = array[i];
        /*
            From iterate from i - 1 to i, B can only:
            change from A[startIndexOfMaxSubarrayWhenEndsHere, i - 1] to either:
            1. A[startIndexOfMaxSubarrayWhenEndsHere, i], or <= startIndex no change
            2. A[i, i] <= startIndex must change to i, we can prove it:
            (2.1) suppose B' = A[x, i] where x < startIndexOfMaxSubarrayWhenEndsHere
                then sum of B' = sum of A[x, startIndexOfMaxSubarrayWhenEndsHere-1]
                              + sum of A[startIndexOfMaxSubarrayWhenEndsHere, i-1]
                              + sum of A[i, i]
                and it's obvious sum of A[x, startIndexOfMaxSubarrayWhenEndsHere-1] < 0 
                because A[startIndexOfMaxSubarrayWhenEndsHere, i - 1] as largest sum
                in any subarray which ends at i-1.
            (2.2) same reason for B' = A[x, i] where x > startIndexOfMaxSubarrayWhenEndsHere
        */

        endIndexOfMaxSubarrayWhenEndsHere = i;
        if(currentElement > currentElement + sumOfMaxSubarrayWhenEndsHere){
            // case 2, B becomes [i, i]
            sumOfMaxSubarrayWhenEndsHere = currentElement;
            startIndexOfMaxSubarrayWhenEndsHere = i;
        }
        else{
            // case 1, which means startIndex won't change, B just extend to i
            sumOfMaxSubarrayWhenEndsHere = currentElement + sumOfMaxSubarrayWhenEndsHere;
        }
            
        // for A, it can only be:
        // 1. preserve whereever it is now (if A >= B)
        // 2. A move endIndex rightforward (may also move startIndex),
        //    however, if move, move to B (becomes B) is already ideal case,
        // since suppose A move endIndex to x, then
        // B = B(x) is the best choice.
        if(sumOfMaxSubarrayWhenEndsSomewhere < sumOfMaxSubarrayWhenEndsHere){
            sumOfMaxSubarrayWhenEndsSomewhere = sumOfMaxSubarrayWhenEndsHere;
            startIndexOfMaxSubarrayWhenEndsSomewhere = startIndexOfMaxSubarrayWhenEndsHere;
            endIndexOfMaxSubarrayWhenEndsSomewhere = endIndexOfMaxSubarrayWhenEndsHere;
        }
    }

    return [startIndexOfMaxSubarrayWhenEndsSomewhere, endIndexOfMaxSubarrayWhenEndsSomewhere, sumOfMaxSubarrayWhenEndsSomewhere];
}

const dynamicProgramming = (array: Array<number>): void => {
    const [startIndex, endIndex, maxSum] = getMaximumSubarray(array);
    console.log(
        'The maximum subarray of',
        array,
        'is',
        array.slice(startIndex, endIndex+1),
        'with total sum of',
        maxSum
    );
}

export default dynamicProgramming;