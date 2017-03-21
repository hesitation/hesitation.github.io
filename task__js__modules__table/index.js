function $ (args) {
	return document.querySelector('args');
}
// function render(arr, nodeType) {
// 	let str = '';
// 	arr.forEach(function(value) {
// 		str += `<{nodeType}>` + value + `</{nodeType}>`
// 	});
// }

// 工厂模式
(function () {
	function Table(config) {
		// 保存配置
		this.config = config;
		// 初始化对象
		this.init();
	};

	Table.prototype.init = function () {
		this.initDom();	  // 初始化HTML结构

		this.initEvent();  // 绑定事件
	};

	Table.prototype.initDom =  function () {
		let data = this.config.data;
		let theadStr = '';
		let tbodyStr = '';

		// 渲染thead：根据sortSwitch判断是否需要渲染span
		data.thead.forEach(function (value, index) {
			if(data.sortSwitch[index] === 1) {
				theadStr += '<th data-id="' + index + '">' + value + '<span></span></th>';
			} else {
				theadStr += '<th data-id="' + index + '">' + value + '</th>';
			}
		});

		for(row in data.tbody) {
			let eachRow = '';
			data.tbody[row].forEach(function (value) {
				eachRow += '<td>' + value + '</td>';
			});

			tbodyStr += '<tr>' + eachRow + '</tr>';
		}

		let oThead = document.createElement('thead');
		oThead.innerHTML = theadStr;
		let oTbody = document.createElement('tbody');
		oTbody.innerHTML = tbodyStr;

		let oTable = document.createElement('table');
		oTable.appendChild(oThead);
		oTable.appendChild(oTbody);

		oTable.setAttribute('cellpadding', '0');
		oTable.setAttribute('cellspadding', '0');
		oTable.setAttribute('class', 'table');

		this.dom = oTable;
	}

	Table.prototype.initEvent = function () {
		// 直接绑定在表格上
		this.dom.addEventListener('click', (function (evt) {
			console.log(111)
			if(evt.target.tagName === 'SPAN') {
				this.sortDown(evt.target.parentNode.getAttribute('data-id'));
				
				this.initDom(); // 构造DOM节点
				this.hide();   // 去掉之前的表格节点
				this.show();   // 这里只是渲染界面，但是并没有绑定事件
				this.initEvent();  // 所以需要绑定事件
			}
		}).bind(this));
	}	

	// 降序排列
	Table.prototype.sortDown = function (id) {
		id = parseInt(id);
		let tbody = this.config.data.tbody;
		let newArr = [];
		let newObj = {};

		for(i in tbody) {
			newArr.push(tbody[i]);
		}

		newArr.sort(function (a, b) {     // 排序方法
			return b[id] - a[id];
		});

		newArr.forEach(function (value, index) {
			newObj[index + 1] = value;
		});

		this.config.data.tbody = newObj;   // 返回排序后的数据
	};

		// 降序排列
	Table.prototype.sortUp = function (id) {
		id = parseInt(id);
		let tbody = this.config.data.tbody;
		let newArr = [];
		let newObj = {};

		for(i in tbody) {
			newArr.push(i[id])
		}
		newArr.sort(function (a, b) {     // 排序方法
			return a[id] - b[id];
		});

		newArr.forEach(function (value, index) {
			newObj[index + 1] = value;
		});

		this.config.data.tbody = newObj;   // 返回排序后的数据
	};

	Table.prototype.show = function () {
		document.body.appendChild(this.dom);
	}

	Table.prototype.hide = function () {
		let table = document.getElementsByClassName('table')[0];
		console.log(table);
		document.body.removeChild(table);
	}
	window.Table = Table;
})();


//----------------------------------------------------------------
var configData = {
	data: {
		thead: ['姓名', '数学', '语文', '英语', '总分'],
		sortSwitch:[0, 1, 1, 1, 1],           // 1代表需要渲染span
		tbody: {
			1: ['打米', 1, 76, 23, 10],
			2: ['a米', 2, 23, 42, 1100],
			3: ['z米', 3, 74, 13, 1030],
			4: ['A米', 4, 71, 123, 100],
			5: ['小米', 5, 51, 62, 150]
		}
	},
		isSortable: true
};
var table = new Table(configData);
table.show();

