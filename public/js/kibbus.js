var kibbus
var RIGTH = 68
var LEFT = 65
var UP = 87
var DOWN = 88
var UpRIGTH = 69
var UpLEFTH = 81
var DownRIGTH = 67
var DownLEFT = 90
$(document).ready(function(){
    
    kibbus = {
        state : 6,
        moving: false,
        spining: false,
        angle : 0,
        cow : false,
        x:2,
        y:2,
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
            if(!this.spining){
                angle = this.angle
                switch(where){
                    case UP:
                        this.y--
                        angle = 180
                        break;
                    case DOWN:
                        this.y++
                        angle = 0
                        break;
                    case LEFT:
                        this.x--
                        angle = 90
                        break;
                    case RIGTH:
                        this.x++
                        angle = -90
                        break;
                    case UpLEFTH:
                        this.x--
                        this.y--
                        angle = 135
                        break;
                    case UpRIGTH:
                        this.x++
                        this.y--
                        angle = 215
                        break;
                    case DownLEFT:
                        this.x--
                        this.y++
                        angle = 45
                        break;
                    case DownRIGTH:
                        this.x++
                        this.y++
                        angle = -45
                        break;
                }
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
})