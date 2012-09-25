var paper
var slider

$(document).ready(function(){
    plot.init()
    
    $("#set_grid").click(function(){
        plot.set_grid()
    })
    
    $("#house").click(function(){
        plot.set_house()
    })
    $("#back").click(function(){
        kibbus.come_back()
    })
    
    slider = $( "#slider-vertical" ).slider({
        orientation: "vertical",
        range: "min",
        min: 10,
        max: 90,
        value: 50,
        slide: function( event, ui ) {
            if(!forest.forest_working){
                forest.set_forest(ui.value)
            }
            $("#slider-value").val(ui.value)
        }
    });
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