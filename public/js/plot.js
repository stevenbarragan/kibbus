var plot = {
    canvas : false,
    house : false,
    width : 0,
    height : 500,
    grid : false,
    grid_up : false,
    obstacles : {},
    obstacles_set : false,
    forest:["fire.svg" , "flor.svg" , "flower.svg" , "flowers.png" , "river2.svg" , "river3.svg" , "rock.svg" , "tree.png", "tree.svg" , "tree2.svg" , "tree3.jpg" , "tree4.jpg" , "tree5.svg" , "tree6.svg" , "tree8.svg", "tree9.svg" , "tree10.svg" , "tree11.svg" , "tree12.svg" ,"tree13.svg" , "flor2.svg" , "tree7.svg"],
    init: function(){
        this.set_size()
        this.obstacles_set = paper.set()
        this.random(50)
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
            return container.width() - plot.width
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
                patron = "M 0 " + i + " l " + this.width + " 0"
                this.grid.push( paper.path(patron) )
            }
            this.grid.attr({
                opacity: 0
            })
        }
        if(this.grid_up){
            
            this.grid.animate({
                opacity: 0
            }, 400 , "<>")
            
            this.grid_up = false
        }else{
            this.grid.animate({
                opacity: 0.4
            }, 400 , "<>")
            
            this.grid_up = true
        }
    },
    random : function(percent){
        
        width = this.width / 50
        height = this.height / 50
        
        times = percent * height * width / 100
        
        this.obstacles = {}
        this.obstacles_set.remove()
        
        for (i=0; i<height; i++){
            this.obstacles[i] = new Array()
        }
    
        for (i=0; i< times ; i++){
            do{

                x = Math.floor((Math.random() * width ) )
                y = Math.floor((Math.random() * height ) ) 

            }while( this.obstacles[y].indexOf(x) != -1 )

            this.obstacles[y] = this.obstacles[y].concat(x)
        
            img_index = Math.floor((Math.random() * ( this.forest.length )) )

            this.obstacles_set.push( paper.image("img/forest/" + this.forest[img_index], x * 50, y * 50, 50, 50)
                .attr({
                    opacity:0
                }))
        }
        
        setTimeout(function(){
            plot.obstacles_set.animate({
                opacity:1
            }, 500 , ">") , 100
        })
    },
    set_house: function(x, y){
        this.canvas.mousemove(function(position){
            
            x = position.pageX - ( position.pageX % 50 )
            y = position.pageY - ( position.pageY % 50 ) - 50
            
            if( !plot.is_obstacle(x / 50, y / 50)){
                
                if(!plot.house){
                    plot.house = paper.image( "img/house.svg" , x , y, 50 , 50 )
                }
                
                plot.house.animate({
                    x : x,
                    y : y
                }, 20 , "<>")
            }
        })
        
        this.canvas.click(function(param){
            plot.canvas.unbind("mousemove")
            plot.canvas.unbind("click")
            
            kibbus.x = Math.floor( param.pageX / 50  )
            kibbus.y = Math.floor( (param.pageY - 50) / 50 )
            
            kibbus.init()
            plot.house.toFront()
        })
    },
    is_obstacle: function(x,y){
        if( this.obstacles[y].indexOf(x) != -1 )
            return true
        return false
    }
}