$(document).ready(function(){
	$('.icon_doc').addClass('fa fa-file-word-o fa-2x');
	$('.icon_xlsx').addClass('fa fa-file-excel-o fa-2x');
	$('.icon_xls').addClass('fa fa-file-excel-o fa-2x');
	$('.icon_jpg').addClass('fa fa-file-image-o fa-2x');
	$('.icon_jpeg').addClass('fa fa-file-image-o fa-2x');
	$('.icon_png').addClass('fa fa-file-image-o fa-2x');
	$('.icon_zip').addClass('fa fa-file-archive-o fa-2x');
	$('.icon_rar').addClass('fa fa-file-archive-o fa-2x');
	
});

$(document).ready(function(){
	//addclass active cho menu 
	var url = window.location;
    var element = $('ul li a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;		
    }).parent().addClass('active').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
	
	//addclass active cho submenu
	var element = $('ul li ul li a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).parent().addClass('active').parent().addClass('menu-open').parent().addClass('active');
    if (element.is('li')) {
        element.addClass('active');
    }
});
