function Drag(id){
			var _this=this;
			this.oDiv=document.getElementById(id);
			this.iLeft=0;
			this.iTop=0;
			this.X=0;
			this.Y=0;
			this.oDiv.onmousedown=function(evt){
					_this.fnDown(evt);
			}
		}
		Drag.prototype.fnUp=function(){
					document.onmousemove=null;
				}
		Drag.prototype.fnMove=function(evt){
					var e=evt||window.event;
					this.X=e.clientX;
					this.Y=e.clientY;
					this.oDiv.style.left=this.X-this.iLeft+'px';
					this.oDiv.style.top=this.Y-this.iTop+'px';
				};
		Drag.prototype.fnDown=function(evt){
				var _this=this;
				var e=evt||window.event;
				this.iLeft=e.offsetX;
				this.iTop=e.offsetY;
				document.onmousemove=function(evt){
					_this.fnMove(evt);
				};
				document.onmouseup=function(){
					_this.fnUp();
				}
			};
			window.onload=function(){
				new Drag("box");
				new Drag("box1");
			}