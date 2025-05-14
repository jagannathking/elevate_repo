// 1. Count Vowels and Consonants


function countVowelsAndConsonants(str){
   
    str.toLowerCase(str);
    
    function isVowel(s){
        
        let vow = 'aeiou';
       

        if(vow.includes(s)){
            return true;
        }else {
            return false;
        }
    }
   
   function isCon(s) {
         let con = 'bcdfghjklmnpqrstvwxyz'

        if(con.includes(s)){
            return true
        }else{
            return false
        }
    }
    let countVow = 0;
    let countCon = 0;

    for(let i = 0; i < str.length; i++) {

        if(isVowel(str[i])){
          countVow++
        }else if(isCon(str[i])){
            countCon++
        }
    }

    console.log("Vowel", countVow)
    console.log("Cons", countCon)
}


const result = countVowelsAndConsonants("Hello World!");
