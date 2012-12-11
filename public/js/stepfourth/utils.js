utils = {
	invert_angle: function(angle){
		angle2 = angle + 180
		
		if(angle2>=360)
			return angle2 -360        
		return angle2
	},
	calculate_angle : function(x0, y0, x1 , y1){
		if( x0 != x1){
			if( y0 == y1){
				if( x0 < x1 ){
					angle = -90
				}else{
					angle = 90
				}
			}else{
				if( x0 < x1 ){
					if( y0 < y1 ){
						angle = -45
					}else{
						angle = 215
					}
				}else{
					if( y0 < y1 ){
						angle = 45
					}else{
						angle = 135
					}
				}
			}
		}else{
			if( y0 == y1){
				move = false
				angle = kibbus.angle
			}else{
				if( y0 > y1 ){
					angle = 180
				}else{
					angle = 0
				}
			}
		}
		
		return angle
	},
	get_length : function(arr){
		sum = 0
		$.each(arr, function(elemen){
			sum += elemen.length
		})
		return sum
	},
	posibles_movents : function(pos, visited_list){
		pos_list = []
		
		for(x=pos.x-1; x<= pos.x + 1 ; x++)
			for(y=pos.y-1;y<=pos.y + 1 ; y++){
				pos2 = { x:x, y:y }
				if( plot.valid_position(pos2) && this.diferent_position(pos2, pos) && !plot.is_obstacle(pos2) && !this.position_on_list(pos2, visited_list))
					pos_list.push(pos2)
			}

		if(pos_list.length == 0 ) return this.visited_to_positions(visited_list, pos)

		return pos_list
	},
	position_on_list : function(position, list){
		var found = $.grep(list , function(item , i ){ return position.x == item.x && position.y == item.y })
		if(found.length>0)
			return true
		return false
	},
	diferent_position : function(position1, position2){
		return position1.x != position2.x || position1.y != position2.y
	},
	calculate_velocity: function(standar_velocity){
		return standar_velocity / velocity
	},
	tuple_not_on_list: function(tuple, lista ){
		try{
			if(lista[tuple.y].indexOf(tuple.x) != -1 )
				return false
			else
				return true

		}catch(err){
			return true		
		}
	},
	add_tuple: function(tuple, lista){
		try{
			lista[tuple.y].push(tuple.x)
		}catch(err){
			lista[tuple.y] = [tuple.x]
		}

		return lista

	},
	visited_to_positions: function(visited_list, pos){
		positions = []

		for(x=pos.x-1; x<= pos.x + 1 ; x++){
			for(y=pos.y-1;y<=pos.y + 1 ; y++){
				pos2 = { x:x, y:y }
				if( this.position_on_list(pos2 , visited_list ) && (x != pos.x || y != pos.y ))
					positions.push(pos2)
			}
		}

		return positions
	},
	add_to_list : function(list , node){
		found = false

		for (var i = list.length - 1; i >= 0; i--)
			if( list[i].position == node.position ){
				found = true
				break
			}

		if(!found)
			list.push(node)

	},
	dijkstra:{
		init: function(){
			this.nodes_to_array()

		},
		nodes_to_array : function(){
			this.nodes = []
			this.distancia = []
			for (var x = plot.tree.nodes.length - 1; x >= 0; x--)
				for (var y = plot.tree.nodes[i].length - 1; y >= 0; y--){
					if( plot.tree.nodes[x][y] == plot.tree.raiz )
						this.raiz = this.nodes.length
					
					plot.tree.nodes[x][y].id = this.nodes.length

					this.nodes.push({
						node : plot.tree.nodes[x][y],
						dis : -1,
						visitado : false,
						previo : -1
					})
				}
		}
	}
}

