var plot = {
    width : 0,
    height : 500,
    grid : false,
    grid_up : false,
    set_size : function(){
        
        var container = $("#container")
        plot_div = $("#plot").width(function(){
            plot.width = container.width() - 220
            plot.width = plot.width - ( plot.width % 50 )
            return plot.width
        })
    
        $("#controls").width(function(){
            return container.width() - plot.width - 21
        })
    
        paper = new Raphael(document.getElementById('plot'), plot_div.width() , plot_div.height() );
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
    
        obstacles = paper.set()
    
        var forest = ["fire.svg" , "flor.svg" , "flower.svg" , "flowers.png" , "river2.svg" , "river3.svg" , "rock.svg" , "tree.png", "tree.svg" , "tree2.svg" , "tree3.jpg" , "tree4.jpg" , "tree5.svg" , "tree6.svg" , "tree7.svg" , "tree8.svg", "tree9.svg" , "tree10.svg" , "tree11.svg" , "tree12.svg" ,"tree13.svg"]
    
        obstacles.remove()
    
        for (i=0; i<times; i++){
            x = Math.floor((Math.random() * width ) )
            y = Math.floor((Math.random() * width ) )
            img_index = Math.floor((Math.random() * forest.length ) )
        
            obstacles.push( paper.image("img/forest/" + forest[img_index], x * 50, y * 50, 50, 50) )
        }
    }
}