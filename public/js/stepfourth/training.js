importScripts("utils.js")

train = {
	start : function(raiz , house_position , plot, obstacles){
		this.raiz = raiz
		this.house_position = house_position
		this.plot = plot
		this.obstacles = obstacles

		this.x = raiz.position.x
		this.y = raiz.position.y

		this.last_position = raiz.position
		this.way = []

		this.next_position()
	},
	next_position: function(){

		var position = {x:this.x,y:this.y}

		while( !this.on_house(position) ){

			positions = this.posibles_movents(position, this.way, this.last_position)

			if(positions.length > 0 ){

				position = this.position_on_house(positions)

				if(!position){
					index = Math.floor((Math.random() * positions.length ) )
					position = { x:positions[index].x, y:positions[index].y }
				}

				this.last_position.x = this.x
				this.last_position.y = this.y

				this.x = position.x
				this.y = position.y

				this.way.push(position)
			}
		}

		self.postMessage(this.way)
	},
	on_house : function(position){
		if(utils.diferent_position(position, this.house_position))
			return false
		return true
	},
	position_on_house : function(positions){
		for (var i = positions.length - 1; i >= 0; i--)
			if(this.on_house( positions[i] ) )
				return positions[i]
		return false
	},
	valid_position : function(pos){
		return pos.x >= 0 && pos.y >= 0 && pos.x < plot.width / 50 && pos.y < plot.height / 50
	},
	posibles_movents : function(pos, visited_list, last_position){
		pos_list = []
		
		for(x=pos.x-1; x<= pos.x + 1 ; x++)
			for(y=pos.y-1;y<=pos.y + 1 ; y++){
				pos2 = { x:x, y:y }
				if( this.valid_position(pos2) && utils.diferent_position(pos2, pos) && utils.diferent_position(pos2, last_position) && !this.is_obstacle(pos2) && !this.position_on_list(pos2, visited_list))
					pos_list.push(pos2)
			}

		if(pos_list.length == 0 ){
			 pos_list = this.visited_to_positions(visited_list, pos, last_position)

			 if(pos_list.length == 0 )
			 	return [last_position]
		}

		return pos_list
	},
	position_on_list : function(position, list){
		for (var i = list.length - 1; i >= 0; i--) 
			if( position.x == list[i].x && position.y == list[i].y )
				return true
		return false
	},
	is_obstacle: function(pos){
		if(this.obstacles[pos.y].indexOf(pos.x) != -1 )
			return true
		return false
	},
	visited_to_positions: function(visited_list, pos, last_position){
		positions = []

		for(x=pos.x-1; x<= pos.x + 1 ; x++){
			for(y=pos.y-1;y<=pos.y + 1 ; y++){
				pos2 = { x:x, y:y }
				if( this.position_on_list(pos2 , visited_list ) && utils.diferent_position(pos2 , last_position) && (x != pos.x || y != pos.y ))
					positions.push(pos2)
			}
		}

		return positions
	}
}

self.addEventListener('message', function(e) {
    
    var data = e.data
    plot = data.plot

    train.start( data.raiz, data.house_position , data.plot , data.obstacles)

}, false);