// 3. Palindrome Check

function isPalindrome(str){
    
    let s = str.trim().split('').reverse().join('');
   
    if(s === str){
        console.log("true")
    }else{
        console.log("false");
    }
    
}



const result = isPalindrome("A man, a plan, a canal, Panama");
// console.log(result);