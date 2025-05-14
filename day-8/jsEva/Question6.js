// 6. Rearrange Fruits


const fruits = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grapes", "Strawberry", "Watermelon", "Peach", "Kiwi"];

function rearrangeFruits(fruits){
    let fourEl = fruits.slice(fruits.length - 4, fruits.length);
    let firsEl = fruits.slice(0, fruits.length -4)

    res = [...fourEl, ...firsEl];

    console.log(res);
}

// console.log(rearrangeFruits(fruits));
rearrangeFruits(fruits)