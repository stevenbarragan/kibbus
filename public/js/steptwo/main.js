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
    
    $("#instruction").popover({
        title : "Try to lose Kibbus",
        content : "<b>First:</b> Click on \"Set house button\", then click on the forest you want the house.<br /><b>Second:</b> Try to lose Kibbus: Keys to move him.<br /><pre>Q W E\nA   D\nZ X C</pre>\n<b>Third</b>: Click on \"Come back\" and watch if Kibbus is lost.",
        placement : "bottom"
    })
    
    $("#why").popover({
        title : "My AI school project",
        content : "This is the first step to make Kibbus intelligent, today he only have \"memory\", a so basic intelligent way, but it let him come back home.<br />Step by step Kibbus is going to be getting smarter and smarter, he will have another ways of intelligent.<br />Please let me know if you find some bugs :D",
        placement : "bottom"
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