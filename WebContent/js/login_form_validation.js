const signinUrl = "http://localhost:8080/signin";
const email = get('.email');
const pwd = get('.password');
const signin = get('.signin');
const res1 = get('.signin-group span');
let emailError = '';
let pwdError = '';
const regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function get(ele){
    return document.querySelector(ele);
}

function clear(){
    email.value = '';
    pwd.value = '';
    emailVal='';
    passwordVal='';
    email.parentNode.className = "input-group email-group";
    pwd.parentNode.className = "input-group password-group";
    res1.style.display = 'none';
}

let emailVal="";
let passwordVal="";

email.addEventListener('input', (event) => {
    emailVal = event.target.value;

    if((emailError=='Empty' && emailVal!="") || (emailError=='Invalid' && regEx.test(emailVal)==true)){
        email.parentNode.className = "input-group email-group";
        emailError='';
    }
})

pwd.addEventListener('input', (event) => {
    passwordVal = event.target.value;
    
    if((pwdError=='Empty' && passwordVal!="") || 
        (pwdError=='Invalid' && passwordVal.length>=6) || 
        (pwdError=='lowercase' && /[a-z]/.test(passwordVal)==true) || 
        (pwdError=='uppercase' && /[A-Z]/.test(passwordVal)==true) || 
        (pwdError=='number' && /[0-9]/.test(passwordVal)==true) || 
        (pwdError=='special' && /[$@!%*#?&]/.test(passwordVal)==true)){
        pwd.parentNode.className = "input-group password-group";
        pwdError='';
    }
})

function emailValidation(){
    let errorMsg='';

    if(emailVal==''){
        errorMsg = "Provide a email";
        emailError = 'Empty'
    }
    else if(regEx.test(emailVal)==false){
        errorMsg = "Provide a properly formatted email";
        emailError = 'Invalid'
    }

    if(errorMsg==''){
        email.nextElementSibling.innerHTML = errorMsg;
        return true;  
    }
    else{
        email.parentNode.className = "input-group email-group error";
        email.nextElementSibling.innerHTML = errorMsg;
        return false;
    }
}

function pwdValidation(){
    let errorMsg='';
    if(passwordVal==''){
        errorMsg = "Provide a password";
        pwdError = 'Empty'
    }
    else if(passwordVal.length<6){
        errorMsg = "Password min 6 char";
        pwdError = 'Invalid';
    }
    else if(/[a-z]/.test(passwordVal)==false ){ 
        errorMsg = "Password min 1 lowercase";
        pwdError = 'lowercase';
    }
    else if(/[A-Z]/.test(passwordVal)==false){
        errorMsg = "Password min 1 uppercase";
        pwdError = 'uppercase';
    }
    else if(/[0-9]/.test(passwordVal)==false){
        errorMsg = "Password min 1 number";
        pwdError = 'number';
    }
    else if(/[$@!%*#?&]/.test(passwordVal)==false){
        errorMsg = "Password min 1 special char";
        pwdError ='special';
    }

    if(errorMsg==''){
        pwd.nextElementSibling.innerHTML = errorMsg;
        return true;
    }
    else{
        pwd.parentNode.className = "input-group password-group error";
        pwd.nextElementSibling.innerHTML = errorMsg;
        return false;
    }

}

signin.addEventListener( 'click', (event)=> {
    event.preventDefault();
    let bool = emailValidation();
    let bool1 = pwdValidation();

    if(bool && bool1){
		let loginData = {
			email : email.value,
			password : pwd.value
		}
		signinRequest(loginData);
    }
    else{
        res1.style.display='none';
    }
})
 
 function signinRequest(loginData){
	 let http = new XMLHttpRequest();
	  http.onreadystatechange = function(){
		 if(this.readyState == 4 && this.status == 200){
			 let token = "Bearer "+this.responseText;
			 window.sessionStorage.setItem("Authorization",token);
			 location.href = "../html/home.html";	
			 clear();
		 }
		 else if(this.status == 403){
			res1.style.display = 'block';
	        email.parentNode.className = "input-group email-group";
	        pwd.parentNode.className = "input-group password-group";
		 }
	 }
	 http.open("POST" , signinUrl , true);
	 http.setRequestHeader("Content-type" , "application/json");
	 http.send(JSON.stringify(loginData))
 }