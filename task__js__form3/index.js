function $(id) {
	return document.querySelector(id);
}
function changePannel () {
	if($('#btn__left').checked) {
		$('#input-select').className = 'show--state';
		$('#input-company').className = 'hide--state';
	} else {
		$('#input-select').className = 'hide--state';
		$('#input-company').className = 'show--state';
	}
}
changePannel();
$('#btn__left').addEventListener('click', changePannel, false);
$('#btn__right').addEventListener('click', changePannel, false);

function changeCity() {
	let data = {
		'cd': ['四川大学', '电子科技大学', '西南交通大学'],
		'hz': ['浙江工业大学', '浙江大学', '浙江影视学院'],
		'sh': ['复旦大学', '上海交通大学', '华东科技大学']
	};
	let city = $('#city');
	let school = $('#citySchool');
	
	var index = city.selectedIndex;
	// console.log(city.options[index].value);
	let cityText = city.options[index].value;
	let schoolData = data[cityText];

	let str = '';

	schoolData.forEach(function(value, index) {
		str += '<option>' + value + '</option>';
	});
	school.innerHTML = str;
}
$('#city').addEventListener('change', changeCity, false);



