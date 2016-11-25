function ajax(url,fnWin,fnFaild){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest;
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//链接服务器
	xhr.open("GET",url,false);
	//发送请求
	xhr.send();
	//返回数据
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				if(fnWin){
					fn(xhr.responseText);
				}
			}else{
				if(fnFaild){
					fnfaild();
				}
			}
		}	
	}
}
