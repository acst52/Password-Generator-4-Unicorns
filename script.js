//Assignment code here


//Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//Write password to the #password input
function writePassword() {
  var password = makePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

const element = document.getElementById("generate");
element.addEventListener("click", writePassword);

//Second lets define all our variables up here:

var passwordLength;
var passwordLC;
var passwordUC;
var passwordNum;
var passwordSpecialChar;
var passwordGen = '';

var LCs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var UCs = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var specialChars = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "?", "!", "."];

function getPasswordOptions() {
  passwordLength = parseInt(window.prompt("First, choose your password length (8-128 characters)"));
  if (Number.isNaN(passwordLength)) {
    alert("Password length must be a number")
    return null;
  }
  if (passwordLength <8 || passwordLength >128) {
    alert("Password length must be between 8-128 characters.")
    return null;
  }
  passwordLC = confirm("Click OK if you would like lower case letters")
  passwordUC = confirm("Click OK if you would like upper case letters")
  passwordNum = confirm("Click OK if you would like numbers")
  passwordSpecialChar = confirm("Click OK if you would like special characters")
  if (
    passwordLC === false && 
    passwordUC === false &&
    passwordNum === false &&
    passwordSpecialChar === false) {
      alert("Must select at least 1 character type")
      return null;
    }
  // store password options as object:
  var passwordOptions = {
    length: passwordLength,
    passwordLC: passwordLC,
    passwordUC: passwordUC,
    passwordNum: passwordNum,
    passwordSC: passwordSpecialChar,
  }
  return passwordOptions;
}

function randomize(arr) {
  var randomIndex = Math.floor(Math.random()*arr.length)
  var randomElement = arr[randomIndex]
  return randomElement;
}

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