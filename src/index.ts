import Sortings from './sortings';

// interface of App instance initial params
interface Parameters {
    // temporarily assume all sorting methods use the same types of parameters
    sort: Array<Number | String>
};

class App {
    // Declaration
    public param: Parameters;
    // Constructor
    constructor(param?: Parameters){
        this.param = param;
    }
    // Preprocess, allow this.param as default param for methods
    private preprocess = () : typeof Sortings => {
        let result = Sortings;
        for(let key in result){
            const func = result[key];
            result[key] = value => console.log(func(value || this.param.sort))
        }
        return result;
    }
    // expose all sorting methods
    public sort = this.preprocess()
}

const app = new App({
    sort: [3, 4, 7, 2, 5, 1, 6]
});

////////////////////////////////////////////////////////////////////////////
/// Test

const array = [5, 2, 4, 6, 1, 3];
app.sort.insertionSort();
app.sort.insertionSort(array);