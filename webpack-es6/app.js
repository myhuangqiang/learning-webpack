import 'babel-polyfill';

let name = "Bob";
let func = () => {
    console.log('hell webpack!');
}
let arr = [1, 2, 3]

arr.includes(2)

let newArr = arr.map(item => item * 2)

console.log('new Set(newArr);', new Set(newArr));