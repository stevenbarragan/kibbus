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
        
        times = 50 * this.unit
        
        for (i=0;i< times; i++){
            
            this.generate_new_position()
        
            img_index = Math.floor((Math.random() * ( this.images.length )) )

            this.obstacles_set.push( paper.image("img/forest/" + this.images[img_index], this.x * 50, this.y * 50, 50, 50)
                .attr({
                    opacity:0
                }))
        }
        
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
        
        if(times > this.obstacles_set.length ){
            do{
                this.generate_new_position()
                
                img_index = Math.floor((Math.random() * ( this.images.length )) )

                this.obstacles_set.push( paper.image("img/forest/" + this.images[img_index], this.x * 50, this.y * 50, 50, 50)
                    .attr({
                        opacity:0
                    }))
            }while(times > this.obstacles_set.length);
            
            this.obstacles_set.animate({
                opacity:1
            }, 150 , ">")
        }else{
            do{
                tree = this.obstacles_set.pop()

                y = tree.attr("y") / 50
               
                this.obstacles[y].pop()
                
                tree.animate({
                    opacity:0
                }, 150 , ">", function(){
                    this.remove()
                })
                
            }while(times < this.obstacles_set.length );
        }
        
        this.forest_working = false
    },
    generate_new_position:function(){
        do{
            this.x = Math.floor((Math.random() * width ) )
            this.y = Math.floor((Math.random() * height ) )

        }while( plot.is_obstacle(this.x, this.y) || plot.on_house(this.x , this.y) || plot.on_kibbus(this.x,this.y) );
        
        this.obstacles[this.y] = this.obstacles[this.y].concat(this.x)
    }
}