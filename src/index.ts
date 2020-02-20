import App from './app';

////////////////////////////////////////////////////////////////////////////
/// Initial params

const app = new App({
    sort: [3, 4, 7, 2, 5, 1, 6, 9, 0, 8]
});

////////////////////////////////////////////////////////////////////////////
/// Test

const array = [5, 2, 4, 6, 1, 3];
app.sort.insertionSort();
app.sort.insertionSort(array);
app.sort.selectionSort();
app.sort.selectionSort(array);