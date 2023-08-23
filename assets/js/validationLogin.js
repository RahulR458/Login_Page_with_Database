var emailError = document.getElementById("email_error");
var passwordError = document.getElementById("password_error");
var submitError = document.getElementById("submit_error");

function validateEmail() {
    var email = document.getElementById("user-email").value;
    if (email.length === 0) {
        emailError.innerHTML = "Enter your valid email id";
        document.getElementById("user-email").style.border = '1px solid red';
        return false;
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailError.innerHTML = "Invalid email";
        document.getElementById('user-email').style.border = '1px solid red';
        return false;
    }
    emailError.innerHTML = "";
    document.getElementById('user-email').style.border = '1px solid seagreen';
    return true;
}

function validatePassword() {
    var password = document.getElementById("user_password").value;
    if (password.length === 0) {
        passwordError.innerHTML = "Enter your valid password";
        document.getElementById("user_password").style.border = '1px solid red';
        return false;
    }
    
    if (password.length < 8) {
        passwordError.innerHTML = "Password must be at least 8 characters long";
        document.getElementById('user_password').style.border = '1px solid red';
        return false;
    }

    passwordError.innerHTML = "";
    document.getElementById('user_password').style.border = '1px solid seagreen';
    return true;
}

function validateSubmit() {
    if (!validateEmail() || !validatePassword()) {
        submitError.style.display = "block";
        return false;
    }
    return true;
}
