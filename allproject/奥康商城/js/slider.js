function Slider(_obj,step,_t){
	var oLbt=document.getElementById("lbt");
	var _s=document.getElementById("slider");
	var _c=document.getElementById("circle");
	this.images=_obj;
	//创建css属性方法
	this.initCss=function(){
		_c.style.width=_c.children.length*14+10+"px";
		_c.style.left=(oLbt.clientWidth-_c.clientWidth)/2+"px";
		_c.children[0].style.background="red";
		_s.style.width=oLbt.clientWidth*_s.children.length+"px";
	}
	//创建节点属性方法
	this.createDom=function(){
		var _img=null;
		var _point=null;
		for(var key in this.images){
			_img=document.createElement("img");
			_img.src=this.images[key];
			_s.appendChild(_img);
			_point=document.createElement("span");
			_c.appendChild(_point);
		}
		_img=document.createElement("img");
		_img.src=this.images["img1"];
		_s.appendChild(_img);
	}
	//创建控制颜色的函数
	var _timer=0;
	var _index=0;
	function pointControl(){
		for(var i=0;i<_c.children.length;i++){
			_c.children[i].style.background="#ccc";
		}
		_c.children[_index].style.background="red";
	}
	//创建向左移动的方法
	this.leftRun=function(){
		window.clearTimeout(_timer);
		var=_left=parseInt((_s.currentStyle||window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
		var _m_l=oLbt.clientWidth*(_s.children.length-1);
		_left=(_left<_m_l ? 0 : _left);
		_step=Math.abs(_left%oLbt.clientWidth);
		_left=Math.ceil(_left/oLbt.clientWidth)*oLbt.clientWidth;
		(function exec(){
			window.clearTimeout(_timer);
			_step+=step;
			_s.style.left=_left-_step+"px";
			if(_step<oLbt.clientWidth){
				setTimeout(exec,_t);
			}else{
				_left=parseInt((_s.currentStyle||window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
				_index=Math.abs(_left/oLbt.clientWidth);
				_index=_index==_c.children.length ? 0 : _index;
				pointControl();
			}
		})();
		
		
	}
	//创建向右移动的方法
	this.rightRun=function(){
		_left=_s.currentStyle||getComputedStyle(_s,true)[left].replace(/px/g,"");
		_m_l=oLbt*(_s.children.length-1);
	}
	//创建自动移动的方法
	this.autoRun=function(){
		
	}
	//创建点击移动的方法
	this.circleControl=function(){
		
	}
}

