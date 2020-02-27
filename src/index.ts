import App from './app';
import Heap from './sortings/heap-sort/heap-sort';

///////////////////////////////////////////////////////////////////////////////////////
/// Initial params

const app = new App({
    sort: [3, 4, 7, 2, 5, 1, 6, 9, 0, 8]
});

///////////////////////////////////////////////////////////////////////////////////////
/// Test

const array = [7, 9, 13, 11, 8, 5, 13, 11, 12];
// app.sort.insertionSort();
// app.sort.insertionSort(array);
// app.sort.selectionSort();
// app.sort.selectionSort(array);
// app.sort.mergeSort();
// app.sort.mergeSort(array);
// app.problem.maximumSubarray.divideAndConquer(
//     [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7]
// );
// app.problem.maximumSubarray.divideAndConquer(
//     [-2,1,-3,4,-1,2,1,-5,4]
// );
// app.problem.maximumSubarray.dynamicProgramming(
//     [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7]
// );
// app.problem.maximumSubarray.dynamicProgramming(
//     [-2,1,-3,4,-1,2,1,-5,4]
// );

const heap = new Heap(array);
heap.heapSort();
heap.printHeap();