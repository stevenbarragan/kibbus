var paper
var slider
var velocity = 1

$(document).ready(function(){
	
	slider = $( "#slider-vertical" ).slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 50,
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
		max: 5,
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

	$("#training").click(function(){
		velocity = 100

		$( "#slider-vertical" ).slider("disable")
		$( "#add-remove" ).hide()
		$( "#house" ).hide()

		plot.training_times_limit = parseInt( $("#training_times").val() )
		plot.training_times = 0

		plot.training_worker.postMessage({
			raiz:plot.tree.raiz,
			house_position : {x:plot.house.attr("x") / 50,y:plot.house.attr("y") / 50 },
			plot : {width:plot.width,height: plot.height },
			obstacles : forest.obstacles
		})
		
		kibbus.start({x:plot.tree.raiz.position.x,y:plot.tree.raiz.position.y})
	})

	$("#stop").click(function(){
		velocity = $( "#slider-vertical-velocity" ).slider("value")
		kibbus.stop()
	})

	$("#add-remove").click(function(){
		forest.add_remove()
	})
	
	$("#instruction").popover({
		title : "What to do?",
		content : "<b>First:</b> Click on \"Set house button\", then click on the forest where you want the house.<br /><b>Second:</b> Click where you want to Kibbus start to look for the house.<br /><b>Third:</b> Click on \"Train\", it will train kibbus to make a mental map of the forest and all the obstacles.<br /><b>Fourth:</b> Click on \"Stop/Go home\" to stop the train and watch how kibbus get home througn the obstacles.<br />After the training Click on \"Set Kibbus\" again and put it on the place you want, it would be able to get home not matter if it's no where it started the training, try any forest's place",
		placement : "bottom"
	})
	
	$("#why").popover({
		title : "My AI project",
		content : "On fourth step kibbus doesn't have any fried's help to get home and she doesn't know the house's position, but now she gets a \"map\" making it runing around the forest untils she come acrooss with the house.<br />She continue doing several times and after that she is able to get home, using the best way and not matter of with place on the forest she can get home alone ",
		placement : "bottom"
	})


	if("WebkitTransform" in document.documentElement.style ){
		$("#explorer_message").hide()
	}
})