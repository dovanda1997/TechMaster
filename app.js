/*
.innerHTML // thay đổi nội dung html của phần tử được chọn
.textContent // thay đổi / lấy nội dung là chữ của thẻ html


input, textarea lấy được giá trị hoặc gán giá trị
.value

template string backticks
${} sẽ chạy code js trong template string

let a = 0;

document.querySelector('button').addEventListener('click', function(e) {
	// lấy cái value bên trong ô input
	let input = document.querySelector('input');
	// console.log(input.value);
	// gán value đó thành nội dung thẻ <p>
	document.querySelector('p').innerHTML = `
	<span>default value</span>
	<button>${a}</button>
	<button>+</button>
	`;
	
	document.querySelector('p').innerHTML = '<span>' + a + '</span>';
})
*/
// Bước 1: lấy value từ input sau khi click -> 5 phút thực hiện
/*
Bước 2: đẩy value mới vào 1 danh sách
+ chuẩn bị 1 cái <ul> ở file html và 1 array rỗng để lưu value mới
+ đẩy value mới vào array rỗng // 3 phút
+ lấy ra các value mới và thay thế <ul> bằng <ul> mới
	- lấy ra hết bằng for, for of, map // 3 phút
	- tạo thẻ <li>
	- .appendChild(li) // 10 phút

Cập nhật trạng thái của task
Bước 1:
+ làm cái chữ bị gạch ngang // 5 phút
+ cập nhật trạng thái của item đó bên trong list
Bước 2: render lại list
+ done rồi -> k cho click nữa
+ done rồi -> tên mặc định phải bị gạch // 10 phút

*/
// Bước 3: load lại toàn bộ danh sách sau khi thêm value mới
let list = [];

if (localStorage.getItem('todo_list')) {
	list = JSON.parse(localStorage.getItem('todo_list'));
	render_list(list);
}

let btn = document.querySelector('.form button');
btn.addEventListener('click', function() {
	let input_value = document.querySelector('.form input').value;
	let item = {}
	item.task_name = input_value;
	add_task(item);
})

function add_task(params) {
	if (!params) return false;
	if (!params.task_name) {
		alert('không để giá trị rỗng');
		return false;
	}
	list.push(params);
	render_list(list);
	set_local_storage(list)
}

function render_list(params) {
	if (!params) return false;
	document.querySelector('ul').innerHTML = '';
	
	for (let item of params) {
		let {task_name, status} = item;
		
		let done_class = '';
		if (status && status == 'done') {
			done_class = 'class="done"';
		}
		
		let li = document.createElement('li');
		li.innerHTML = `
		<div class = "btn_display">
		
		<span ${done_class}>${task_name}</span>
		<div>	
		<button class ="btn complete">Done</button>
        <button class =" btn delete">Delete</button>
		</div>
		</div>
		`;
		// update status
		li.querySelector('button.complete').addEventListener('click', function() {
			update_task(status, item, li);
		});
		// delete task
		li.querySelector('button.delete').addEventListener('click', function() {
			/*
			
			- tạo ra 1 array rỗng để lưu những task mới
			- kiểm tra xem task mình xóa đi có trùng với task ở array mặc định hay không
			- nếu trùng thì không push vào array rỗng mới
			- clone lại array ban đầu bằng array mới
			
			*/
			delete_task(params, li, task_name);
		});
		document.querySelector('ul').appendChild(li);
	}
}

// hành động chính
// các bước nhỏ là gì -> các function riêng biệt để bổ trợ cho hành động chính
function update_task(status, item, li) {
	if (status && status == 'done') return false;
	item.status = 'done';
	li.querySelector('span').classList.add('done');
	set_local_storage(list)
}

function delete_task(params, li, task_name) {
	let new_array = [];
	let confirm_value = confirm('Xóa nhé');
	if (confirm_value == true) {
		// thực hiện cái bước xóa và cập nhật ở đây
		for (let current_item = 0; current_item < params.length; current_item++) {
			if (params[current_item].task_name != task_name) {
				new_array.push(params[current_item]);
			}
		}
		// .find()
		// .filter()
		// .reduce()
		// gán lại array cũ = giá trị array mới
		list = [...new_array];
		// xóa cái li ở màn hình
		li.remove();
		// reset cái array dùng để so sánh thành mảng rỗng
		new_array.length = 0;
		render_list(list);
		set_local_storage(list)
	}
}

function set_local_storage(params) {
	localStorage.setItem('todo_list', JSON.stringify(params));
}

/*

localStorage // 
sessionStorage
cookie

*/

