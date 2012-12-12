var raiz_position
var plot = {
	canvas : false,
	house : false,
	width : 0,
	height : 500,
	grid : false,
	obstacles : {},
	obstacles_set : false,
	init: function(){
		this.set_size()
		this.obstacles_set = paper.set()
		forest.init()
		this.flag_opacity = 1

		this.find_worker = new Worker('/js/stepfourth/find_way.js');

		this.find_worker.addEventListener('message', this.move_on_path , false);
	},
	move_on_path : function(e) {
		kibbus.init_from_position( e.data.splice(0 , 1)[0] , e.data )
		kibbus.move()
	},
	set_size : function(){
		
		var container = $("#container")
		var controls = $("#controls")
		
		container.height(function(){
			plot.height = $(window).height() - $('footer').height() - $('header').height() - 10
			plot.height = plot.height - ( plot.height % 50 )
			if ( plot.height < 500 )
				return 500
			return plot.height
		})
		
		this.canvas = $("#plot").width(function(){
			plot.width = container.width() - controls.outerWidth()
			plot.width = plot.width - ( plot.width % 50 )
			if( plot.width < 580)
				return 580
			return plot.width
		})
		
		controls.outerWidth(function(){
			return container.width() - plot.width - 1
		})
		
		paper = new Raphael(document.getElementById('plot'), this.canvas.width() , this.canvas.height() );
	},
	set_grid : function(){
		if( !this.grid ){
			this.grid = paper.set();
			var patron
			for(var i = 50; i < this.width ; i+=50) {
				patron = "M " + i + " 0 l 0 " + this.height
				this.grid.push( paper.path(patron) )
			}
			for (var i = 50; i < this.height; i+=50) {
				patron = "M 0 " + i + " l " + this.width + " 0"
				this.grid.push( paper.path(patron) )
			}
			for(i = 0; i < this.width / 50 ; i++){
				for( var j = 0; j < this.height / 50 ; j++){
					this.grid.push(paper.text(i*50 + 15  , j*50 + 5, i + "," + j))
				}
			}
			this.grid.attr({
				opacity: 0
			})
		}

		if(this.grid[0].attr("opacity") == 0.5){
			this.grid.animate({ opacity: 0 }, 400 , ">")
		}else{
			this.grid.animate({ opacity: 0.5 }, 400 , "<")
		}
	},
	set_house: function(){

		forest.add_remove(true)

		pos = {}
		this.canvas.mousemove(function(position){
			pos.x = Math.floor(( position.pageX - this.offsetLeft ) / 50)
			pos.y = Math.floor(( position.pageY - this.offsetTop ) / 50)
			
			if( !plot.is_obstacle(pos)){
				
				if(!plot.house) plot.house = paper.image( "img/house.svg" , pos.x * 50 , pos.y * 50 , 50 , 50 )
				
				pos.x *= 50
				pos.y *= 50
				plot.house.animate(pos, 30 , "bounce")
			}
		})
		
		this.canvas.click(function(){
			plot.canvas.unbind("mousemove")
			plot.canvas.unbind("click")
			
			plot.house.toFront()
		})
	},
	is_obstacle: function(pos){
		if( this.valid_position(pos) ){
			if(forest.obstacles[pos.y].indexOf(pos.x) != -1 ){
				return true
			}
		}else{
			return true
		}
		return false
	},
	on_house: function(position){
		return this.house && position.x * 50 == this.house.attr("x") &&  position.y * 50 == this.house.attr("y")
	},
	position_on_house : function(positions){
		for (var i = positions.length - 1; i >= 0; i--) {
			if(this.on_house( positions[i] ) )
				return positions[i]
		}

		return false
	},
	on_kibbus : function(position){
		return kibbus.x == position.x && kibbus.y == position.y
	},
	valid_position : function(pos){
		return pos.x >= 0 && pos.y >= 0 && pos.x < this.width / 50 && pos.y < this.height / 50
	},
	set_kibbus: function(){

		forest.add_remove(true)

		kibbus.init()
		
		this.canvas.mousemove(function(position){
			
			pos = {}
			
			pos.x = Math.floor(( position.pageX - this.offsetLeft ) / 50)
			pos.y = Math.floor(( position.pageY - this.offsetTop ) / 50)
			
			if( !plot.is_obstacle(pos)) kibbus.translate_fast(pos)

		})
		
		this.canvas.click(function(param){
			plot.canvas.unbind("mousemove")
			plot.canvas.unbind("click")

			kibbus.x = Math.floor(kibbus.cow.attr("x") / 50)
			kibbus.y = Math.floor(kibbus.cow.attr("y") / 50)

			if(plot.tree.raiz === undefined)
				plot.tree.init({x:kibbus.x,y:kibbus.y})
			else
				kibbus.go_home()
		})
	},
	tree : {
		init : function(position){
			this.nodes = []
			this.raiz = new node( position.x, position.y)

			raiz_position = this.raiz.position

		},
		recalculate_costs : function(positions){
			this.positions = positions

			var node = this.raiz
			var way

			if(this.min === undefined )
				this.min = this.max = positions.length

			media = ( this.min + this.max ) / 2

			var cost_value = Math.abs( media - positions.length )

			if(positions.length < media)
				cost_value = -cost_value

			console.log(this.raiz.position)

			while(this.positions.length > 0){
				position = this.positions.shift()

				way = this.get_position_way( node.ways, position )
				way.value += cost_value
				node = way.node
			}

			if(positions.length > this.max )
				this.max = positions.length
			else if(position.length < this.min )
				this.min = position.length

			kibbus.start({x:this.raiz.position.x,y:this.raiz.position.y})

		},
		get_position_way: function(costs, position){
			
			for (var i = costs.length - 1; i >= 0; i--)
				if( costs[i].node.position.x == position.x && costs[i].node.position.y == position.y )
					return costs[i]

			costs.push(new cost(position))

			return costs[costs.length-1]
		},
		add_array_to_visit : function(positions){

			for (var i = positions.length - 1; i >= 0; i--)
				utils.add_to_list( this.to_visit , positions[i].node )

		},
		find_create_node : function(position){

			var visited = []
			var check
			this.to_visit = [this.raiz]

			while(this.to_visit.length > 0 ){

				check = this.to_visit.shift()

				found = $.grep(visited , function(element , i ){ return element == check })

				if(!utils.in_list(visited , check)){

					visited.push(check)

					if(check.position.x == position.x && check.position.y == position.y)
						return check

					this.add_array_to_visit(check.ways)
				}
			}

			return new node( position.x, position.y)

		},
		find_way_start: function(element){
			var house_position = {x:plot.house.attr("x") / 50,y:plot.house.attr("y") / 50}
			var node = this.find_create_node(element)

			plot.find_worker.postMessage({
				house_position : house_position,
				node : node
			})

		},
	    in_list : function(list , element ){
	        for (var i = list.length - 1; i >= 0; i--)
	            if(list[i].x == element.x && list[i].y == element.y)
	                return true
	        return false
	    }
	}
}


function node(x, y){
	this.position = {x:x,y:y}
	this.ways = []
}

function cost(position){
	this.value = 1000000
	this.node = plot.tree.find_create_node(position)
}