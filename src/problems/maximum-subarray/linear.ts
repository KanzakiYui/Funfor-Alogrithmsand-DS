const linear = (array: Array<number>): Array<number> => {
    let maxWhenEndsHere = array[0];
    let maxStartIndexWhenEndsHere = 0;
    let maxEndIndexWhenEndsHere = 0;
    let maxWhenEndsSomewhere = array[0];
    let maxStartIndexWhenEndsSomewhere = 0;
    let maxEndIndexWhenEndsSomewhere = 0;

    for(let i = 1; i < array.length; i++){
        const currentElement = array[i];
        // for maxWhenEndsHere, we must end at index = i
        // then it leads to only two possiblities:
        // 1. startIndex change, which must changed to index = i (why?)
        // 2. startIndex won't change, which means extend to index = i;
        maxEndIndexWhenEndsHere = i;
        if(currentElement > currentElement + maxWhenEndsHere){
            maxWhenEndsHere = currentElement;
            maxStartIndexWhenEndsHere = i;
        }
        else{
            maxWhenEndsHere = currentElement + maxWhenEndsHere;
        }
            
        // the real maximum subarray needs to take either of actions:
        // 1. preserve whereever it is now
        // 2. extend to current point.
        if(maxWhenEndsSomewhere < maxWhenEndsHere){
            maxWhenEndsSomewhere = maxWhenEndsHere;
            maxStartIndexWhenEndsSomewhere = maxStartIndexWhenEndsHere;
            maxEndIndexWhenEndsSomewhere = maxEndIndexWhenEndsHere;
        }
    }

    return [maxStartIndexWhenEndsSomewhere, maxEndIndexWhenEndsSomewhere, maxWhenEndsSomewhere];
}

const test = (array: Array<number>): void => {
    const [startIndex, endIndex, maxSum] = linear(array);
    console.log(
        'The maximum subarray of',
        array,
        'is',
        array.slice(startIndex, endIndex+1),
        'with total sum of',
        maxSum
    );
}

export default test;