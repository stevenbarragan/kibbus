var kibbus = {
	images : ["cow.svg" , "green-cow.svg" , "blue-cow.svg"],
	angle : 0,
	cow : false,
	x:-1,
	y:-1,
	init : function(){
		
		var img = this.images[Math.floor( Math.random() * this.images.length )]
		
		if( !kibbus.cow ) kibbus.cow = paper.image( "img/" + img , kibbus.x * 50 , kibbus.y * 50, 50 , 50 )
		
		kibbus.cow.attr({
			src: "img/" + img
		}).animate({
			x : kibbus.x *50, 
			y : kibbus.y *50
		}, utils.calculate_velocity(50) , "elasctic").toFront()
		
		this.coordenates = []
		this.last_position = {x:kibbus.x,y:kibbus.y}
		this.way = []
	},
	spin: function(position){
		this.cow.animate({
			transform: "r" + this.angle,
			opacity : 1
		}, utils.calculate_velocity(125) , ">" , function(){
			kibbus.translate_slow(position)
		})
	},
	translate_fast: function(position){
		this.cow.animate({
			x : position.x * 50,
			y : position.y * 50,
			transform: "r" + this.angle,
			opacity : 1
		}, 20, "bounce")
	},
	translate_slow: function(pos){

		var self = this
		
		if( plot.on_house(pos))
			opacity = 0
		else
			opacity = 1
		
		this.cow.animate({
			x : pos.x * 50,
			y : pos.y * 50,
			transform: "r" + this.angle,
			opacity : opacity
		}, utils.calculate_velocity(475), function(){

			self.last_position.x = self.x
			self.last_position.y = self.y

			self.x = pos.x
			self.y = pos.y

			self.way.push(pos)

			self.next_position()
		})
	
	},
	move : function(){
		if( this.coordenates.length > 0 ){
			position = this.coordenates.shift()
			
			angle = utils.calculate_angle( this.x, this.y , position.x, position.y)
			
			if( angle != this.angle){
				this.angle = angle
				this.spin(position)
			}else{
				this.translate_slow(position)
			}
		}
	},
	next_position: function(){

		var position = {x:this.x,y:this.y}

		if( !plot.on_house(position)){

			positions = utils.posibles_movents(position, this.last_position)

			if(positions.length > 0 ){

				index = Math.floor((Math.random() * positions.length ) )
				position = { x:positions[index].x, y:positions[index].y }

				this.coordenates.push( position )
				this.move()
			}
		}else{
			plot.tree.recalculate_costs(this.way)
		}
	},
	start : function(){

		this.node = plot.tree.init({x:this.x,y:this.y})

		this.next_position()
	}
}