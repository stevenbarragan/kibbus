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

			plot.tree.init({x:kibbus.x,y:kibbus.y})
		})
	},
	tree : {
		init : function(position){
			this.nodes = []
			this.raiz = this.find_create_node(position)
		},
		recalculate_costs : function(positions){
			this.positions = positions

			var cost_value = this.positions.length
			var node = this.raiz
			var way

			while(this.positions.length>0){
				position = this.positions.shift()

				way = this.get_position_way( node.ways, position )
				way.value += cost_value
				node = way.node
			}

			kibbus.start({x:this.raiz.position.x,y:this.raiz.position.y})

		},
		get_position_way: function(costs, position){
			
			for (var i = costs.length - 1; i >= 0; i--)
				if( costs[i].node.position.x == position.x && costs[i].node.position.y == position.y )
					return costs[i]

			costs.push(new cost(position))

			return costs[costs.length-1]
		},
		find_create_node : function(position){
			try{
				var node_tentative = this.nodes[position.x][position.y]
				if(node_tentative !== undefined)
					return node_tentative
			}catch(err){}
			
			this.nodes[position.x] = []
			return this.nodes[position.x][position.y] = new node( position.x, position.y)
		}
	}
}


function node(x, y){
	this.position = {x:x,y:y}
	this.ways = []
}

function cost(position){
	this.value = 0
	this.node = plot.tree.find_create_node(position)
}