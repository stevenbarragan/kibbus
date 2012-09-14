$(document).ready(function(){
    
    var width
    
    var container = $("#container")

    height =  480

    plot = $("#plot").width(function(){
        width = container.width() - 200
        width = width - ( width % 50 )
        return width 
    })
    
    $("#controls").width(function(){
        return container.width() - width
    })
    
    var paper = new Raphael(document.getElementById('plot'), plot.width() , plot.height() );
    var map = paper.set();
    
    var patron, patron2
    for(var i = 50; i < width ; i+=50) {
        patron = "M " + i + " 0 l 0 " + height
        patron2 = "M 0 " + i + " l " + width + " 0"
        map.push( paper.path(patron) )
        map.push( paper.path(patron2) )
    }
    
    map.attr({
        opacity: 0.5
    })
})