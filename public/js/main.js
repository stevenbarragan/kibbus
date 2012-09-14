$(document).ready(function(){

	windows = $(window)

	width = windows.width()
	width = width - 40
	height = windows.height() - 100

	$("#container").css({
		'height' : height,
		'width' : width
	})
})
