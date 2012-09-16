var width = 22
var height = 10
var paper
var obstacles

var forest = ["fire.svg" , "flor.svg" , "flower.svg" , "flowers.png" , "river2.svg" , "river3.svg" , "rock.svg" , "tree.png", "tree.svg" , "tree2.svg" , "tree3.jpg" , "tree4.jpg" , "tree5.svg" , "tree6.svg" , "tree7.svg" , "tree8.svg", "tree9.svg" , "tree10.svg" , "tree11.svg" , "tree12.svg" ,"tree13.svg"]

$(document).ready(function(){
    
    plot.set_size()
    
    kibbus.cow = paper.image( "img/cow.svg" , 100 , 100 , 50 , 50 )
    
    $("#random").click(function(){
        plot.random(paper, 150 )
    })
    
    $("#set_grid").click(function(){
        plot.set_grid()
    })
})

$(document).keydown(function(key){
    kibbus.move(key.keyCode)
})