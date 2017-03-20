// 感觉不应该将每个输入框的验证函数写在原型对象中，应该写在实例对象上。
// 第一版先这样吧。


function Validate (id, tip, fn) {
	this.data = {     // 保存较验结果的数据
		code: 0,       // 判断是否验证成功，0表示失败
		message: tip,
		color: '',
		borderColor: 'SkyBlue'
	}
	this.input = document.getElementById(id);
	this.init = function() {
		this.input.addEventListener('focus', this.showTip.bind(this), false);   // 将当前对象绑定到回调函数的this上
		this.input.addEventListener('blur', this.check.bind(this), false);   // 将当前对象绑定到
	}
	this.init();
}

// 定义API
Validate.prototype.showTip = function() {
	this.input.nextElementSibling.style.visibility = 'visible';
	this.input.style.borderColor = this.data.borderColor;
	this.input.nextElementSibling.innerHTML = this.data.message;
	this.input.nextElementSibling.style.color = this.data.color;
};

Validate.prototype.check = function(fn) {
	/* 根据id绑定不同的验证函数 */
	// 用户名检测
	if(this.input.getAttribute('id') === 'username') {
		this.checkUserName(this.input.value);
		this.showTip();
	}
	// 密码检测函数
	if(this.input.getAttribute('id') === 'password') {
		this.checkPassWord(this.input.value);
		this.showTip();
	}
	// 密码确认检测函数
	if(this.input.getAttribute('id') === 'repassword') {
		this.checkRePassWord(this.input.value);
		this.showTip();
	}
	// 密码确认检测函数
	if(this.input.getAttribute('id') === 'email') {
		this.checkEmail(this.input.value);
		this.showTip();
	}
	// 密码确认检测函数
	if(this.input.getAttribute('id') === 'cellphone') {
		this.checkCellPhone(this.input.value);
		this.showTip();
	}	
}
// 检查输入内容的字符数方法
Validate.prototype.checkLength = function(str) {
	if(str === '') {
		return 0;
	}
	var re_char = /\w+/g;
	var re_ch = /[\u4e00-\u9fa5]/g;
	var char = str.match(re_char);  // 数字、字母、下划线
	var ch = str.match(re_ch);  // 中文字符

	var char_len = 0;
	var ch_len = 0;

	if(char != null) {
		char_len = char.join('').length;
	} 
	if(ch != null) {
		ch_len = ch.join('').length * 2;
	}
		
	return char_len + ch_len;
}
// 检查用户名方法
Validate.prototype.checkUserName = function (str) {
	let len = this.checkLength(str);
	this.password = str;    // 将密码保存下来，用于repassword判断，保存到

	if(len === 0) {
		this.data.message = "名称不能为空";
		this.data.color = 'red';
		this.data.borderColor = 'red'
	} else if(len >= 4 && len <= 16) {
		this.data.message = "名称格式正确";
		this.data.color = 'green';
		this.data.borderColor = 'green';
		this.data.code = 1;
	} else {
		this.data.message = "必填，长度为4~16个字符";
		this.data.color = 'red';
		this.data.borderColor = 'red'
	}
}
// 检查密码方法
Validate.prototype.checkPassWord = function(str) {
	let len = this.checkLength(str);
	if(len === 0) {
		this.data.message = "密码不能为空";
		this.data.color = 'red';
		this.data.borderColor = 'red';
	} else if(len >= 6) {
		this.data.message = "密码可用";
		this.data.color = 'green';
		this.data.borderColor = 'green';
		this.data.code = 1;
	} else {
		this.data.message = "密码不能少于6位";
		this.data.color = 'red';
		this.data.borderColor = 'red';
	}
}
// 检查确认密码方法
Validate.prototype.checkRePassWord = function(str) {
	let len = this.checkLength(str);
	if(len !== 0) {
		if(rePassWord.input.value === passWord.input.value) {
			this.data.message = "密码输入一致";
			this.data.color = 'green';
			this.data.borderColor = 'green';
			this.data.code = 1;
		} else {
			this.data.message = "两次密码输入不一致，请重新输入";
			this.data.color = 'red';
			this.data.borderColor = 'red';
		}
	} else {
		this.data.message = "请确认输入密码";
		this.data.color = 'red';
		this.data.borderColor = 'red';
	}
}
// 检验邮箱方法
Validate.prototype.checkEmail = function(str) {
	let re = /^\w+@[a-z0-9]+(\.[a-z]+){1,3}/;
	if(re.test(str)) {
		this.data.message = "邮箱格式正确";
		this.data.color = 'green';
		this.data.borderColor = 'green';
		this.data.code = 1;
	} else {
		this.data.message = "邮箱格式错误";
		this.data.color = 'red';
		this.data.borderColor = 'red';
	}
}
// 检验手机方法
Validate.prototype.checkCellPhone = function(str) {
	var re = /^1\d{10}$/;    // 可能不精确...
	if(re.test(str)) {
		this.data.message = "手机格式正确";
		this.data.color = 'green';
		this.data.borderColor = 'green';
		this.data.code = 1;
	} else {
		this.data.message = "手机格式错误";
		this.data.color = 'red';
		this.data.borderColor = 'red';
	}
}

var messageTip = ['必填，长度为4~16个字符', '请输入密码，至少6位', '请重复输入密码', '请输入邮箱', '请输入手机号'];

var userName = new Validate('username', messageTip[0]);
var passWord = new Validate('password', messageTip[1]);
var rePassWord = new Validate('repassword', messageTip[2]);
var email = new Validate('email', messageTip[3]);
var cellPhone = new Validate('cellphone', messageTip[4]);

var btn = document.getElementById('btn');
// 提交按钮前的检验
btn.addEventListener('click', function() {
	let inputs = [userName, passWord, rePassWord, email, cellPhone];
	for(let i=0; i<inputs.length; i++) {
		if(inputs[i].data.code !== 1) {
			alert("输入有误，请重新填写!");
			return;
		}
	}
	alert('恭喜，终于特么填完了!');
});



