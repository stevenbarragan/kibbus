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
		
		for(x=pos.x-1; x<= pos.x + 1 ; x++){
			for(y=pos.y-1;y<=pos.y + 1 ; y++){
				pos2 = { x:x, y:y }
				if( plot.valid_position(pos2) && (x != pos.x || y != pos.y ) && !plot.is_obstacle(pos2) && this.tuple_not_on_list(pos2 , visited_list))
					pos_list.push(pos2)
			}
		}

		if(pos_list.length == 0 ) return this.visited_to_positions(visited_list, pos)

		return pos_list
	},
	calculate_velocity: function(standar_velocity){
		return standar_velocity / velocity
	},
	distance_two_points: function( point_a , point_b){
		return Math.sqrt(  Math.pow( (point_b.x - point_a.x) , 2 ) + Math.pow( (point_b.y - point_a.y) , 2 ) )
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
				if( !this.tuple_not_on_list(pos2 , visited_list ) && (x != pos.x || y != pos.y ))
					positions.push(pos2)
			}
		}

		return positions
	}
}