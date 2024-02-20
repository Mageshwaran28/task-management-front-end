const token = window.sessionStorage.getItem("Authorization");
const getUserNameUrl = "http://localhost:8080/users";
const userName = getElement("header .userName");
const projectEle = getElement("section article .projects");
const taskEle = getElement("section article .tasks");


function getElement(selector){
	return document.querySelector(selector);
}

let http = new XMLHttpRequest();

http.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		userName.innerHTML = this.responseText
	}
}

http.open("GET", getUserNameUrl , true);
http.setRequestHeader("Authorization",token);
http.send();


