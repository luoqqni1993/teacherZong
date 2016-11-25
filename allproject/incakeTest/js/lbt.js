function Slider(_obj,step,_t){
    var _container=document.getElementById("container");
    var _s=document.getElementById("slider");
    var _c=document.getElementById("circle");
    this.images=_obj;
    this.initCss=function(){
        _c.style.width=_c.children.length*25+10+"px";
        _c.style.left=(_container.clientWidth-_c.clientWidth)/2+"px";
        _c.children[0].style.backgroundColor="red";
        _s.style.width=_container.clientWidth*_s.children.length+"px";
    }
    this.createDom=function(){
        var _img=null,_point=null;
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

    var _timer=0,_index=0;
    function pointControl(){
        for(var i=0;i<_c.children.length;i++){
            _c.children[i].style.backgroundColor="#ccc";
        }
        _c.children[_index].style.backgroundColor="red";
    }
    this.leftRun=function(){
        window.clearTimeout(_timer);
        var _step=0;
        var m_l=_container.clientWidth*(_s.children.length-1);//=Slider.clientWidth-800
        var _left=parseInt((_s.currentStyle || window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
        //运动的过程中控制的是Slider,所以要知道Slider的当前left值
        _left=(_left<=-m_l?0:_left);//检查_left是否到达最后一张图。
        _step=Math.abs(_left)%_container.clientWidth;//计算出当前图片所在位置相对Container容器的left值。
        _left=Math.ceil(_left/_container.clientWidth)*_container.clientWidth;//计算出当前图片相对于Container的初始位置
        (function exec(){
            window.clearTimeout(_timer);
            _step+=step;//步长100
            _s.style.left=_left-_step+"px";//_left-_step:(_left:表示当前图片相对于Container的初始状态)+(-_step:当前图片相对Container实际移动的距离);表示当前实际位置。
            if(_step<_container.clientWidth) {
                _timer = window.setTimeout(exec, _t);
            }else{
                _left=parseInt((_s.currentStyle || window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
                _index=Math.abs(_left/_container.clientWidth);
                _index=_index==_c.children.length?0:_index;
                pointControl();
            }
        })();
    }
    this.rightRun=function(){
        window.clearTimeout(_timer);
        var _step=0;
        var m_l=_container.clientWidth*(_s.children.length-1);
        var _left=parseInt((_s.currentStyle || window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
        _left=(_left>=0?-m_l:_left);//判断是否回到第一张
        _step=_container.clientWidth-Math.abs(_left)%_container.clientWidth;//计算当前图片相对于Container的可见的图片的宽度
        _step=_step==_container.clientWidth?0:_step;//检测当前图片是否移动结束,若果已经结束,进行下一张图片移动。
        _left=Math.floor(_left/_container.clientWidth)*_container.clientWidth;//计算当前图片假设已经移动完成,相对Container的left值。
        (function exec(){
            window.clearTimeout(_timer);
            _step+=step;
            _s.style.left=_left+_step+"px";
            if(_step<_container.clientWidth) {
                _timer = window.setTimeout(exec, _t);
            }else{
                _left=parseInt((_s.currentStyle || window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
                _index=Math.abs(_left/_container.clientWidth);
                _index=_index==_c.children.length?0:_index;
                pointControl();
            }
        })();
    }
    this.autoRun=function(){
        var m_l=_container.clientWidth*(_s.children.length-1);
        var _left=0;
        (function exec(){
            window.clearTimeout(_timer);
            _left=parseInt((_s.currentStyle || window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
            _left=(_left<=-m_l?0:_left);
            _s.style.left=_left-step+"px";
            _left=parseInt((_s.currentStyle || window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
            if(_left%_container.clientWidth==0) {
                _index=Math.abs(_left)/_container.clientWidth;
                _index=_index==_c.children.length?0:_index;
                pointControl();
                _timer = window.setTimeout(exec, 2000);
            }else{
                _timer = window.setTimeout(exec, _t);
            }
        })();
    }
    this.circleClick=function(n){
        var m_l=_container.clientWidth*(_s.children.length-1);
        var _left=0;
        (function exec(){
            window.clearTimeout(_timer);
            _left=parseInt((_s.currentStyle || window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
            _left=(_left<=-m_l?0:_left);
            _s.style.left=_left-step+"px";
            _left=parseInt((_s.currentStyle || window.getComputedStyle(_s,null))["left"].replace(/px/g,""));
            console.log(_left+","+_container.clientWidth*n);
            if(_left<=-m_l){
                _left=0;
            }
            if(_left==-_container.clientWidth*n) {
                _index=Math.abs(_left)/_container.clientWidth;
                _index=_index==_c.children.length?0:_index;
                pointControl();
                _timer = window.setTimeout(exec, 2000);
            }else{
                _timer = window.setTimeout(exec, _t);
            }
        })();
    }
}
