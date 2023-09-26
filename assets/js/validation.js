nameError = document.getElementById("name-error")
emailError = document.getElementById("email-error")
submitError = document.getElementById("submit-error")
genderError = document.getElementById("gender-error")
statusError = document.getElementById("status-error")
passwordError = document.getElementById("password-error")
confirmPasswordError = document.getElementById("confirmPassword-error")

function validateName(){
    var name = document.getElementById("user-name").value;
    if(name.length === 0){
        nameError.innerHTML = "Name is required";
        document.getElementById('user-name').style.border = '1px solid red'
        return false
    }
    if(name.length < 3){
        nameError.innerHTML = "Minimun 3 characters required";
        document.getElementById('user-name').style.border = '1px solid red'
        return false
    }
    if(!name.match(/^[A-Za-z]*[A-Za-z]*(\s{1,}[A-Za-z]*)*$/)){
        nameError.innerHTML = "Invalid Name";
        document.getElementById('user-name').style.border = '1px solid red'
        return false
    }
    nameError.innerHTML = "";
    // nameError.innerHTML = "<i class='bx bxs-check-circle'></i>";
    document.getElementById('user-name').style.border = '1px solid seagreen'
    return true;
}

function validateEmail(){
    var email = document.getElementById("user-email").value;
    if(email.length === 0){
        emailError.innerHTML = "Email is required";
        document.getElementById("user-email").style.border = '1px solid red'
        return false
    }
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        emailError.innerHTML = "Invalid email"
        document.getElementById('user-email').style.border = '1px solid red'
        return false
    }
    emailError.innerHTML = ""
    // emailError.innerHTML = "<i class='bx bxs-check-circle'></i>";
    document.getElementById('user-email').style.border = '1px solid seagreen'
    return true;
}

function validatePassword(){
    let password = document.getElementById("user-password").value;
    if(password.length === 0){
        passwordError.innerHTML = "Enter your valid password";
        document.getElementById("user-password").style.border = '1px solid red';
        return false;
    }if(password.length < 8){
        passwordError.innerHTML = "Password must be at least 8 characters";
        document.getElementById('user-password').style.border = '1px solid red';
        return false;
    }
    passwordError.innerHTML = "";
    document.getElementById('user-password').style.border = '1px solid seagreen';
    return true;

}

function validateConfirmPassword(){
    const password = document.getElementById("user-password").value;
    const confirmPassword = document.getElementById("user-confirmPassword").value;
    if(password !== confirmPassword){
        confirmPasswordError.innerHTML = "Password is not matched";
        document.getElementById('user-confirmPassword').style.border = '1px solid red';
        return false;
    }
    confirmPasswordError.innerHTML = "";
    document.getElementById('user-confirmPassword').style.border = '1px solid seagreen';
    return true;
}

function validateForm(){
    if(!validateEmail() || !validateName() || !validatePassword() || !validateConfirmPassword()){
        submitError.style.display = "block"
        submitError.innerHTML = "Please fill all the fields";
        return false
    }
    var gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        genderError.innerHTML = 'Please select a gender.';
        return false; 
      }else{
        genderError.innerHTML = ''
      }
    var status = document.querySelector('input[name="status"]:checked');
    if (!status) {
        statusError.innerHTML = 'Please select a status.';
        return false; 
      }else{
        statusError.innerHTML = ''
      }
      
      submitError.innerHTML = "";
      return true
}