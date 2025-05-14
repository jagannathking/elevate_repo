// Merge Objects

function mergeObjects(obj1, obj2){

    res = {...obj1, ...obj2}

    return res;
}


const obj1 = { name: "John", age: 30 };
const obj2 = { age: 40, city: "New York" };

const result = mergeObjects(obj1, obj2);
console.log(result);
// Output: { name: "John", age: 40, city: "New York" }