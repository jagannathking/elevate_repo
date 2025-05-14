// 4. Deep Copy of an Object

const obj = {
    name: "John",
    address: {
        city: "New York",
        zip: 10001
    }
};

function deepCopy(obj) {
   
    let res = JSON.parse(JSON.stringify(obj))

    return res;
}



const copy = deepCopy(obj);
console.log(copy);