// Hello and welcome to my 03-challenge-password-generator JavaScript code!

// First things first I got the button to 'work', i.e. start the cascade of functions below 
const element = document.getElementById("generate");
element.addEventListener("click", writePassword);

// Second I defined most of my variables, I like having them at the top
var passwordLength;
var passwordLC;
var passwordUC;
var passwordNum;
var passwordSpecialChar;
var passwordGen = '';

// I also put all possible password character options in arrays to use later
var LCs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var UCs = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var specialChars = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "?", "!", "."];

// Getting right into it, I formulated a single function to get all the password options. 
function getPasswordOptions() {
  passwordLength = parseInt(window.prompt("First, choose your password length (8-128 characters)"));
    if (Number.isNaN(passwordLength)) {
    alert("Password length must be a number silly goose!")
    return null;
  }
  if (passwordLength <8 || passwordLength >128) {
    alert("Password length must be between 8-128 characters.")
    return null;
  }
// The other password options were collected as follows. 
  passwordLC = confirm("Click OK if you would like lower case letters included in your password")
  passwordUC = confirm("Click OK if you would like upper case letters included in your password")
  passwordNum = confirm("Click OK if you would like numbers included in your password")
  passwordSpecialChar = confirm("Click OK if you would like special characters included in password")
// Wonderful, but if the user does not select ANY of the options, there will be nothing to make the pass with! 
    // We have to make sure they select at least 1 type of character:
  if (
    passwordLC === false && 
    passwordUC === false &&
    passwordNum === false &&
    passwordSpecialChar === false) {
      alert("Must select at least 1 character type!!")
      return null;
    }
// So, if they select none, this is an error so the function stops running. The user must restart.
// Once we have the user selections, we can store the password options as an object:
  var passwordOptions = {
    length: passwordLength,
    passwordLC: passwordLC,
    passwordUC: passwordUC,
    passwordNum: passwordNum,
    passwordSC: passwordSpecialChar,
  }
  return passwordOptions;
}

// I wrote up a randomization function to use when concatenating password options.
function randomize(arr) {
  var randomIndex = Math.floor(Math.random()*arr.length)
  var randomElement = arr[randomIndex]
  return randomElement;
}

// makePassword function: here I'm using the results of the getPasswordOptions fcn to concat a password.
// 1. I made sure the password contained at least 1 character of the types the user chose - guaranteedChars - by pushing them into the password
// 2. once all guaranteedChars were added, I joined all the array elements to make a single password string
function makePassword() {
  var options = getPasswordOptions()
  var result = []
  var possibleChars = []
  var guaranteedChars = []
  if (options.passwordLC) {
    possibleChars = possibleChars.concat(LCs)
    guaranteedChars.push(randomize(LCs))
  }
  if (options.passwordUC) {
    possibleChars = possibleChars.concat(UCs)
    guaranteedChars.push(randomize(UCs))
  }
  if (options.passwordNum) {
    possibleChars = possibleChars.concat(numbers)
    guaranteedChars.push(randomize(numbers))
  }
  if (options.passwordSC) {
    possibleChars = possibleChars.concat(specialChars)
    guaranteedChars.push(randomize(specialChars))
  }
  for (var i = 0; i < options.length; i++) {
    var possibleChar = randomize(possibleChars)
    result.push(possibleChar);
  }
  for (var i = 0; i < guaranteedChars.length; i++) {
    result[i] = guaranteedChars[i];
  }
  return result.join("")
}

//Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//Write password to the #password input
function writePassword() {
  var password = makePassword();
  var passwordText = document.querySelector("#password");
// et voila!
  passwordText.value = password;
}
