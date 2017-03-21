(function () {  // 利用闭包构建工厂函数
	// 1. html结构模板字符串
	let html = `<div class="mask"></div>\
				<div class="floatLayer">\
					<h2>提示</h2>\
					<p>{text}</p>\
					<div class="btn">\
						<button id="sure">确定</button>
						<button id="cancel">取消</button>
					</div>\
				</div>`;

	// 构造函数
	function Layer (text) {
		this.text = text;   // 配置参数

		this.init();   // 创建弹窗对象：分为结构和事件两个部分
	}

	Layer.prototype.init = function () {
		this.initDom();   // 初始化结构

		this.initEvent();  // 初始化事件绑定
	}

	Layer.prototype.initDom = function () {
		let oDiv =document.createElement('div');
		oDiv.innerHTML = html.replace('{text}', this.text);
		// 将DOM节点保存，在显示的时候使用
		this.dom = [oDiv.childNodes[0], oDiv.childNodes[2]];   // 有一个文本节点，之间
	}

	Layer.prototype.initEvent = function () {  
		// 利用冒泡，将事件绑定在浮出层上；回调函数必须绑定当前浮出层组件对象
		
		// 为按钮绑定事件
		this.dom[1].addEventListener('click', function (evt) {
			evt.stopPropagation();
			if(evt.target.getAttribute('id') === 'sure') {  // 如果点确定，隐藏
				this.hide();
			}
			if(evt.target.getAttribute('id') === 'cancel') {  // 如果点取消，隐藏
				this.hide();
			}
		}.bind(this), false);

		// 点击遮罩层，隐藏面板
		this.dom[0].addEventListener('click', function (evt) {
			evt.stopPropagation();
			this.hide();
		}.bind(this), false);

		// 鼠标在标题按下时，触发拖拽函数；松开时，移除拖拽函数
		this.drag();
		
	}	

	// 显示弹窗
	Layer.prototype.show = function () {   // 将DOM节点添加到页面中
		this.dom.forEach(function (ele) {
			document.body.appendChild(ele);
		});
	}
	// 隐藏弹窗
	Layer.prototype.hide = function () {   // 移除组件的所有节点
		let oParent = document.body;
		let mask = document.getElementsByClassName('mask')[0];
		let floatLayer = document.getElementsByClassName('floatLayer')[0];

		oParent.removeChild(mask);
		oParent.removeChild(floatLayer);
	}

	// 拖拽面板：鼠标移入标题时，可以拖拽面板
	// Layer.prototype.drag = function (evt, node) {
	// 	let disX = evt.clientX - node.offsetLeft;     // 触发事件时鼠标的x坐标 - 面板中心距离面板左侧的距离 = 面板距离屏幕左侧的距离
	// 	let disY = evt.clientY - node.offsetTop;

	// 	let move = function (evt) {
	// 		// 边界处理：如果disX小于0: 使其强制等于0
	// 		let moveLeft = evt.clientX - disX + 'px';
	// 		let moveRight = evt.clientY - disY + 'px';

	// 		node.style.left = evt.clientX - disX + 'px';   // 移动的距离
	// 		node.style.top = evt.clientY - disY + 'px';   // 移动的距离

	// 	}
	// 	document.addEventListener('mousemove', move, false);  // 在document上绑定鼠标移动监听事件
	// 	document.addEventListener('mouseup', function () {
	// 		document.removeEventListener('mousemove', move);
	// 	}, false);
	// };
	
	Layer.prototype.drag = function () {
		let self = this.dom[1];

		this.dom[1].childNodes[1].addEventListener('mousedown', (function (evt) {
			let disX = evt.clientX - self.offsetLeft;     // 触发事件时鼠标的x坐标 - 面板中心距离面板左侧的距离 = 面板距离屏幕左侧的距离
			let disY = evt.clientY - self.offsetTop;

			let move = function (evt) {
				// 边界处理：如果鼠标打面板的宽度offsetLeft 大于鼠标距离屏幕的宽度，将其距离置为0
				// 
				let moveLeft = evt.clientX - disX;
				let moveTop = evt.clientY - disY;
				
				// 因为居中时使用translate(-50%, -50%)，所以实际的offsetLeft与看见的offsetLeft不一致，需要减去元素宽度的一半

				// if(moveLeft + 300 < 0) {
				// 	moveLeft = 0;
				// }
				// if(moveTop + 160 < 0) {
				// 	moveTop = 0;
				// }

				self.style.left = moveLeft + 'px';   // 移动的距离
				self.style.top = moveTop + 'px';   // 移动的距离

			}
			document.addEventListener('mousemove', move, false);  // 在document上绑定鼠标移动监听事件
			document.addEventListener('mouseup', function () {
				document.removeEventListener('mousemove', move);
			}, false);
		}).bind(self), false);
	};	
	
	window.Layer = Layer;
})();