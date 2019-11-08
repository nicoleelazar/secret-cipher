const userMsg = document.getElementById("userMessage");
const decodedMsg = document.getElementById("decodedMessage");
let options = document.getElementById("rotations");

let rotationAmount;


window.addEventListener('DOMContentLoaded', (event) => {
    userMsg.value = "";
    decodedMsg.value = "";

    options.value = 13;
    rotationAmount = 13;
});




// Show decoded message
function showMsg() {
    decodedMsg.value = rotCipher(userMsg.value);
}
userMsg.addEventListener('input', showMsg);


// Change rotation value according to selection
function chosenOption() {
    console.log(options.value);

    rotationAmount = Number(options.value);

    decodedMsg.value = rotCipher(userMsg.value);
}
options.addEventListener('change', chosenOption);



// Decoding Logic
function rotCipher(str) {
    let decodedWord = "";
    let decodedAscii;
    for (let i = 0; i < str.length; i++) {
        let ascii = str[i].charCodeAt()


        if (ascii >= 65 && ascii <= 90) {
            decodedAscii = ascii + rotationAmount;
            if (decodedAscii > 90) {
                decodedWord += String.fromCharCode(decodedAscii - 26);
            } else {
                decodedWord += String.fromCharCode(decodedAscii);
            }
        } else if (ascii >= 97 && ascii <= 122) {
            decodedAscii = ascii + rotationAmount;
            if (decodedAscii > 122) {
                decodedWord += String.fromCharCode(decodedAscii - 26);
            } else {
                decodedWord += String.fromCharCode(decodedAscii);
            }
        } else if (ascii < 65 || ascii > 122 || ascii >= 91 && ascii <= 96) {
            decodedWord += str[i];
        }

    }

    return decodedWord;
}