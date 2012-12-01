var kibbus = {
	images : ["cow.svg" , "green-cow.svg" , "blue-cow.svg"],
	angle : 0,
	cow : false,
	x:-1,
	y:-1,
	last:{
		x:-1,
		y:-1,
		set: function(x , y ){
			this.x = x
			this.y = y },
		compare: function(pos){
			if(this.x == pos.x && this.y == pos.y)
				return true
			return false
		}
	},
	init : function(){
		
		var img = this.images[Math.floor( Math.random() * this.images.length )]
		
		if( !kibbus.cow ){
			kibbus.cow = paper.image( "img/" + img , kibbus.x * 50 , kibbus.y * 50, 50 , 50 )   
		}
		
		kibbus.cow.attr({
			src: "img/" + img
		}).animate({
			x : kibbus.x *50, 
			y : kibbus.y *50
		}, utils.calculate_velocity(10) , "elasctic").toFront()
		
		if( this.visited_list != undefined ){
			plot.delete_flags()
		}
		
		this.visited_list = []
		this.visited_list_deleted = 0
		this.coordenates =[]
		
		this.last.x = this.x
		this.last.y = this.y
	},
	spin: function(params){
		this.cow.animate({
			transform: "r" + this.angle,
			opacity : 1
		}, utils.calculate_velocity(125) , ">" , function(){
			if(params){
				setTimeout(function(){
					kibbus.transtale_slow(params.position, params.search_home , params.check)
				} , utils.calculate_velocity(10) )
			}
		});
	
	},
	translate_fast: function(position){
		this.cow.animate({
			x : position.x * 50,
			y : position.y * 50,
			transform: "r" + this.angle,
			opacity : 1
		}, 20, "bounce")
	},
	transtale_slow: function(pos, search_home, check){
		
		if( plot.on_house(pos))
			opacity = 0
		else
			opacity = 1
		
		this.cow.animate({
			x : pos.x * 50,
			y : pos.y * 50,
			transform: "r" + this.angle,
			opacity : opacity
		}, utils.calculate_velocity(450))

		setTimeout(function(){
			kibbus.last.set(kibbus.x, kibbus.y)

			kibbus.x = pos.x
			kibbus.y = pos.y
			
			kibbus.visit(pos)
			
			if( search_home ){
				kibbus.search_home()
			}else{
				kibbus.move(false,check)
			}
		}, utils.calculate_velocity(325) )
	
	},
	move : function(search_home, check){

		if( typeof check === "undefined") check = false

		if( this.coordenates.length > 0 ){
			position = this.coordenates.shift()
			
			angle = utils.calculate_angle( this.x, this.y , position.x, position.y)
			
			if( !plot.is_obstacle(position) ){
				if (!check || !this.is_visited_any(position)){
					
					if( this.coordenates.length > 0 && kibbus.last.compare(position)){
						this.find_another_way()
					}else{
						if( angle != this.angle){
							this.angle = angle
							this.spin({
								position:position,
								search_home:search_home,
								check:check
							})
						}else{
							this.transtale_slow(position,search_home, check )
						}
					}
				}else{
					this.find_another_way()
				}
			}else{
				this.find_another_way()
			}
		}
	},
	search_home : function(){
		this.coordenates = utils.bresenham(kibbus.x,kibbus.y,plot.house.attr("x")/50,plot.house.attr("y")/50)
		this.move(false, true);
	},
	find_another_way : function(){
		
		positions = utils.posibles_movents({x:this.x,y:this.y})
		
		if(positions.length > 0 ){
			
			index = Math.floor((Math.random() * positions.length ) )
			this.coordenates = [{ x:positions[index].x, y:positions[index].y }]
			this.move(true)
		
		}else{
			if( !this.last.compare({x:this.x,y:this.y}) && !this.is_visited({x:this.last.x,y:this.last.y})){
				this.coordenates = [{x:this.last.x , y:this.last.y}]
				this.move(true)
			}
			else{
				if(this.visited_list.length > 0 && this.visited_list_deleted < 1){
					plot.delete_flags()
					this.visited_list_deleted = 1
					this.find_another_way()
				}else{
					this.visited_list_deleted = 0
					alert("I'm lost =(")
				}
			}
		}
	
	},
	visit: function(pos){
		visited = $.grep( this.visited_list , function( visited ){
			return visited.x == pos.x && visited.y == pos.y
		})
		
		if( visited.length > 0 ){
			
			visited[0].times++
			switch(visited[0].times){
				case 2:
					visited[0].image.animate({ fill: "#FFFC00" } , 10 )
					break;
				case 3:
					visited[0].image.animate({ fill: "#FF8000" } , 10 )
					break;
				case 4:
					visited[0].image.animate({ fill: "#0DB8AD" } , 10 )
					break;
				case 5:
					visited[0].image.animate({ fill: "#FF0000" } , 10 )
					break;
				default:
					console.log("Error con switch times")
			}
		}else{
			this.add_visited(pos)
		}
	},
	is_visited : function(pos){
		visited = $.grep( this.visited_list , function( visited ){ return visited.x == pos.x && visited.y == pos.y })
		return visited.length > 0 && visited[0].times > 4
	},
	is_visited_any : function(pos){
		visited = $.grep( this.visited_list , function( visited ){ return visited.x == pos.x && visited.y == pos.y })
		return visited.length > 0
	},
	add_visited: function(pos){
		this.visited_list.push({ x:pos.x, y:pos.y, times:1,
			image:paper.circle( ( pos.x * 50) + 25, (pos.y * 50) + 25, 6)
			.attr({ fill: "#adff2f", opacity : plot.flag_opacity })
			.toBack() })
	}
}