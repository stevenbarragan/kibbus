var forest = {
	init: function(){
		
		this.forest_working = false
		
		width = plot.width / 50
		height = plot.height / 50
		this.unit = height * width / 100
		
		this.images= ["fire.svg" , "flor.svg" , "flower.svg" , "flowers.png" , "river2.svg" , "river3.svg" , "rock.svg" , "tree.png", "tree.svg" , "tree2.svg" , "tree3.jpg" , "tree4.jpg" , "tree5.svg" , "tree6.svg" , "tree8.svg", "tree9.svg" , "tree10.svg" , "tree11.svg" , "tree12.svg" ,"tree13.svg" , "flor2.svg" , "tree7.svg"],
			
		this.obstacles = {}
		this.obstacles_set = paper.set()
		
		for (i=0; i< height ; i++){
			this.obstacles[i] = new Array()
		}
		
		this.set_forest(30)
		
		setTimeout(function(){
			forest.obstacles_set.animate({
				opacity:1
			}, 500 , ">")
			if( kibbus.cow ){
				kibbus.cow.toFront()
			}
		} , 100
		)
			
	},
	set_forest : function(amount){
		this.forest_working = true
		
		times = amount * this.unit
		
		if(times - 2 > this.obstacles_set.length){

			do{
				pos = this.generate_new_position()
				
				img_index = Math.floor((Math.random() * ( this.images.length )) )

				this.obstacles_set.push(
					paper.image("img/forest/" + this.images[img_index], pos.x * 50, pos.y * 50, 50, 50)
					.attr({
						opacity:0
					}))

			}while(times - 2 > this.obstacles_set.length);
			
			this.obstacles_set.animate({
				opacity:1
			}, 150 , ">")
		}else{
			do{
				do{
					tree = this.obstacles_set.pop()
				}
				while(tree.id == null && this.obstacles_set.length > 0)

				if( tree.id != null){

					y = tree.attr("y") / 50
					x = tree.attr("x") / 50
				   
					this.remove_obstacle({x:x,y:y})
					
					tree.animate({
						opacity:0
					}, 150 , ">", function(){
						this.remove()
					})
				}
				
			}while(times < this.obstacles_set.length );
		}
		
		this.forest_working = false
	},
	generate_new_position:function(){
		pos = {}
		
		do{
			pos.x = Math.floor((Math.random() * width ) )
			pos.y = Math.floor((Math.random() * height ) )

		}while( plot.is_obstacle(pos) || plot.on_house(pos) || plot.on_kibbus(pos) );
		
		this.obstacles[pos.y] = this.obstacles[pos.y].concat(pos.x)
		
		return pos
	},
	remove_obstacle : function(pos){
		forest.obstacles[pos.y].splice( forest.obstacles[pos.y].indexOf(pos.x) , 1 )

		slider.slider("value" , slider.slider("value") - ( 1 / this.unit ) )
	},
	add_obstacle: function(pos,obscacle){
		this.obstacles[pos.y] = this.obstacles[pos.y].concat(pos.x)
		this.obstacles_set.push( obscacle )

		slider.slider("value" , slider.slider("value") + ( 1 / this.unit ) )

	},
	to_add:{
		img : false,
		seted: false
	},
	add_remove:function(status){
		if(!this.add_remove_status && !status){

			forest.obstacles_set
					.hover( obstacle_mouseover , obstacle_mouseout )
					.click(obstacle_click)

			img_index = Math.floor((Math.random() * ( this.images.length )) )
			
			pos = {}
			forest.to_add.img = false
			forest.to_add.seted = false

			plot.canvas.mousemove(function(position){
				pos.x = Math.floor(( position.pageX - this.offsetLeft ) / 50)
				pos.y = Math.floor(( position.pageY - this.offsetTop ) / 50)

				if(!forest.to_add.img) forest.to_add.img = paper.image("img/forest/" + forest.images[img_index], pos.x*50 , pos.y*50 , 50, 50).toBack()
				
				if(plot.is_obstacle({ x:pos.x,  y : pos.y})){
					forest.to_add.img.animate({
						x: pos.x*50,
						y: pos.y*50,
						opacity : 0
					} , 10 )
				}else{
					forest.to_add.img.animate({
						x: pos.x*50,
						y: pos.y*50,
						opacity : 1
					} , 50 )
				}
			})

			plot.canvas.click(function(position){
				pos.x = Math.floor(( position.pageX - this.offsetLeft ) / 50)
				pos.y = Math.floor(( position.pageY - this.offsetTop ) / 50)

				if(plot.is_obstacle(pos)){
					forest.remove_obstacle(pos)

				}else if(!plot.on_house(pos) && !plot.on_kibbus(pos)){
					forest.add_obstacle(pos , forest.to_add.img	 )
					forest.to_add.seted = true
					forest.add_remove()
					forest.add_remove()
				}
			})

			this.add_remove_status = true
		}else{
			this.add_remove_status = false
			if(!this.to_add.seted && this.to_add.img != false){				
				
				this.to_add.img.animate({opacity:0} , 400 , "linear" , function(){ this.remove() })
				this.to_add.img = false
				$("#add-remove").button('toggle')
			}

			forest.obstacles_set
				.unhover(obstacle_mouseover, obstacle_mouseout )
				.unclick(obstacle_click)

			plot.canvas.unbind("mousemove")
			plot.canvas.unbind("click")
		}
	},
	mouseover : function(item){
		item.animate({ opacity:0.3 }, 100 )
	},
	mouseout : function(item){
		item.animate({ opacity:1 }, 100 )
	}

}

obstacle_mouseover = function(){ forest.mouseover(this) }
obstacle_mouseout = function(){ forest.mouseout(this) }
obstacle_click = function(){
	forest.obstacles_set.splice( $.inArray( this , forest.obstacles_set ) , 1 )
	this.remove()
}