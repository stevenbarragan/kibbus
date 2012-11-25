var paper
var slider
var velocity = 1

$(document).ready(function(){
	
	slider = $( "#slider-vertical" ).slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 30,
		slide: function( event, ui ) {
			if(!forest.forest_working){
				forest.set_forest(ui.value)
			}
		},
		change:function(){
			$("#slider-value").val( slider.slider("value") )
		}
	});

	$( "#slider-vertical-velocity" ).slider({
		range: "min",
		max: 2.5,
		min: 0.5,
		value: 1,
		step: 0.5,
		slide: function( event, ui ) {
			velocity = ui.value
		}
	});
	
	plot.init()

	$("#set_grid").click(function(){ plot.set_grid()})
	
	$("#house").click(function(){ plot.set_house()})

	$("#set_kibbus").click(function(){ plot.set_kibbus()})

	$("#go_home").click(function(){ kibbus.bee_init() })

	$("#show_flags").click(function(){plot.show_flags()})

	$("#add-remove").click(function(){
		forest.add_remove()
	})

	$("#test").click(function(){
		$(kibbus.friends[0].img.node).data().move( {x:3 , y:3} , 500 )
	})


	
	$("#instruction").popover({
		title : "What to do?",
		content : "<b>First:</b> Click on \"Set house button\", then click on the forest where you want the house.<br /><b>Second:</b> Click where you want to Kibbus start to look for the house.<br /><b>Third:</b> Click on \"Go home\" and watch how kibbus do his maximum effort to get home.",
		placement : "bottom"
	})
	
	$("#why").popover({
		title : "My AI school project",
		content : "This is the second step to make Kibbus intelligent, now Kibbus knows his house's position, she has to look for a way through the forest, Kibbus always draws a straight line, between her and the house, to follow and when she came across an obstacle, she moves to another place and she tries to follow a new straight line to get home.<br />She has a system of flags to know the places where she already has been. If the flag is red is considered as a bad place to go and Kibbus are not gonna be there again.<br />Please, if you find any bug let me know :D",
		placement : "bottom"
	})
})