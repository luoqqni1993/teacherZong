function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var stop=true;
		for(var attr in json){
			var cur=0;
			if(attr=="opacity"){
				cur=parseInt(parseFloat(getStyle(obj,attr))*100)
			}else{
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/8;
			speed=speed>0 ? Math.ceil(speed) : Math.floor(speed);
			if(cur!=json[attr]){
				stop=false;
			}
			if(attr=="opacity"){
				obj.style.filter="alpha(opacity="+(cur+speed)+")";
				obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[attr]=cur+speed+"px";
			}
		}
		if(stop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},30)
}
