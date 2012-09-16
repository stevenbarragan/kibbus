var plot = {
    canvas : false,
    house : false,
    width : 0,
    height : 500,
    grid : false,
    grid_up : false,
    set_size : function(){
        
        var container = $("#container")
        this.canvas = $("#plot").width(function(){
            plot.width = container.width() - 220
            plot.width = plot.width - ( plot.width % 50 )
            return plot.width
        })
    
        $("#controls").width(function(){
            return container.width() - plot.width - 21
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
        }
        if(this.grid_up){
            this.grid.attr({
                opacity: 0
            })
            this.grid_up = false
        }else{
            this.grid.attr({
                opacity: 0.3
            })
            this.grid_up = true
        }
    },
    random : function(paper, times ){
    
        obstacles_set = paper.set()
        obstacles = {}
    
        var forest = ["fire.svg" , "flor.svg" , "flower.svg" , "flowers.png" , "river2.svg" , "river3.svg" , "rock.svg" , "tree.png", "tree.svg" , "tree2.svg" , "tree3.jpg" , "tree4.jpg" , "tree5.svg" , "tree6.svg" , "tree7.svg" , "tree8.svg", "tree9.svg" , "tree10.svg" , "tree11.svg" , "tree12.svg" ,"tree13.svg"]
    
        obstacles_set.remove()
        
        width = this.width / 50
        height = this.height / 50
        
        console.log(height)
        
        for (i=0; i<height; i++){
            obstacles[i] = new Array()
        }
    
        console.log(forest.length)
        for (i=0; i< times ; i++){
            do{

                x = Math.floor((Math.random() * width ) )
                y = Math.floor((Math.random() * height ) ) 

            }while( obstacles[y].indexOf(x) != -1 )

            obstacles[y] = obstacles[y].concat(x)
        
            img_index = Math.floor((Math.random() * ( forest.length )) )

            obstacles_set.push( paper.image("img/forest/" + forest[img_index], x * 50, y * 50, 50, 50) )
        }
        
        console.log( obstacles )
    },
    set_house: function(x, y){
        if(!this.house){
            this.house = paper.image( "img/cow.svg" , -50 , - 50, 50 , 50 )
        }
        
        this.canvas.mousemove(function(position){
            
            x = position.pageX - ( position.pageX % 50 )
            y = position.pageY - ( position.pageY % 50 )
            
            plot.house.animate({
                x : x,
                y : y - 50
            }, 15 , "<>")
        })
        
        this.canvas.click(function(param){
            plot.canvas.unbind("mousemove")
            plot.canvas.unbind("click")
            
            kibbus.x = Math.floor( param.pageX / 50  )
            kibbus.y = Math.floor( (param.pageY - 50) / 50 )
            
            if( !kibbus.cow ){
                kibbus.cow = this.house = paper.image( "img/cow.svg" , kibbus.x * 50 , kibbus.y * 50, 50 , 50 )   
            }else{
                console.log("changing de house")
                kibbus.init()
                kibbus.cow.animate({
                    x : kibbus.x *50, 
                    y : kibbus.y * 50
                }, 10 , "elasctic")
            }
        })
    }
}