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
    last:{
        x:-1,
        y:-1,
        set: function(x , y ){
            this.x = x
            this.y = y
        },
        compare: function(pos){
            if(this.x == pos.x && this.y == pos.y)
                return true
            return false
        }
    },
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
    translate_fast: function(position){
        this.cow.animate({
            x : position.x * 50,
            y : position.y * 50,
            transform: "r" + this.angle,
            opacity : 1
        }, 20, "bounce")
    },
    transtale_slow: function(position, search_home){
        
        if( plot.on_house(position))
            opacity = 0
        else
            opacity = 1
        
        this.cow.animate({
            x : position.x * 50,
            y : position.y * 50,
            transform: "r" + this.angle,
            opacity : opacity
        }, 400 , "linear", function(){
            if( search_home ){
                kibbus.search_home()
            }else{
                kibbus.move()
            }
        })
        
    },
    move : function(search_home){
        if( this.coordenates.length > 0 ){
            position = this.coordenates.shift()

            angle = utils.calculate_angle( this.x, this.y , position.x, position.y)
            
            if( !plot.is_obstacle(position) ){
                
                this.last.set(this.x, this.y)
                
                this.x = position.x
                this.y = position.y
                
                if( angle != this.angle){
                    this.angle = angle
                    this.spin()
                    setTimeout(function(){
                        kibbus.transtale_slow(position, search_home)
                    } , 250 )
                }else{
                    this.transtale_slow(position,search_home)
                }
            }else{
                this.find_other_way()
            }
        }
    },
    search_home : function(){
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
    },
    find_other_way : function(){
        
        checked = {}
        checked[this.x-1] = new Array()
        checked[this.x] = new Array()
        checked[this.x+1] = new Array()
        
        pos = {}
        
        do{
            pos.x = Math.floor((Math.random() * 3 ) ) -1 + this.x
            pos.y = Math.floor((Math.random() * 3 ) ) -1 + this.y
            
            visited = false
            
            if( checked[pos.x].indexOf(pos.y) != -1 )
                visited = true
            else{
                checked[pos.x] = checked[pos.x].concat(pos.y)
            }
            
            checked_length = utils.get_length(checked)
        }
        while( visited || (pos.x == this.x && pos.y== this.y) || plot.is_obstacle(pos) || this.last.compare(pos) && checked_length < 7 )
            
        if(checked_length == 7){
            this.coordenates = [last.x , last.y]
        }else{
            this.coordenates = new Array({
                x:pos.x,
                y:pos.y
            })
        }

        this.move(true)
    }
}