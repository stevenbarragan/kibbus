var width = 22
var height = 10
var paper
var obstacles

var forest = ["fire.svg" , "flor.svg" , "flower.svg" , "flowers.png" , "river2.svg" , "river3.svg" , "rock.svg" , "tree.png", "tree.svg" , "tree2.svg" , "tree3.jpg" , "tree4.jpg" , "tree5.svg" , "tree6.svg" , "tree7.svg" , "tree8.svg", "tree9.svg" , "tree10.svg" , "tree11.svg" , "tree12.svg" ,"tree13.svg"]

$(document).ready(function(){
    plot.init()
    
    $("#random").click(function(){
        plot.random(paper, 75 )
    })
    
    $("#set_grid").click(function(){
        plot.set_grid()
    })
    
    $("#house").click(function(){
        plot.set_house()
    })
    $("#back").click(function(){
        kibbus.come_back()
    })
})

$(document).keydown(function(key){
    if(kibbus.cow){
        kibbus.move(key.keyCode)
    }
})