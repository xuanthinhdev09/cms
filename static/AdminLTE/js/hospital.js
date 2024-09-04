function validateFormQuarter(){
	var divisions =  $("select[name='divisions'] option:selected").val();
	var warehouse =  $("select[name='warehouse'] option:selected").val();
	
	if (divisions==''){
		alert('Chưa chọn kho nhập');
		return false
	}
	if (warehouse==''){
		alert('Chưa chọn kho xuất');
		return false;
	}
	return true;
}

function kiemtra()
{
	var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;
	if(document.getElementById('name').value=='')
	{
		alert('Bạn chưa nhập tên');
		return false;
	}
	if(document.getElementById('adress').value=='')
	{
		alert('Bạn chưa nhập địa chỉ');
		return false;
	}
	
	var start_time = trim(document.getElementById('date_received').value);
	var end_time = trim(document.getElementById('date_paid').value);
	
	var d = parseDate(start_time).getTime();
	var d1 = parseDate(end_time).getTime();
	var startTimeArray = start_time.match(datePat); 
	var endTimeArray   = end_time.match(datePat); 
	if(start_time=='')
	{
		alert('Bạn chưa nhập ngày tiếp nhận');
		return false;
	}
	if(end_time=='')
	{
		alert('Bạn chưa nhập ngày trả');
		return false;
	}
	if( startTimeArray==null)
	{
		alert("Định dạng thời gian bắt đầu chưa đúng. ( Ngày/Tháng/Năm )");
		return false;
	}
	if( endTimeArray==null)
	{
		alert("Định dạng thời gian kết thúc chưa đúng. ( Ngày/Tháng/Năm )");
		return false;
	}
	if(d>d1)
	{
		alert("Ngày hẹn trả phải sau ngày tiếp nhận");
		return false;
	}
	return true;
	
}
function parseDate(str) {
	var mdy = str.split('/');
	return new Date(mdy[2], mdy[1], mdy[0]);
	}
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	}
// Hàm cắt ký tự trắng ở cuối chuỗi
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	}
// Hàm cắt ký tự trắng ở đầu và cuối chuỗi
function trim( value ) 
{
	return LTrim(RTrim(value));
}

//Hàm hỏi trước khi xóa
function confirmDelete(){
	return confirm('Nhấn OK để chắc chắn xóa');
	}

//add class active cho tabmenu
$(document).ready(function(){
	//addclass active cho menu 
	var url = window.location;
    var element = $('ul li.item_hs a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;		
    }).parent().addClass('active').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});	
	
	