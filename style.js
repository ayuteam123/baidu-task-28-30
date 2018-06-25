window.onload=function(){
	var input=document.getElementById("email-input");
	input.focus(); //一开始自动获取光标
	input.addEventListener("keyup",function(e){
		if(e.keyCode==13){
			choose();
		}else if(e.keyCode==38||e.keyCode==40){
			change(e);
		}else{
		  	addInfo();
	        toggleSug();			
		}
	});
};

function getInfo(){
	//获取用户输入
	var input=document.getElementById("email-input").value;
	return input;
}


function showInfo(){
	//将获取到的用户输入和每一个postFix整合成一个新数组，需要去除空格
	//只取@前面的做用户输入信息
	var input=getInfo();
	var postFix=['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
	//遍历postFix，将用户输入与每一个postFix结合生成一个li
	var sugLi=[];
	for(let i=0;i<postFix.length;i++){
	   if(input.trim()){
	   	//去除两侧空格之后还有
	   	if(input.trim().indexOf('@')>=0){
	   		var sug=input.trim().split('@')[0]+'@'+postFix[i];
	   		var postFixSug=input.trim().split('@')[1];
	   		if(postFixSug){
	   			if(postFix[i].indexOf(postFixSug)>=0){
	   				sugLi.push(sug);
	   			}
	   		}else{
	   			sugLi.push(sug);
	   		}
	   	}else{
	   		var sug=input.trim()+'@'+postFix[i];
	   		sugLi.push(sug);
	   	}
	   }
    }
	return sugLi;
}

function addInfo(){
	//将生成的提示框内容添加到email-sug-wrapper中
	var input=document.getElementById("email-input");
	var sugLi=showInfo();
	var sugDom=document.getElementById("email-sug-wrapper");
	sugDom.innerHTML=""; //需要清空上一次添加的li列表
    for(let i=0;i<sugLi.length;i++){
    	let templi=document.createElement("LI");
    	templi.innerHTML=sugLi[i];
    	templi.className="sug-li"
    	sugDom.appendChild(templi);
    	templi.addEventListener("mouseover",function(){
    		this.classList.add('mouse-active');
    	});
    	templi.addEventListener("mouseleave",function(){
    		this.classList.remove('mouse-active');
    	});
    	templi.addEventListener("click",function(){
    		var text=this.innerText;
    		input.value=text;
    		this.parentNode.style.display="none";
    		input.focus();
    	});
    	if(i==0){
    		templi.classList.add('active-li');
    	}
	}
}

function toggleSug(){
	//控制提示框的隐藏显示状态
	var input=document.getElementById("email-input").value;
	var sugDom=document.getElementById("email-sug-wrapper");
	if(input==""){
     sugDom.style.display="none";
	}else{
		sugDom.style.display="block";
	}
}

function choose(){
	//当按下回车键触发
	var sugDom=document.getElementById("email-sug-wrapper");
	var input=document.getElementById("email-input");
	if(sugDom.children){
		var sugLi=sugDom.children;
		for(let i=0;i<sugLi.length;i++){
			if (sugLi[i].classList.contains('active-li')){
				input.value=sugLi[i].innerText;
				sugDom.style.display="none";
				input.focus();
			}
		}
	}else{
		return;
	}
}

function change(e){
	var sugDom=document.getElementById("email-sug-wrapper");
	var input=document.getElementById("email-input");
	if(sugDom.children){
		var sugLi=sugDom.children;
		for(let i=0;i<sugLi.length;i++){
			if (sugLi[i].classList.contains('active-li')){
				if(e.keyCode==40){
					let chose=i+1>sugLi.length-1?0:i+1;
					sugLi[chose].classList.add('active-li');
					sugLi[i].classList.remove('active-li');
					return;
				}else{
					let chose=i-1<0?sugLi.length-1:i-1;
					sugLi[chose].classList.add('active-li');
					sugLi[i].classList.remove('active-li');
					return;
				}
			}
		}
	}
}

String.prototype.trim=function(){
　　return this.replace(/(^\s*)|(\s*$)/g, "");
}