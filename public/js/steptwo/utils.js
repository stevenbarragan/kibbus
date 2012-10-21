utils = {
    invert_angle: function(angle){
        angle2 = angle + 180
        
        if(angle2>=360)
            return angle2 -360        
        return angle2
    },
    calculate_angle : function(x0, y0, x1 , y1){
        if( x0 != x1){
            if( y0 == y1){
                if( x0 < x1 ){
                    angle = -90
                }else{
                    angle = 90
                }
            }else{
                if( x0 < x1 ){
                    if( y0 < y1 ){
                        angle = -45
                    }else{
                        angle = 215
                    }
                }else{
                    if( y0 < y1 ){
                        angle = 45
                    }else{
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
                    angle = 180
                }else{
                    angle = 0
                }
            }
        }
        
        return angle
    },
    get_length : function(arr){
        sum = 0
        $.each(arr, function(elemen){
            sum += elemen.length
        })
        return sum
    },
    posibles_movents : function(pos){
        pos_list = []
        
        for(x=pos.x-1; x<= pos.x + 1 ; x++){
            for(y=pos.y-1;y<=pos.y + 1 ; y++){
                pos2 = { x:x, y:y }
                if( plot.valid_position(pos2) && (x != pos.x || y != pos.y ) && !plot.is_obstacle(pos2) && !kibbus.is_visited(pos2) && !kibbus.last.compare(pos2))
                    pos_list.push(pos2)
            }
        }
        return pos_list
    }
}