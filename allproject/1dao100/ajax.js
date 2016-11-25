function(url,fnWin,fnFail){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=window.XMLHttpRequest;
	}else{
		xhr=new ActiveXObject("Micrsoft XMLHTTP");
	}
	xhr.open("GET",url,true);
	xhr.send();
	xhr.onRecorderStateChange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				if(fnWin){
					fnWin(xhr.responseText);
				}
				if(fnFail){
					fnFail();
				}
			}
		}
	}
}
