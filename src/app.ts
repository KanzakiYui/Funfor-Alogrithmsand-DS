import Sortings from './sortings';
import Problems from './problems';

///////////////////////////////////////////////////////////////////////////////////////
/// Interface of App instance initial params
interface Parameters {
    sort: Array<Number> | Array<String>
};

class App {
    public param: Parameters;

    constructor(param?: Parameters){
        this.param = param;
    }

    /*
        Allow this.param as default param for methods if don't explicitly provide
        arugment(s), while display in some simply-formatted way.
    */ 
    private preprocessSortings = () : typeof Sortings => {
        let result = Sortings;
        for(let key in result){
            const func = result[key];
            const name = key.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
            result[key] = value => {
                const input = Array.from(value || this.param.sort);
                const stringLeft = `${name} [${input}]`.padEnd(40, ' ')
                console.log(`\n${stringLeft} to\t\t [${func(input)}]\n`);
            }
        }
        return result;
    }

    // expose all sorting methods
    public sort = this.preprocessSortings()
    public problem = Problems

}

export default App;