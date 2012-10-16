var RIGTH =     68
var LEFT =      65
var UP =        87
var DOWN =      88
var UpRIGTH =   69
var UpLEFTH =   81
var DownRIGTH = 67
var DownLEFT =  90
    
var kibbus = {
    images : ["cow.svg" , "green-cow.svg" , "blue-cow.svg", "mouse.svg" , "elephant.svg"],
    moving: false,
    spining: false,
    angle : 0,
    cow : false,
    x:-1,
    y:-1,
    memory:[],
    coordenates:[],
    init : function(){

        var img = this.images[Math.floor( Math.random() * this.images.length )]
        
        if( !kibbus.cow ){
            kibbus.cow = paper.image( "img/" + img , kibbus.x * 50 , kibbus.y * 50, 50 , 50 )   
        }
                
        kibbus.cow.attr({
            src: "img/" + img
        }).animate({
            x : kibbus.x *50, 
            y : kibbus.y *50
        }, 10 , "elasctic").toFront()
        
    },
    spin: function(){
        this.spining = true
        this.cow.animate({
            transform: "r" + this.angle,
            opacity : 1
        }, 100, ">" , function(){
            kibbus.spining = false
        });
        
    },
    translate: function(speed){
        if(!speed){
            fast = 400
        }
        this.moving = true
        
        this.cow.animate({
            x : this.x * 50,
            y : this.y * 50,
            transform: "r" + this.angle,
            opacity : 1
        }, speed , "<>", function(){
            if( speed == 400 ){
                kibbus.move()
            }
        })
        
        slider.slider("disable")
    },
    move : function(){
        if( this.coordenates.length > 0 ){
            position = this.coordenates.shift()

            angle = utils.calculate_angle( this.x, this.y , position.x, position.y)
            
            if( !plot.is_obstacle(position.x, position.y) && plot.valid_position(position.x, position.y) || true ){
                this.x = position.x
                this.y = position.y
                if( angle != this.angle){
                    this.angle = angle
                    this.spin()
                    setTimeout(function(){
                        kibbus.translate()
                    } , 250 )
                }else{
                    this.translate()
                }
            }
        }
    },
    set_position : function(x ,  y){
        this.x = x
        this.y = y
    },
    go_home : function(){
        $.post("utils.php",
        {
            to_do:"bresenham",
            params : {
                x0 : kibbus.x,
                y0 : kibbus.y,
                x1 : plot.house.attr("x")/50,
                y1 : plot.house.attr("y")/50
            }
        }, function(data){
            kibbus.coordenates = data.points
            kibbus.move();
        }, 'json')
    }
}