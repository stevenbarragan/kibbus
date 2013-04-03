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
		max: 5.5,
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

	$("#show_frozed").click(function(){plot.show_freezes()})

	$("#add-remove").click(function(){
		forest.add_remove()
	})

	$("#test").click(function(){
		$(kibbus.friends[0].img.node).data().move( {x:3 , y:3} , 500 )
	})

	if("WebkitTransform" in document.documentElement.style ){
		$("#explorer_message").hide()
	}


	
	$("#instruction").popover({
		title : "What to do?",
		content : "<b>First:</b> Click on \"Set house button\", then click on the forest where you want the house.<br /><b>Second:</b> Click where you want to Kibbus start to look for the house.<br /><b>Third:</b> Click on \"Go home\" and watch how kibbus do his maximum effort to get home.",
		placement : "bottom"
	})
	
	$("#why").popover({
		title : "My AI school project",
		content : "On this step kibbus has some friends that help her to get home.<br /><br />The house is the hotter place on the forest and the bees follow the warm, they go on random positions and get the hotter place, go to this place and repeat the process, after 5 cicles they come back for kibbus showing her the hotter way to get home. and they repeat it until all they get home.",
		placement : "bottom"
	})
})