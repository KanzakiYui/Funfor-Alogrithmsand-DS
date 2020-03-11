import App from './app';

///////////////////////////////////////////////////////////////////////////////////////
/// Initial params

const app = new App({
    sort: [3, 4, 7, 2, 5, 1, 6, 9, 0, 8]
});

///////////////////////////////////////////////////////////////////////////////////////
/// Test

const array = [2, 3, -1, 0, 2, 4, -2, 5, 3, -2, 0, 1];
app.sort.countingSort(array);
app.sort.countingSort();