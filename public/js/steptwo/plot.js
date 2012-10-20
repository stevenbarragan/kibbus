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
            for( var i = 0; i < this.width / 50 ; i++){
                for( var j = 0; j < this.height / 50 ; j++){
                    this.grid.push(paper.text(i*50 + 15  , j*50 + 5, i + " " + j))
                }
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
    set_house: function(){
        this.canvas.mousemove(function(position){
            
            x = position.pageX - ( position.pageX % 50 )
            y = position.pageY - ( position.pageY % 50 ) - 50
            
            if( !plot.is_obstacle({ x:x / 50,  y : y / 50})){
                
                if(!plot.house){
                    plot.house = paper.image( "img/house.svg" , x , y, 50 , 50 )
                }
                
                plot.house.animate({
                    x : x,
                    y : y
                }, 20 , "bounce")
            }
        })
        
        this.canvas.click(function(param){
            plot.canvas.unbind("mousemove")
            plot.canvas.unbind("click")
            
            plot.house.toFront()
            
            plot.set_kibbus()
        })
    },
    is_obstacle: function(coordenates){
        if( this.valid_position(coordenates) ){
            if(forest.obstacles[coordenates.y].indexOf(coordenates.x) != -1 ){
                return true
            }
        }else{
            return true
        }
        return false
    },
    on_house: function(position){
        if( this.house && position.x * 50 == this.house.attr("x") &&  position.y * 50 == this.house.attr("y"))
            return true
        return false
    },
    on_kibbus : function(position){
        if( kibbus.x == position.x && kibbus.y == position.y)
            return true
        return false
    },
    valid_position : function(coordenates){
        if( coordenates.x >= 0 && coordenates.y >= 0 && coordenates.x < this.width / 50 && coordenates.y < this.height / 50 )
            return true
        return false
    },
    set_kibbus: function(){
        
        this.canvas.mousemove(function(position){
            
            pos = {}
            
            pos.x = ( position.pageX - ( position.pageX % 50 ) ) / 50
            pos.y = ( position.pageY - ( position.pageY % 50 ) - 50 ) / 50
            
            if( !plot.is_obstacle(pos)){
                
                if(!kibbus.cow){
                    kibbus.init()
                }else{
                    kibbus.translate_fast(pos)
                }
            }
        })
        
        this.canvas.click(function(param){
            plot.canvas.unbind("mousemove")
            plot.canvas.unbind("click")
            
            kibbus.x = Math.floor( kibbus.cow.attr("x") / 50  )
            kibbus.y = Math.floor( kibbus.cow.attr("y")  / 50 )
        })
    }
}