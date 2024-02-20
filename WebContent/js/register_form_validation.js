const signupUrl = "http://localhost:8080/signup";
const regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const email = get('.email');
const pwd = get('.password');
const signup = get('.signup');
const role = get('.role')
const res1 = get('.signup-group span');
let emailError = '';
let pwdError = '';
let roleError = '';
let emailVal="";
let passwordVal="";
let roleVal = "";

function get(ele){
    return document.querySelector(ele);
}

function clear(){
    email.value = '';
    pwd.value = '';
    role.valur = '';
    emailVal='';
    passwordVal='';
    roleVal = '';
    email.parentNode.className = "input-group email-group";
    pwd.parentNode.className = "input-group password-group";
    role.parentNode.className = "input-group role-group";
    res1.style.display = 'none';
}

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

role.addEventListener('input', (event)=>{
	roleVal = event.target.value;
	
	if(roleError=='Invalid' && roleVal!=""){
		role.parentNode.className = "input-group role-group";
		roleError = '';
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

function roleValidation(){
	let errorMsg = '';
	 if(roleVal==''){
        errorMsg = "Provide a role";
        roleError = 'Invalid'
    }

    if(errorMsg==''){
        role.nextElementSibling.innerHTML = errorMsg;
        return true;  
    }
    else{
        role.parentNode.className = "input-group role-group error";
        role.nextElementSibling.innerHTML = errorMsg;
        return false;
    }
	
}

signup.addEventListener( 'click', (event)=> {
    event.preventDefault();
    let bool = emailValidation();
    let bool1 = pwdValidation();
    let bool2 = roleValidation();

    if(bool && bool1 && bool2){
		let registerData = {
			email : email.value,
			role : role.value,
			password : pwd.value
		}
		signupRequest(registerData);
    }
    else{
        res1.style.display='none';
    }
})

function signupRequest(registerData){
	 let http = new XMLHttpRequest();
	 http.onreadystatechange = function(){
		 if(this.readyState == 4 && this.status == 200){
			 location.href="../html/login_form.html";
			 clear();
		 }else if(this.status == 400){
			 res1.style.display = 'block';
			 res1.innerHTML = this.responseText;
		 }
	 }
	 http.open("POST" , signupUrl , true);
	 http.setRequestHeader("Content-type" , "application/json");
	 http.send(JSON.stringify(registerData))
 }
 