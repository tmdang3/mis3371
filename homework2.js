/* 
   Name: Thi Dang 
   File: homework2.js
   Created: 10/01/24 
   Last Edited: 10/19/24 
   Description: Homework 2 JavaScript 
*/

// Display today's date
const currentDateElement = document.getElementById("currentDate");
const currentDate = new Date().toLocaleDateString();
currentDateElement.innerHTML = currentDate;

// Update pain level display
document.getElementById("Slider").addEventListener("input", function() {
    const painLevel = this.value;
    document.getElementById("painValue").textContent = painLevel;
});

// Display form input values
function displayInput() {
    const formContents = document.forms[0];
    let formOutput = "<table class='output'><th colspan='2'>Your Information</th>";

    for (const input of formContents.elements) {
        if (input.value && input.type !== "submit" && input.type !== "reset") {
            let valueToDisplay;

            switch (input.type) {
                case "checkbox":
                    if (input.checked) {
                        valueToDisplay = "&#x2713;";
                    }
                    break;
                case "radio":
                    if (input.checked) {
                        valueToDisplay = input.value;
                    }
                    break;
                case "file":
                    if (input.files.length > 0) {
                        valueToDisplay = input.files[0].name;
                    }
                    break;
                case "password":
                    if (input.id === "ssn") {
                        valueToDisplay = "*".repeat(input.value.length);
                    }
                    break;
                default:
                    valueToDisplay = input.value;
                    break;
            }

            if (valueToDisplay) {
                formOutput += `<tr><td align='right'>${input.name}</td><td class='outputdata'>${valueToDisplay}</td></tr>`;
            }
        }
    }

    document.getElementById("reviewArea").innerHTML = formOutput + "</table>";
}

// Validate user ID
function validateUserID() {
    const userIDInput = document.getElementById("userID");
    const userID = userIDInput.value.toLowerCase();
    const userIDError = document.getElementById("userIDError");
    userIDError.textContent = "";

    if (userID.length < 5 || userID.length > 30) {
        userIDError.textContent = "ERROR: Username must be between 5 and 30 characters.";
        return false;
    }
    if (!isNaN(userID.charAt(0))) {
        userIDError.textContent = "ERROR: Username cannot start with a number.";
        return false;
    }
    const userIDPattern = /^[a-z0-9_-]+$/;
    if (!userIDPattern.test(userID)) {
        userIDError.textContent = "ERROR: Username can only contain letters, numbers, underscores, or dashes.";
        return false;
    }
    userIDInput.value = userID.toLowerCase();
    document.getElementById("correctedUsername").textContent = userIDInput.value;

    return true;
}


// Validate Password
function validatePassword() {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");
    passwordError.textContent = "";
    const isValid = true;  // Initialize the flag

    // Pattern to check for at least one lowercase, one uppercase, and one digit (no special characters required)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

    // Check if the password meets the minimum length requirement
    if (password.length < 8) {
        passwordError.textContent = "ERROR: Password must be at least 8 characters long.";
        isValid = false;
    }

    // Check if the password contains at least one lowercase, one uppercase, and one digit
    if (!passwordPattern.test(password)) {
        passwordError.textContent = "ERROR: Password must include at least one uppercase letter, one lowercase letter, and one digit.";
        isValid = false;
    }

    // Check if the password is the same as the userID (username), ignoring case
    const userID = document.getElementById("userID").value.toLowerCase();
    if (password.toLowerCase() === userID) {
        passwordError.textContent = "ERROR: Password cannot be the same as the Username.";
        isValid = false;
    }

    return isValid;  // Return the validation flag
}

// Validate Password Match
function validatePasswordMatch() {
    const password = document.getElementById("password").value;
    const reEnteredPassword = document.getElementById("re_password").value;
    const passwordMatchError = document.getElementById("passwordMatchError");
    passwordMatchError.textContent = "";

    const isValid = true;  

    if (password !== reEnteredPassword) {
        passwordMatchError.textContent = "ERROR: Passwords do not match.";
        isValid = false;
    }

    return isValid;  
}

// Validate first name
function validateFirstName() {
    const firstName = document.getElementById("firstName").value;
    const firstNameError = document.getElementById("firstNameError");
    firstNameError.textContent = "";
    const namePattern = /^[A-Za-z'-]+$/;

    if (!namePattern.test(firstName)) {
        firstNameError.textContent = "ERROR: Please enter a valid first name (letters, apostrophes, and dashes only).";
        return false;
    }
}

// Validate Middle Initial
function validateMiddleInitial() {
    const middleInitial = document.getElementById("middleInitial").value;
    const middleInitialError = document.getElementById("middleInitialError");
    middleInitialError.textContent = "";

    if (middleInitial && !/^[A-Za-z]$/.test(middleInitial)) {
        middleInitialError.textContent = "ERROR: Middle initial must be a single letter.";
        return false;
    }
    return true;
}

// Validate last name
function validateLastName() {
    const lastName = document.getElementById("lastName").value;
    const lastNameError = document.getElementById("lastNameError");
    lastNameError.textContent = "";
    const lastNamePattern = /^[A-Za-z' -]{1,30}$/;

    if (!lastNamePattern.test(lastName)) {
        lastNameError.textContent = "ERROR: Please enter a valid last name (1 to 30 characters, letters, apostrophes, dashes only).";
        return false;
    }
}

// Validate date of birth
function dobValidation() {
    const dob = document.getElementById("dateOfBirth").value;
    const date = new Date(dob);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 120);
    const error = document.getElementById("dob-error");
    error.textContent = "";

    if (date > new Date()) {
        error.textContent = "ERROR: Date cannot be in the future.";
        return false;
    } else if (date < maxDate) {
        error.textContent = "ERROR: Date cannot be more than 120 years ago.";
        return false;
    }

    return true;
}

// Validate email
function validateEmail() {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");
    emailError.textContent = "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "ERROR: Please enter a valid email address (name@domain.tld).";
        return false;
    }
}

// Validate phone number
function validatePhoneNumber() {
    const phoneNumber = document.getElementById("phone").value;
    const phoneError = document.getElementById("phoneError");
    phoneError.textContent = "";
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if (!phonePattern.test(phoneNumber)) {
        phoneError.textContent = "ERROR: Please enter only numbers. Use xxx-xxx-xxxx format with dashes.";
        return false;
    }
}
