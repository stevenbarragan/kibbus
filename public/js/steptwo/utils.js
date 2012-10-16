utils = {
    invert_angle:function(angle){
        switch(angle){
            case 180:
                return 0
            case 0:
                return 180
            case 90:
                return -90
            case -90:
                return 90
            case 135:
                return -45
            case 215:
                return 45
            case 45:
                return -135
            case -45:
                return 135
            default:
                return -angle
        }
    },
    calculate_angle : function(x0, y0, x1 , y1){
        var move
        var angle
        
        if( x0 != x1){
            if( y0 == y1){
                if( x0 < x1 ){
                    move = RIGTH
                    angle = -90
                }else{
                    move = LEFT
                    angle = 90
                }
            }else{
                if( x0 < x1 ){
                    if( y0 < y1 ){
                        move = DownRIGTH
                        angle = -45
                    }else{
                        move = UpRIGTH
                        angle = 215
                    }
                }else{
                    if( y0 < y1 ){
                        move = DownLEFT
                        angle = 45
                    }else{
                        move = UpLEFTH
                        angle = 135
                    }
                }
            }
        }else{
            if( y0 == y1){
                move = false
                angle = kibbus.angle
            }else{
                if( y0 > y1 ){
                    move = UP
                    angle = 180
                }else{  
                    move = DOWN
                    angle = 0
                }
            }
        }
        
        return angle
    }
}