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
    }
}