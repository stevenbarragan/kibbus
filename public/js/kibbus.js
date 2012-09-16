var kibbus
var RIGTH = 68
var LEFT = 65
var UP = 87
var DOWN = 88
var UpRIGTH = 69
var UpLEFTH = 81
var DownRIGTH = 67
var DownLEFT = 90
    
kibbus = {
    moving: false,
    spining: false,
    angle : 0,
    cow : false,
    x:2,
    y:2,
    init : function(){
        
    },
    spin: function(){
        this.spining = true
        this.cow.animate({
            transform: "r" + this.angle
        }, 100, ">" , function(){
            kibbus.spining = false
        });
    },
    translate: function(){
        this.moving = true
        this.cow.animate({
            x : this.x * 50,
            y : this.y * 50,
            transform: "r" + this.angle
        }, 500 , "<>", function(){
            kibbus.moving = false
        })
    },
    move : function(where){
        var x = this.x
        var y = this.y
        if(!this.spining){
            angle = this.angle
            switch(where){
                case UP:
                    y = this.y - 1
                    angle = 180
                    break;
                case DOWN:
                    y = this.y + 1
                    angle = 0
                    break;
                case LEFT:
                    x = this.x - 1
                    angle = 90
                    break;
                case RIGTH:
                    x = this.x + 1
                    angle = -90
                    break;
                case UpLEFTH:
                    x = this.x - 1
                    y = this.y - 1
                    angle = 135
                    break;
                case UpRIGTH:
                    x = this.x + 1
                    y = this.y - 1
                    angle = 215
                    break;
                case DownLEFT:
                    x = this.x - 1
                    y = this.y + 1
                    angle = 45
                    break;
                case DownRIGTH:
                    x = this.x + 1
                    y = this.y + 1
                    angle = -45
                    break;
            }
            if( !plot.is_obstacle(x, y)){
                this.x = x
                this.y = y
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
    }
}