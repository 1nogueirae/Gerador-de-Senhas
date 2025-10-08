let passwordLength = 16;

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value;
    document.getElementById("password-length-text").innerHTML = passwordLength
    generatePassword();
})

const inputEl = document.querySelector("#password");

let hasUppercase = true;
let hasNumbers = true;
let hasSymbols = true;

function generatePassword() {
    const chars = "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]";
    const lowercase = "abcdefghjklmnpqrstuvwxyz";
    const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numbers = "123456789";
    const symbols = "?!@&*()[]";

    let password = "";
    let newCharIsValid = false;
    let newChar = "";

    for (let i = 0; i < passwordLength; i++) {

        newChar = pickRandomCharFrom(chars);

        while (!newCharIsValid) {
            if (hasUppercase && uppercase.includes(newChar)) {
                newCharIsValid = true;
            } else if (hasNumbers && numbers.includes(newChar)) {
                newCharIsValid = true;
            } else if (hasSymbols && symbols.includes(newChar)) {
                newCharIsValid = true;
            } else if (lowercase.includes(newChar)) {
                newCharIsValid = true;
            } else {
                newChar = pickRandomCharFrom(chars);
            }
        }
        if (newCharIsValid) {
            password += newChar;
        }
        newCharIsValid = false;
    }
    inputEl.value = password;
}

function pickRandomCharFrom(str) {
    const randomIndex = Math.floor(Math.random() * str.length);
    return str[randomIndex];
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const uppercaseEl = document.getElementById("uppercase-check");
const numbersEl = document.getElementById("numbers-check");
const symbolsEl = document.getElementById("symbol-check");

uppercaseEl.addEventListener("change", () => {
    hasUppercase = uppercaseEl.checked
    generatePassword();
})

numbersEl.addEventListener("change", () => {
    hasNumbers = numbersEl.checked;
    generatePassword();
});
symbolsEl.addEventListener("change", () => {
    hasSymbols = symbolsEl.checked;
    generatePassword();
});


document.querySelector("#copy-1").addEventListener('click', copy);
document.querySelector("#copy-2").addEventListener('click', copy);

document.querySelector("#renew").addEventListener('click', generatePassword);

generatePassword();