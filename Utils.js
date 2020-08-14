/**
 * Name: Light JavaScript tools library.
 * Author: Luanhualiang
 * Time: 2015/02/15
 * Latest update: 2016/02/10
 */
//define(function(require,exports,module){
(function(){
	if(window.MGB){
		return;
	}

	window.MGB = {};  //挂载全局对象
	/*--------------------------------------->Dom Begin<-------------------------------------*/
	if(typeof MGB.dom !== "object"){
		MGB.dom = {
			//根据ID获取DOM对象
			getById:function(id){
				return id?document.getElementById(id):document;
			},

			//根据标签名获取DOM对象
			getByTag:function(tag){
				return tag?document.getElementsByTagName(tag):document;
			},

			//根据父节点对象和class名获取DOM对象
			getByClass:function(parent,claName){
				var parent = parent || document;
				if(parent.getElementsByClassName){
					return parent.getElementsByClassName(claName);
				}	
				var	elements=parent.getElementsByTagName('*');
				var eles=[];
				for(var i=0,len=elements.length;i<len;i++){
					if(elements[i].className == claName){
						eles.push(elements[i]);
					}
				}
				return eles;
			},

			//获取元素样式中的某个样式属性值
			getStyle:function(elem,name){
				if(elem.style[name]){
					return elem.style[name];
				}else if(elem.currentStyle){
					return elem.currentStyle[name];
				}else if(document.defaultView && document.defaultView.getComputedStyle){
					name = name.replace(/([A-Z])/g,"-$1");
					name = name.toLowerCase();
					var s = document.defaultView.getComputedStyle(elem,"");
					return s&&s.getPropertyValue(name);
				}else{
					return null;
				}
			},

			//获取元素的左边框距离整个文档左边界的距离
			getParentLeft:function(elem){
				var actualLeft=elem.offsetLeft,
					parent=elem.offsetParent; //获取元素的父元素
				while(parent != null){
					actualLeft+=parent.offsetLeft;
					parent=parent.offsetParent;
				}
			return actualLeft;
			},

			//获取元素的上边框距离整个文档上边界的距离
			getParentTop:function(elem){
				var actualTop=elem.offsetTop,
					parent=elem.offsetParent; //获取元素的父元素
				while(parent != null)
				{
					actualTop+=parent.offsetTop;
					parent=parent.offsetParent;
				}
				return actualTop;
			},

			//获取浏览器可视区域的高度
			getViewH: function(){
				return document.documentElement.clientHeight || document.body.clientHeight;
			},

			//获取浏览器可视区域的宽度
			getViewW: function(){
				return document.documentElement.clientWidth || document.body.clientWidth;
			},

			//获取文档的实际高度
			getDocH: function(){
				return document.documentElement.scrollHeight || document.body.scrollHeight;
			},

			//获取文档的实际宽度,一般等于可视区域的宽度
			getDocW: function(){
				return document.documentElement.scrollWidth || document.body.scrollWidth;
			},

			//获取滚动条的垂直滚动高度
			getScroT: function(){
				return document.documentElement.scrollTop || document.body.scrollTop;
			},

			getScroL: function(){
				return document.documentElement.scrollLeft||document.body.scrollLeft;
			},

			//滚动到顶部
			scroToTop : function(speed){
				var nowScroY = document.documentElement.scrollTop || document.body.scrollTop;
				if(nowScroY > 0 ){
					var	timer = setInterval (function(){
						nowScroY = document.documentElement.scrollTop || document.body.scrollTop,
						speed = speed ? speed : 3; 
						plus = Math.ceil(nowScroY / speed);
						document.documentElement.scrollTop = document.body.scrollTop = nowScroY - plus;
						if(nowScroY == 0){
							clearInterval(timer);
						}
					},50);
				}
			},

			//寻找下一个兄弟节点并排除空的文本节点
			nextNode:function(node){//参数为当前节点的nextSibling
				if(!node){
					return;
				}else if(node.nodeType == 1){
					return node;
				}else if(node.nextSibling){
					return this.nextNode(node.nextSibling);
				}
			},

			//寻找上一个兄弟节点并排除空的文本节点
			prevNode:function(node){//参数为当前节点的nextSibling
				if(!node){
					return;
				}else if(node.nodeType == 1){
					return node;
				}else if(node.previousSibling){
					return this.prevNode(node.previousSibling);
				}
			}
		};
	}

	/*--------------------------------------->DOM End<--------------------------------------------*/
	/*o_o---------------------------------------o_o--------------------------------------------o_o*/
	/*-------------------------------------->Event Begin<-----------------------------------------*/

	if(typeof MGB.evt !== "object"){
		MGB.evt = {
			//添加事件
			addHandler:function(elem,type,handler){
				if(elem.addEventListener){
					elem.addEventListener(type,handler,false);
				}else if(elem.attachEvent){
					elem.attachEvent('on'+type,handler);
				}else{
					elem['on'+type]=handler;
				}
			},

			//为未来的元素添加事件
			delegateEvent:function(target,type,fn){
				this.addHandler(document,type,function(e){
					if(e.target.nodeName == target.toUpperCase()){
						fn.call(e.target);
					}
				});
			},

			//移除事件
			removeHandler:function(elem,type,handler){
				if(elem.removeEventListener){
	            	elem.removeEventListener(type,handler,false);
	          	}else if(elem.detachEvent){
	            	elem.detachEvent("on" + type,handler);
	          	}else{
	          		elem["on" + type] = null;
	          }
			},

			//取得Event对象
			getEvent:function(event){
				return event ? event : window.event;
			},

			//取得触发事件的目标元素
			getTarget:function(event){
				event = this.getEvent();
				return event.target || event.srcElement;
			},

			//阻止默认事件
			preventDefault:function(event){
				if(event.preventDefault){
					event.preventDefault();
				}else{
					event.returnValue = false;
				}
			},

			//阻止事件冒泡
			stopPropagation:function(event){
				if(event.stopPropagation){
					event.stopPropagation();
				}else{
					event.cancalBubble = true;
				}
			},

			//获取键盘事件中哪个键被按下
			getKeyCode:function(event){
				return event.keyCode || event.which;
			},

			//鼠标事件中的button值检测
			getButton:function(event){
				if(document.implementation.hasFeature("MouseEvents","2.0")){//IE9+
					return event.button;
				}else{//IE8 earlier
					switch(event.button){
						case 0:
						case 1:
						case 3:
						case 5:
						case 7:
							return 0;
						case 2:
						case 6:
							return 2;
						case 4:
							return 1;
					}
				}
			},

			//添加鼠标滚轮滚动事件
			addWheelHandler:function(document,scrollFun){
				if(document.addEventListener){//FF
					var type = "DOMMouseScroll";
					document.addEventListener(type,scrollFun,false);
				}else if(document.attachEvent){//IE
					var type = "onmousewheel";
					document.attachEvent(type,scrollFun);
				}
			}
		};
	}

	/*----------------------------------------->Event End<----------------------------------------*/
	/*o_o-----------------------------------------o_o------------------------------------------o_o*/
	/*----------------------------------------->Img Begin<----------------------------------------*/

	if(typeof MGB.img !== 'object'){
		MGB.img = {
			isComplete: function(imgObj){
				if(!imgObj.complete){
					return false;
				}
				if(typeof img.naturalWidth != "undefined" && img.naturalWidth == 0){
					return false;	
				}
				return true;
			},

			preLoad: function(imgArr){
				var imgArray = new Array(imgArr.length);
				for(var i=0;i<imgArr.length;i++){
					imageArray[i] = new Image();
					imageArray[i].src = imgArr[i];
				}
			}
		};
	}

	/*------------------------------------------>Img End<-----------------------------------------*/
	/*o_o-----------------------------------------o_o------------------------------------------o_o*/
	/*---------------------------------------->Cookie Begin<--------------------------------------*/
	if(typeof MGB.cookie !== 'object'){
		MGB.cookie = {
			set: function(key,value,exp,path,domain){
				if(window.localStorage){
					localStorage.setItem(key,value);
				}else{
					var str = key + "=" + encodeURIComponent(value);
					if (expires != null || expires != '') {
						if (expires == 0) {expires = 100*365*24*60;}
						var exp = new Date();
						exp.setTime(exp.getTime() + expires*60*1000);
						str += "; expires=" + exp.toGMTString();
					}
					if (path) {
						str += "; path=" + path;
					}
					if (domain) {
						str += "; domain=" + domain;
					}
					document.cookie = str;
				}
			},

			get: function(key){
				if(window.localStorage){
					return localStorage.getItem(key);
				}else{
					var v = document.cookie.match('(?:^|;)\\s*' + key + '=([^;]*)');
					return v ? decodeURIComponent(v[1]) : null;
				}
			},

			del: function(key,path,domain){
				if(window.localStorage){
					localStorage.removeItem(key);
				}else{
					document.cookie = key + "=" + ((path) ? "; path=" + path : "") +
						((domain) ? "; domain=" + domain : "") +
						"; expires=Thu, 01-Jan-70 00:00:01 GMT";
				}
			}
		};
	}

	/*---------------------------------------->Cookie End<----------------------------------------*/
	/*o_o-----------------------------------------o_o------------------------------------------o_o*/
	/*---------------------------------------->RegExp Begin<--------------------------------------*/
	if(typeof MGB.regExp !== 'object'){
		MGB.regExp = {
			isDate: function(str){
				var reg = /^[\u4E00-\u9FFF]+$/;
				return reg.test(str);
			},

			isEmail: function(str){
				var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				return reg.test(str);
			},

			isIdCard: function(str){
				var reg = /^(\d{14}|\d{17})(\d|[xX])$/;
				return reg.test(str);
			},

			isPhoneNum: function(str){
				var reg = /^0*(13|14|15|18)\d{9}$/;
				return reg.test(str);
			},

			isTelNum: function(str){
				var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
				return reg.test(str);
			},

			isUrl: function(str){
				var reg = /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
				return reg.test(str);
			}
		};
	}
})();
	
	//module.exports = MGB;
//});
