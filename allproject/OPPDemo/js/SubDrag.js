function SubDrag(id){
	Drag.call(this,id);
}
for(var i in Drag.prototype){
	SubDrag.prototype[i]=Drag.prototype[i];
}
SubDrag.prototype.fnMove=function(evt){
	var e=evt||window.event;
	var X=e.clientX-this.iLeft;
	var Y=e.clientY-this.iTop;
	if(X<0){
		X=0;
	}else if(X>document.documentElement.clientWidth-this.oDiv.offsetWidth){
		X=document.documentElement.clientWidth-this.oDiv.offsetWidth;
	}
	if(Y<0){
		Y=0;
	}else if(Y>document.documentElement.clientHeight-this.oDiv.offsetHeight){
		Y=document.documentElement.clientHeight-this.oDiv.offsetHeight;
	}
	this.oDiv.style.left=X+'px';
	this.oDiv.style.top=Y+'px';
}
