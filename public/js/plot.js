var plot = {
    canvas : false,
    house : false,
    width : 0,
    height : 500,
    grid : false,
    grid_up : false,
    obstacles : {},
    obstacles_set : false,
    
    init: function(){
        this.set_size()
        this.obstacles_set = paper.set()
        forest.init()
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
            return container.width() - plot.width - 1
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
            }, 400 , ">")
            
            this.grid_up = false
        }else{
            this.grid.animate({
                opacity: 0.4
            }, 400 , "<")
            
            this.grid_up = true
        }
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
            
            kibbus.x = Math.floor( plot.house.attr("x") / 50  )
            kibbus.y = Math.floor( plot.house.attr("y")  / 50 )
            
            kibbus.init()
            plot.house.toFront()
        })
    },
    is_obstacle: function(x,y){
        if( forest.obstacles[y].indexOf(x) != -1 )
            return true
        return false
    },
    on_house: function( x , y){
        if( this.house && x * 50 == this.house.attr("x") &&  y * 50 == this.house.attr("y"))
            return true
        return false
    },
    valid_position : function(x, y){
        if( x >= 0 && y >= 0 && x < this.width / 50 && y < this.height / 50 )
            return true
        return false
    }
}