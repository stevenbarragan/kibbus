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
		this.finding = false
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

			if(self.finding)
				self.next_position()
			else
				self.move()
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

		if(this.finding && this.continue){

			var position = {x:this.x,y:this.y}

			if( !plot.on_house(position)){

				positions = utils.posibles_movents(position, this.way, this.last_position)

				if(positions.length > 0 ){

					position = plot.position_on_house(positions)

					if(!position){
						index = Math.floor((Math.random() * positions.length ) )
						position = { x:positions[index].x, y:positions[index].y }
					}

					this.coordenates.push( position )
					this.move()
				}
			}else{
				var self = this
				var settimeout = setInterval(function(){
					if(!plot.recalculating){
						clearInterval(settimeout)
						plot.tree.recalculate_costs(self.way)

						if(plot.training_times < plot.training_times_limit)
							kibbus.start({x:plot.tree.raiz.position.x,y:plot.tree.raiz.position.y})
					}
				} , 10)
			}
		}else{
			this.move()
		}
	},
	start : function(position){
		this.continue = true
		this.finding = true
		
		if(position !== undefined )
			this.init_from_position(position)
                
        this.next_position()
	},
	stop : function(){
		this.continue = false
		this.finding = false

		this.cow.stop()
		
		plot.tree.find_way_start(raiz_position)
	},
	init_from_position : function(position, coordenates){

		this.x = position.x
		this.y = position.y

		this.coordenates = coordenates !== undefined ? coordenates : []
		this.last_position = position
		this.way = []

		this.cow.attr({
			opacity : 0
		})

		this.cow.animate({
			x:position.x * 50,
			y:position.y * 50,
			opacity : 1
		}, 0 )

	},
	go_home : function(){
		plot.tree.find_way_start({x:this.x,y:this.y})
	}
}