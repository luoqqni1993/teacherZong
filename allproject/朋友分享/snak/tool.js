//js获取行内样式  obj是对象  attr是属性
/*
	因为两个参数都要传值，所以参数不用处理，也可以做个判断，如果两个参数没有全部传入的话，直接return。
	这里和其他兼容问题一样，看浏览器是否支持这个方法。
*/
	function getStyle(obj,attr){
		if(obj.currentStyle){
			getStyle = function(obj,attr){
				return Number(parseFloat(obj.currentStyle[attr]).toFixed(5));
			}
			return Number(parseFloat(obj.currentStyle[attr]).toFixed(5));
		}else{
			getStyle = function(obj,attr){
				return Number(parseFloat(getComputedStyle(obj,null)[attr]).toFixed(5));
			}
			return Number(parseFloat(getComputedStyle(obj,null)[attr]).toFixed(5));
		}
	}


//定时器的封装
/*使用 var stop = setTime(function(){
		if(xxx){
			stop()  你想什么时候停止计时器就调用stop()
		}
	},1000,document.getElementById("box"));
*/
function setTime(func,interval,target){
	target.fun = func;
	var flag = true;
	setTimeout(function(){
		target.fun();
		if(flag){
			setTimeout(arguments.callee,interval);
		}
	},interval);
	return function(){
		flag = false;
	}
}


//获取一个随机数
//使用：setRandom(min,max)
function setRandom(min,max){
	return Math.round(Math.random()*(max-min))+min;
}



//toast
//使用  var toast = new Toast();     toast.show("谢谢",ckb)
//第一个参数：toast显示的字符   可传
//第三个参数: 回调函数	可传
function Toast(str,cbk){
	this.init = function(){
		this.str = str||"未命名";
		this.div = document.createElement("div");
	}
	this.style = function(){
		with(this.div.style){
			width = "60px";
			height = "30px";
			backgroundColor = "#333";
			opacity = "1";
			borderRadius = "3px";
			position = "absolute";
			left = "50%";
			top = "50%";
			textAlign = "center";
			lineHeight = "30px";
			color="white";
			fontSize = "15px";
			marginLeft = -30+"px";
			marginTop = -15+"px";

		}
		this.div.innerHTML = this.str;
	}
	this.dim = function(){
		var self = this;
		this.callback = cbk;
		this.deg = 0;
		this.timer = setInterval(function(){
			self.deg+=5;
			if(self.deg>=90){
				self.callback?self.obj.callback():"";
				clearInterval(self.timer);
			}
			var now = getStyle(self.div,"opacity");
			var speed = Math.sin(Math.PI/180*self.deg)*(-now);
			self.div.style.opacity = now+speed;
			self.div.style.opacity = "filter:alpha(opacity = "+ (now+speed)*100 + ")";
			
		},300)
	}
	this.show = function(){
		this.init();
		document.body.appendChild(this.div);
		this.style();
		this.dim();
		return this;	
	}


}