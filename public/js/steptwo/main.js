var paper
var slider

$(document).ready(function(){
    
    slider = $( "#slider-vertical" ).slider({
        orientation: "vertical",
        range: "min",
        min: 10,
        max: 90,
        value: 30,
        slide: function( event, ui ) {
            if(!forest.forest_working){
                forest.set_forest(ui.value)
            }
            $("#slider-value").val(ui.value)
        }
    });    
    
    plot.init()

    $("#set_grid").click(function(){ plot.set_grid()})
    
    $("#house").click(function(){ plot.set_house()})

    $("#set_kibbus").click(function(){ plot.set_kibbus()})

    $("#go_home").click(function(){ kibbus.search_home()})

    $("#show_flags").click(function(){plot.show_flags()})
    
    $("#instruction").popover({
        title : "What to do?",
        content : "<b>First:</b> Click on \"Set house button\", then click on the forest where you want the house.<br /><b>Second:</b> Click where you want to Kibbus start to look for the house.<br /><b>Third:</b> Click on \"Go home\" and watch how kibbus do his maximum effort to get home.",
        placement : "bottom"
    })
    
    $("#why").popover({
        title : "My AI school project",
        content : "This is the second step to make Kibbus intelligent, now Kibbus knows his house's position, he has to look for a way through the forest, Kibbus always draws a straight line between him and the house to follow and when come across an obstacle, he moves to another place and he tries to follow a new straight line to get home.<br />He has a system of flags to know the places where he already has been, if the flag is red is considered as a bad place to go and Kibbus are not gonna be there again.<br />Please if you find some bug let me know :D",
        placement : "bottom"
    })
})