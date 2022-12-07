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

// Getting right into it, I, with help from my tutor, formulated a single function to get all the password options. 
    // I had previously collected them in separate functions.
// The first user input is how many characters they want their password to be:
function getPasswordOptions() {
  passwordLength = parseInt(window.prompt("First, choose your password length (8-128 characters)"));
    // parseInt, above, is a function that will convert the user's answers, which are strings, into integers. 
        // Above they entered a number, but for the rest of the password options below, they will be clicking Ok - T, or Cancel - F, 
            // so these will be transformed into integers. 
    // .isNaN, below, is a method that determines whether a value is an illegal number: Not-a-Number. 
        // It returns T if the value is type=number, and equates to NaN. Otherwise it returns F.
    if (Number.isNaN(passwordLength)) {
    alert("Password length must be a number silly goose!")
    return null;
    // return null: indicates absense of meaningful return value; that fcn has finished executing and has nothing ELSE to return. 
        // Also used to end a fcn call in the middle of execution to prevent further exec if an error has occurred.
  }
  if (passwordLength <8 || passwordLength >128) {
    alert("Password length must be between 8-128 characters.")
    return null;
  }
// The other password options were collected as follows. 
// Note the confirm fcn displays a dialog box with 2 options, Ok - confirm fcn returns true, & Cancel - confirm fcn returns F.
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
// Once we have the user selections, we can store the password options as an object. See ***NOTES*** at end of code!
  var passwordOptions = {
    length: passwordLength,
    passwordLC: passwordLC,
    passwordUC: passwordUC,
    passwordNum: passwordNum,
    passwordSC: passwordSpecialChar,
  }
  return passwordOptions;  // this returns all the passwordOptions as an object. To use when we makePassword.
}

// I wrote up a randomization function to use when concatenating the password options. See ***NOTES*** at end of code.
function randomize(arr) {
  var randomIndex = Math.floor(Math.random()*arr.length)
  var randomElement = arr[randomIndex]
  return randomElement;
}

// makePassword function: here I'm using the results of the getPasswordOptions fcn to concat a password. See ***NOTES***
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

// Below is code that was provided with assignment file:

//Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//Write password to the #password input
function writePassword() {
  var password = makePassword();
  var passwordText = document.querySelector("#password");
// et voila!
  passwordText.value = password;
}



// ***NOTES***
// On OBJECTS:
  // Storing user selections as objects in JavaScript allows for easier manipulation and organization of data. 
  // Objects are a great way to store related data and can be easily accessed and changed as needed. 
  // It also makes it easier to keep track of user selections, as they can be easily retrieved by accessing the object. 
  // This makes data more organized and easier to work with.

// On RANDOMIZE fcn:
  // This code defines a function called "randomize" which takes in an array - arr - as an argument. 
  // The function then creates a variable called "randomIndex" which is equal to a randomly generated number from 0 up to the length of the arr. 
  // The function then creates a variable called "randomElement" which is equal to the element of the arr at the randomIndex. 
  // Finally, the function returns the randomElement.

// On makePassword function:
  // This code creates a password based on a set of user-defined options. 
  // It begins by defining two variables, "options" and "result." 
  // It then creates three additional variables, "possibleChars," "guaranteedChars," and "i," which will be used to iterate over the options. 
  // The code then checks whether the user has selected lowercase letters, uppercase letters, numbers, and special characters, 
      // and adds them to the "possibleChars" and "guaranteedChars" arrays. 
  // It then uses a loop to randomly select characters from the "possibleChars" array and add them to the "result" array. 
  // Finally, it replaces the randomly selected characters in the "result" array with the characters in the "guaranteedChars" array. 
  // The code then returns the resulting string.