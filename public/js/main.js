var width = 22
var height = 10
var paper
var obstacles

var forest = ["fire.svg" , "flor.svg" , "flower.svg" , "flowers.png" , "river2.svg" , "river3.svg" , "rock.svg" , "tree.png", "tree.svg" , "tree2.svg" , "tree3.jpg" , "tree4.jpg" , "tree5.svg" , "tree6.svg" , "tree7.svg" , "tree8.svg", "tree9.svg" , "tree10.svg" , "tree11.svg" , "tree12.svg" ,"tree13.svg"]

$(document).ready(function(){
    var plot_width
    var container = $("#container")

    plot_height =  500
    plot = $("#plot").width(function(){
        plot_width = container.width() - 220
        plot_width = plot_width - ( plot_width % 50 )
        return plot_width 
    })
    
    $("#controls").width(function(){
        return container.width() - plot_width - 21
    })
    
    var paper = new Raphael(document.getElementById('plot'), plot.width() , plot.height() );
    var map = paper.set();
    
    var patron
    for(var i = 50; i < plot_width ; i+=50) {
        patron = "M " + i + " 0 l 0 " + plot_height
        map.push( paper.path(patron) )
        patron = "M 0 " + i + " l " + plot_width + " 0"
        map.push( paper.path(patron) )
    }
    
    map.attr({
        opacity: 0.3
    })
    
    $("#random").click(function(){
        random(paper, 150 )
    })
    
    obstacles = paper.set()
    
    kibbus.cow = paper.image( "img/cow.svg" , 100 , 100 , 50 , 50 )
})

$(document).keydown(function(key){
//    switch(key.keyCode){
//        case UP:
//        case DOWN:
//        case LEFT:
//        case RIGTH:
            kibbus.move(key.keyCode)
//    }
    console.log(key.keyCode)
})

function random(paper, times ){
    
    obstacles.remove()
    
    for (i=0; i<times; i++){
        x = Math.floor((Math.random() * width ) )
        y = Math.floor((Math.random() * width ) )
        img_index = Math.floor((Math.random() * forest.length ) )
        
        obstacles.push( paper.image("img/forest/" + forest[img_index], x * 50, y * 50, 50, 50) )
    }
}


