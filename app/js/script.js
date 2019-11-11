const userMsg = document.getElementById("userMessage");
const resultMsg = document.getElementById("resultMessage");
let options = document.getElementById("rotations");

const encodeButton = document.querySelector(".encodeButton");
const decodeButton = document.querySelector(".decodeButton");

let rotationAmount;
let encoding = true;



// On page load clear fields, set rotation 13 as default value and default selectied option
window.addEventListener('DOMContentLoaded', (event) => {
    userMsg.value = "";
    resultMsg.value = "";

    options.value = 13;
    rotationAmount = 13;
});


// toggle for buttons to run encode or decode functions + change input already in text area

encodeButton.addEventListener('click', () => {
    encoding = true;
    resultMsg.value = rotCipherEncode(userMsg.value);
    console.log('ENCODE btn pressed')
});
decodeButton.addEventListener('click', () => {
    encoding = false;
    resultMsg.value = rotCipherDecode(userMsg.value);
    console.log('Decode btn pressed')
});



// Show decoded message in results text area
function showMsg() {

    if (encoding) {
        resultMsg.value = rotCipherEncode(userMsg.value);
    } else {
        resultMsg.value = rotCipherDecode(userMsg.value);
    }
}
userMsg.addEventListener('input', showMsg);


// Change rotation value (changes existing text input) according to selected option
function chosenOption() {
    console.log(options.value);

    rotationAmount = Number(options.value);

    if (encoding) {
        resultMsg.value = rotCipherEncode(userMsg.value);
    } else {
        resultMsg.value = rotCipherDecode(userMsg.value);
    }
}
options.addEventListener('change', chosenOption);




// Encoding Logic
function rotCipherEncode(str) {
    let encodedWord = "";
    let encodedAscii;
    for (let i = 0; i < str.length; i++) {
        let ascii = str[i].charCodeAt()

        if (ascii >= 65 && ascii <= 90) {
            encodedAscii = ascii + rotationAmount;
            if (encodedAscii > 90) {
                encodedWord += String.fromCharCode(encodedAscii - 26);
            } else {
                encodedWord += String.fromCharCode(encodedAscii);
            }
        } else if (ascii >= 97 && ascii <= 122) {
            encodedAscii = ascii + rotationAmount;
            if (encodedAscii > 122) {
                encodedWord += String.fromCharCode(encodedAscii - 26);
            } else {
                encodedWord += String.fromCharCode(encodedAscii);
            }
        } else if (ascii < 65 || ascii > 122 || ascii >= 91 && ascii <= 96) {
            encodedWord += str[i];
        }

    }

    return encodedWord;
}



// Decoding Logic
function rotCipherDecode(str) {
    let decodedWord = "";
    let decodedAscii;
    for (let i = 0; i < str.length; i++) {
        let ascii = str[i].charCodeAt()


        if (ascii >= 65 && ascii <= 90) {
            decodedAscii = ascii - rotationAmount;
            if (decodedAscii < 65) {
                decodedWord += String.fromCharCode(decodedAscii + 26);
            } else {
                decodedWord += String.fromCharCode(decodedAscii);
            }
        } else if (ascii >= 97 && ascii <= 122) {
            decodedAscii = ascii - rotationAmount;
            if (decodedAscii < 97) {
                decodedWord += String.fromCharCode(decodedAscii + 26);
            } else {
                decodedWord += String.fromCharCode(decodedAscii);
            }
        } else if (ascii < 65 || ascii > 122 || ascii >= 91 && ascii <= 96) {
            decodedWord += str[i];
        }

    }

    return decodedWord;
}