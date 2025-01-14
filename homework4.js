/* 
   Name: Thi Dang 
   File: homework4.js
   Created: 11/10/24 
   Last Edited: 12/04/24 
   Description: Homework 4 JavaScript 
*/

// Display today's date
var currentDateElement = document.getElementById("currentDate");
var currentDate = new Date().toLocaleDateString();
currentDateElement.innerHTML = currentDate;

// Update pain level display
document.getElementById("Slider").addEventListener("input", function() {
    var painLevel = this.value;
    document.getElementById("painValue").textContent = painLevel;
});

// Display form input values
function displayInput() {
    var formContents = new FormData(document.forms[0]);
    var formOutput = "<table class='output'><thead><tr><th colspan='2'>Your Information</th></tr></thead><tbody>";
    
    for (var [key, value] of formContents.entries()) {
        var input = document.querySelector(`[name="${key}"]`);
        var type = input.type;

        if (type === "checkbox" && !input.checked) continue;
        if (type === "radio" && !input.checked) continue;
        
        switch (type) {
            case "checkbox":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>&#x2713;</td></tr>`;
                break;
            case "file":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${value.name}</td></tr>`;
                break;
            case "password":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${"*".repeat(value.length)}</td></tr>`;
                break;
            default:
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${value}</td></tr>`;
                break;
        }
    }
    
    document.getElementById("reviewArea").innerHTML = formOutput + "</tbody></table>";
}

// Validate User ID
function validateUserID() {
    var userIDInput = document.getElementById("userID");
    var userID = userIDInput.value.toLowerCase();
    var userIDError = document.getElementById("userIDError");
    userIDError.textContent = "";

    if (userID.length < 5 || userID.length > 30) {
        userIDError.textContent = "ERROR: Username must be between 5 and 30 characters.";
        return false;
    }
    if (!isNaN(userID.charAt(0))) {
        userIDError.textContent = "ERROR: Username cannot start with a number.";
        return false;
    }
    var userIDPattern = /^[a-z0-9_-]+$/;
    if (!userIDPattern.test(userID)) {
        userIDError.textContent = "ERROR: Username can only contain letters, numbers, underscores, or dashes.";
        return false;
    }
    return true;
}

// Validate Password
function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordError = document.getElementById("passwordError");
    var userID = document.getElementById("userID").value.toLowerCase();

    passwordError.textContent = ""; 
    var isValid = true;  

    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

    if (password.length < 8) {
        passwordError.textContent = "ERROR: Password must be at least 8 characters long.";
        isValid = false;
    } else if (!passwordPattern.test(password)) {
        passwordError.textContent = "ERROR: Password must include at least one uppercase letter, one lowercase letter, and one digit.";
        isValid = false;
    } else if (password.toLowerCase() === userID) {
        passwordError.textContent = "ERROR: Password cannot be the same as the Username.";
        isValid = false;
    }

    return isValid;
}

// Validate Password Match
function validatePasswordMatch() {
    var password = document.getElementById("password").value;
    var reEnteredPassword = document.getElementById("re_password").value;
    var passwordMatchError = document.getElementById("passwordMatchError");

    passwordMatchError.textContent = ""; 
    var isValid = true;  

    if (password !== reEnteredPassword) {
        passwordMatchError.textContent = "ERROR: Passwords do not match.";
        isValid = false;
    }

    return isValid;
}

// Validate First Name
function validateFirstName() {
    var firstName = document.getElementById("firstName").value;
    var firstNameError = document.getElementById("firstNameError");
    firstNameError.textContent = "";
    var namePattern = /^[A-Za-z'-]+$/;

    if (!namePattern.test(firstName)) {
        firstNameError.textContent = "ERROR: Please enter a valid first name (letters, apostrophes, and dashes only).";
        return false;
    }
    return true;
}

// Validate Middle Initial
function validateMiddleInitial() {
    var middleInitial = document.getElementById("middleInitial").value;
    var middleInitialError = document.getElementById("middleInitialError");
    middleInitialError.textContent = "";

    if (middleInitial && !/^[A-Za-z]$/.test(middleInitial)) {
        middleInitialError.textContent = "ERROR: Middle initial must be a single letter.";
        return false;
    }
    return true;
}

// Validate Last Name
function validateLastName() {
    var lastName = document.getElementById("lastName").value;
    var lastNameError = document.getElementById("lastNameError");
    lastNameError.textContent = "";
    var lastNamePattern = /^[A-Za-z' -]{1,30}$/;

    if (!lastNamePattern.test(lastName)) {
        lastNameError.textContent = "ERROR: Please enter a valid last name (1 to 30 characters, letters, apostrophes, dashes only).";
        return false;
    }
    return true;
}

// Validate Date of Birth
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

// Format the SSN as XXX-XX-XXXX
function formatSSN() {
    var ssnInput = document.getElementById("ssn");
    var ssnError = document.getElementById("ssnError");
    
    // Remove non-digit characters and limit to the first 9 digits
    var input = ssnInput.value.replace(/\D/g, "").slice(0, 9);
    
    // Format the SSN as XXX-XX-XXXX
    ssnInput.value = input.length > 0 ? 
        input.slice(0, 3) + (input.length > 3 ? "-" + input.slice(3, 5) : "") + 
        (input.length > 5 ? "-" + input.slice(5, 9) : "") 
        : "";
    
    // Validate the format and show an error if necessary
    ssnError.textContent = input.length === 9 && !/^\d{3}-\d{2}-\d{4}$/.test(ssnInput.value) 
        ? "ERROR: Please enter a valid SSN in the format XXX-XX-XXXX." 
        : "";
}

// Validate SSN
function validateSSN() {
    var ssnInput = document.getElementById("ssn");
    var ssnError = document.getElementById("ssnError");
    
    // Remove non-digit characters and check if the length is exactly 9
    var valid = ssnInput.value.replace(/\D/g, "").length === 9;

    // Display error if not valid
    ssnError.textContent = valid ? "" : "ERROR: SSN must be exactly 9 digits.";
    
    return valid;
}

// Combine formatting and validation
function formatAndValidateSSN() {
    formatSSN();  // Format the SSN
    return validateSSN();  // Validate the SSN and return the result
}


// Validate Address 1
function validateAddress() {
    var addressInput = document.getElementById("address1");
    var addressError = document.getElementById("addressError");
    var address = addressInput.value.trim();

    if (address.length < 2 || address.length > 30) {
        addressError.textContent = "ERROR: Address must be between 2 and 30 characters.";
        addressInput.setCustomValidity("Address must be between 2 and 30 characters.");
    } else {
        addressError.textContent = "";
        addressInput.setCustomValidity(""); 
    }
    return addressError.textContent === "";
}

// Validate City
function validateCity() {
    var cityInput = document.getElementById("city");
    var cityError = document.getElementById("cityError");
    var city = cityInput.value.trim();

    if (city.length < 2 || city.length > 30) {
        cityError.textContent = "ERROR: City must be between 2 and 30 characters.";
        cityInput.setCustomValidity("City must be between 2 and 30 characters.");
    } else {
        cityError.textContent = "";
        cityInput.setCustomValidity(""); 
    }
    return cityError.textContent === "";
}

// Validate Zip Code
function validateZipCode() {
    var zipCode = document.getElementById("zipCode").value.trim();
    var zipCodeError = document.getElementById("zipCodeError");
    zipCodeError.textContent = ""; 

    if (!/^\d{5}$/.test(zipCode)) {
        zipCodeError.textContent = "ERROR: Please enter a valid 5-digit Zip Code.";
        return false;
    }

    return true;
}

// Validate Email
function validateEmail() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    emailError.textContent = "";
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "ERROR: Please enter a valid email address (name@domain.tld).";
        return false;
    }

    return true;
}

// Format the phone number as xxx-xxx-xxxx
function formatPhoneNumber() {
    var phoneInput = document.getElementById("phoneNumber");
    var input = phoneInput.value.replace(/\D/g, "").slice(0, 10); 

    // Apply the format xxx-xxx-xxxx
    phoneInput.value = input.length > 0 ? 
        input.slice(0, 3) + (input.length > 3 ? "-" + input.slice(3, 6) : "") + 
        (input.length > 6 ? "-" + input.slice(6, 10) : "") 
        : "";
}

// Validate phone number (check if it's exactly 10 digits)
function validatePhoneNumber() {
    var phoneInput = document.getElementById("phoneNumber");
    var phoneError = document.getElementById("phoneError");

    var valid = phoneInput.value.replace(/\D/g, "").length === 10;

    phoneError.textContent = valid ? "" : "ERROR: Please enter a valid 10-digit phone number.";
    
    return valid;
}

// Combine both formatting and validation
function formatAndValidatePhoneNumber() {
    formatPhoneNumber();  
    return validatePhoneNumber();  
}

document.getElementById("phoneNumber").addEventListener("input", formatAndValidatePhoneNumber);
document.getElementById("ssn").addEventListener("input", formatAndValidateSSN);

// Check All Fields' Validity
function checkFormValidity() {
    let isValid = true;

    // Validate all fields and check if any return false
    isValid &= validateUserID();
    isValid &= validatePassword();
    isValid &= validatePasswordMatch();
    isValid &= validateFirstName();
    isValid &= validateMiddleInitial();
    isValid &= validateLastName();
    isValid &= dobValidation();
    isValid &= validateSSN();
    isValid &= validateAddress();
    isValid &= validateCity();
    isValid &= validateZipCode();
    isValid &= validateEmail();
    isValid &= validatePhoneNumber();

    if (isValid) {
        alert("Form is valid!");
        window.location.href = "homework4-thankyou.html";  // Redirect to thank you page
    } else {
        alert("Form contains errors. Please fix them and try again.");
    }

    return isValid;
}

// Add Event Listener for the Validate Button
document.getElementById("validateBtn").addEventListener("click", checkFormValidity);

// Function to set a cookie with an optional expiration date (in hours)
function setCookie(name, value, hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); 
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(`Cookie set: ${name}=${value} (expires in ${hours} hours)`);
}

// Function to get a cookie by name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to delete a cookie by name
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    console.log(`Cookie deleted: ${name}`);
}

var inputs = [
    {id: "userID", cookieName: "userID"},
    {id: "firstName", cookieName: "firstName"},
    {id: "middleInitial", cookieName: "middleInitial"},
    {id: "lastName", cookieName: "lastName"},
    {id: "dateOfBirth", cookieName: "dateOfBirth"},
    {id: "address1", cookieName: "address1"},
    {id: "address2", cookieName: "address2"},
    {id: "city", cookieName: "city"},
    {id: "zipCode", cookieName: "zipCode"},
    {id: "email", cookieName: "email"},
    {id: "phoneNumber", cookieName: "phoneNumber"}
];

function isRememberMeChecked() {
    return document.getElementById("rememberMe").checked;
}

// Load the stored values from cookies into the form inputs ONLY if "Remember Me" is checked
window.onload = function() {
    console.log('Page loaded');

    // Check if the "Remember Me" checkbox is checked
    var firstName = getCookie("firstName");
    if (firstName) {
    // Show welcome message if firstName cookie exists
        document.getElementById("welcomeMessage").innerText = "Welcome back, " + firstName + "!";
        document.getElementById("resetLink").innerText = "Not " + firstName + "? Click here to start as a NEW USER.";
        document.getElementById("resetLink").style.display = "block";  // Show the link

        // Load all cookies into the form if "Remember Me" is checked
            if (isRememberMeChecked()) {
            inputs.forEach(function(input) {
                var storedValue = getCookie(input.cookieName);
                if (storedValue) {
                    document.getElementById(input.id).value = storedValue;
                    console.log(`Loaded cookie: ${input.cookieName}=${storedValue}`);
                }
            });
        }
    } else {
        // If no "firstName" cookie, show default message
        document.getElementById("welcomeMessage").innerText = "Welcome New User!";
        document.getElementById("resetLink").style.display = "none";  
}
};

// Save form data to cookies ONLY if "Remember Me" is checked
inputs.forEach(function(input) {
var inputElement = document.getElementById(input.id);

    inputElement.addEventListener("input", function() {
        if (isRememberMeChecked()) {
            setCookie(input.cookieName, inputElement.value, 48); 
        } else {
            deleteCookie(input.cookieName); 
        }
    });
});

// Handle form submission (to save form data and greeting message)
document.getElementById("userForm").onsubmit = function(event) {
    event.preventDefault(); // 
    console.log('Form submitted');

    var firstName = document.getElementById("firstName").value;

    // Check if "Remember Me" is checked and save or delete cookies accordingly
    if (isRememberMeChecked()) {
        if (firstName) {
        setCookie("firstName", firstName, 48); 
    }

        // Store all other cookies with 48-hour expiration
        inputs.forEach(function(input) {
            var value = document.getElementById(input.id).value;
            setCookie(input.cookieName, value, 48);
        });

        // Display personalized greeting
        document.getElementById("welcomeMessage").innerText = "Welcome back, " + firstName + "!";
        document.getElementById("resetLink").innerText = "Not " + firstName + "? Click here to start as a NEW USER.";
    } else {
        // If "Remember Me" is unchecked, clear all cookies related to the form fields
        inputs.forEach(function(input) {
            deleteCookie(input.cookieName); 
        });

        // Display personalized greeting
        document.getElementById("welcomeMessage").innerText = "Welcome New User!";
        document.getElementById("resetLink").style.display = "none";  
    }

    // Redirect to the thank you page
    window.location.href = "homework4-thankyou.html"; 
};

// Reset form and cookies when clicking "Not [first name]? Click here to start as a NEW USER."
document.getElementById("resetLink").addEventListener("click", function() {
    console.log('Reset link clicked, clearing cookies and form');

                            
    inputs.forEach(function(input) {
        deleteCookie(input.cookieName); 
    });

    inputs.forEach(function(input) {
        document.getElementById(input.id).value = ''; 
    });

    document.getElementById("welcomeMessage").innerText = "Welcome New User!";
                       
    document.getElementById("resetLink").style.display = "none";

    document.getElementById("rememberMe").checked = false;
});