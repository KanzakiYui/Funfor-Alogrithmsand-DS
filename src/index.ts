// https://code.visualstudio.com/docs/typescript/typescript-tutorial
import Person from './Person';

const Greeter  = (person: Person) => {
    console.log(person.name);

    console.log(person.age);
};

const person = {
    name: 'Lee',
    age: 17,
    alive: true,
    point: [1, 3, 5, 7],
    comments: [['Hello Word', 'Welcome'], ['There is nothing', 'to say']]
};

Greeter(person);

