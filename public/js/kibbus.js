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
        angle : 0,
        x:2,
        y:2,
        rotate : function( angle ){
            this.cow.animate({
                transform: "r" + angle,
                x : this.x,
                y : this.y
            }, 1000, "elastic");
        },
        translate: function( x , y){
            this.x = x
            this.y = y
            this.cow.animate({
                x : x * 50,
                y : y * 50,
                transform: "r" + this.angle
            }, 500 , "<>", function(){
                kibbus.moving = false
            })
        },
        move : function(where){
            if(!this.moving || true){
                this.moving = true
                switch(where){
                    case UP:
                        this.y--
                        this.angle = 180
                        break;
                    case DOWN:
                        this.y++
                        this.angle = 0
                        break;
                    case LEFT:
                        this.x--
                        this.angle = 90
                        break;
                    case RIGTH:
                        this.x++
                        this.angle = -90
                        break;
                    case UpLEFTH:
                        this.x--
                        this.y--
                        this.angle = 135
                        break;
                    case UpRIGTH:
                        this.x++
                        this.y--
                        this.angle = 215
                        break;
                    case DownLEFT:
                        this.x--
                        this.y++
                        this.angle = 45
                        break;
                    case DownRIGTH:
                        this.x++
                        this.y++
                        this.angle = -45
                        break;
                }   
                this.translate(this.x, this.y)
            }
        }
    }
})