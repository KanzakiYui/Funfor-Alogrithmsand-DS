import App from './app';

////////////////////////////////////////////////////////////////////////////
/// Initial params

const app = new App({
    sort: [3, 4, 7, 2, 5, 1, 6, 9, 0, 8]
});

////////////////////////////////////////////////////////////////////////////
/// Test

const array = [7, 9, 13, 11, 8, 5, 13, 11, 12];;
// app.sort.insertionSort();
// app.sort.insertionSort(array);
// app.sort.selectionSort();
// app.sort.selectionSort(array);
app.sort.mergeSort();
app.sort.mergeSort(array);