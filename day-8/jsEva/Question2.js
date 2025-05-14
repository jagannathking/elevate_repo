// 2. Reverse Words in a String


function reverseWords(string) {

    let str = string.split(' ');
    let rev = '';
    

    for (let i = 0; i < str.length; i++) {

        let s = str[i].split('');
        let firstRev = '';

        if (str !== ' ') {
            for (let j = s.length - 1; j >= 0; j--) {
                firstRev += s[j]
            }
          
        }

        rev += firstRev;
        rev += ' '
    }

    console.log(rev);
}



const result = reverseWords("JavaScript is fun");