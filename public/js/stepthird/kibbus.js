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
	},
	spin: function(params){
		this.cow.animate({
			transform: "r" + this.angle,
			opacity : 1
		}, utils.calculate_velocity(125) , ">" , function(){
			if(params){
				setTimeout(function(){
					kibbus.translate_slow(params.position, params.search_home)
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
	translate_slow: function(pos){
		
		if( plot.on_house(pos))
			opacity = 0
		else
			opacity = 1
		
		this.cow.animate({
			x : pos.x * 50,
			y : pos.y * 50,
			transform: "r" + this.angle,
			opacity : opacity
		}, utils.calculate_velocity(475))

		kibbus.x = pos.x
		kibbus.y = pos.y

		setTimeout(function(){
			kibbus.move()
		}, utils.calculate_velocity(350) )
	
	},
	move : function(){
		if( this.coordenates.length > 0 ){
			position = this.coordenates.shift()
			
			angle = utils.calculate_angle( this.x, this.y , position.x, position.y)
			
			if( angle != this.angle){
				this.angle = angle
				this.spin({position:position})
			}else{
				this.translate_slow(position)
			}
		}
	},
	bee_init : function(){
		if( typeof this.friends === 'undefined' ){
			bee_number = 5

			this.friends = []
			for (var i = 0; i < bee_number; i++)
				this.friends.push( new bee({x:this.x,y:this.y}) )
		}

		this.friends_handler.init(this.friends)

	},
	friends_handler : {
		init: function(bees){
			this.bees  = bees
			this.start()
		},
		start: function(){
			this.positions = [{x:kibbus.x,y:kibbus.y}]

			for (i = this.bees.length - 1; i >= 0; i--)
				this.bees[i].search_home()

			this.wait_bees()
		},
		wait_bees : function(){
			var self = this
			
			this.alreadyChecked = setInterval( function(){
				if( self.temperatures_checked() ){
					self.bees_returned()
				}
			} , utils.calculate_velocity(100) )
		},
		temperatures_checked : function(){
			
			for (var i = 0; i < this.bees.length; i++){
				info = this.bees[0].bee_img.data()
				
				if( info.temperature == null)
					return false
			}

			return true
		},
		check_temperatures : function(){
			var temperatures = []

			for (index in this.bees ){
				
				information = this.bees[index].bee_img.data()

				if(information.temperature == null){
					this.wait_bees()
					break;
				}
				
				temperatures.push({
					position : information.last_position,
					value : information.temperature
				})

				information.temperature = null
			}

			return temperatures
		},
		bees_returned: function(){
			var self = this
			
			clearInterval(this.alreadyChecked)
			temperatures = this.check_temperatures()

			if(temperatures.length > 0){
				best = this.best_temperature(temperatures)
				
				this.positions.push(best.position)
				
				if( this.positions.length < 6 && !plot.on_house(best.position)){
					this.bee_move(best.position, GO_CHECK, 400)
					this.wait_bees()
				}else{
					this.go_kibus()
				}
			}

		},best_temperature: function(temperatures){
			var better = temperatures[0]

			for (var i = temperatures.length - 1; i > 0; i--)
				if( temperatures[i].value > better.value )
					better = temperatures[i]

			return better
		},
		bee_move: function(position, acction , velocity){
			for (var i = this.bees.length - 1; i >= 0; i--)
				this.bees[i].bee_img.data().move(position, velocity , acction )
		},
		go_kibus: function(){
			var self = this
			
			var positions = this.positions.slice(0,4).reverse()

			this.follow_positions( positions , function(){self.guide_kibbus()} )
		},
		follow_positions: function(positions , callback ){
			var self = this

			for (var i = this.bees.length - 1; i >= 0; i--)
				this.bees[i].follow_positions(positions.slice(0))


			var following = setInterval(function(){

				if(self.bees_finish()){
					clearInterval(following)

					for (var i = this.bees.length - 1; i >= 0; i--)
						self.bees[i].data.finish = false

					callback.call()
				}

			} , utils.calculate_velocity(500) )
		},
		guide_kibbus : function(){
			var self = this

			kibbus.coordenates = this.positions.slice(1)
			kibbus.move()

			this.follow_positions( this.positions.slice(1),function(){
					if( !plot.on_house({x:kibbus.x,y:kibbus.y}))
						self.start()
				})
		},
		bees_finish : function(){

			for (var i = this.bees.length - 1; i >= 0; i--)
				if(!this.bees[i].data.finish)
					return false
			
			return true
		}
	}
}

GO_CHECK = 0
CHECK = 1
REPORT = 2
FOLLOW_POSITIONS = 3
JUST_GO = 4

bees = ["bee2.svg"]

function bee(position){
	// if( typeof this.img === 'undefined' ){
		this.img = 	paper.image( "img/" + bees[0] , position.x * 50, position.y * 50, 50 , 50 ).toBack()

		this.bee_img = $( this.img.node )

		this.data = this.bee_img.data()

		this.bee_img.data("last_position" , position )
		this.bee_img.data("img" , this.img )
		this.bee_img.data("visited" , [])
		this.bee_img.data("angle" , 0)
		this.bee_img.data("temperature" , null)
		this.bee_img.data("position" , position)
		this.bee_img.data("finish" , false)
		this.bee_img.data("positions" , [])

		this.bee_img.data("spin_translate" , function(agle, position , acction){
			var self = this
			
			this.img.animate({
				transform : "r" + angle
			}, utils.calculate_velocity(75) , function(){
				self.angle = angle
				self.translate(position , 400 , acction)
			})

		})

		this.bee_img.data("translate" , function(position, time , acction ){
			var self = this

			time = utils.calculate_velocity(time)

			this.img.animate({
				x : position.x * 50,
				y : position.y * 50 ,
				transform : "r" + this.angle
			}, time , function(){
				self.last_position = self.position
				self.position = position
				self.acction(acction)
			})
		})

		this.bee_img.data("acction" , function(acction){
			switch(acction){
				case GO_CHECK:
					this.go()
				break;
				case CHECK:
					this.checked = plot.get_temperature(this.position)

					if(!utils.tuple_not_on_list(this.position , this.visited)){
						this.checked -= 1
						plot.freeze(this.position, this.checked )
					}else
						this.visited = utils.add_tuple( this.position , this.visited)

					this.go_back()

					break;
				case REPORT:
					this.temperature = this.checked

					break;
				case FOLLOW_POSITIONS:
					this.next_position()
					break;

			}
		})

		this.bee_img.data("move" , function(position , time , acction ){
			
			angle = utils.calculate_angle(this.position.x  , this.position.y , position.x , position.y )

			if (angle != this.angle )
				this.spin_translate( angle , position , acction)
			else
				this.translate(position , time , acction )

		})

		this.bee_img.data("go_back" , function(){
			this.move( this.last_position , 400 , REPORT)
		})

		this.bee_img.data("go" , function(){

			positions = utils.posibles_movents( this.position , self.visited )
			
			if(positions.length > 0 ){
				index = Math.floor((Math.random() * positions.length ) )
				this.move(positions[index], 400 , CHECK )
			}
		})

		this.bee_img.data("next_position" , function(){

			if( this.positions.length > 0)
				this.move(this.positions.shift(), 400 , FOLLOW_POSITIONS)
			else
				this.finish = true
		})
	// }
}

bee.prototype = {

	search_home: function(){
		this.data.finish = false
		this.data.go()
	},
	follow_positions : function(positions){

		this.data.positions =   positions.slice(0)
		
		this.data.next_position()
	}
}