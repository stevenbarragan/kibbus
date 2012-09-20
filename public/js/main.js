var width = 22
var height = 10
var paper
var obstacles

$(document).ready(function(){
    plot.init()
    
    $("#random").click(function(){
        plot.random(50)
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
    switch(key.keyCode){
        case RIGTH:
        case LEFT:
        case UP:
        case DOWN:
        case UpRIGTH:
        case UpLEFTH:
        case DownRIGTH:
        case DownLEFT:
            if(kibbus.cow){
                kibbus.move(key.keyCode)
            }
    }
})