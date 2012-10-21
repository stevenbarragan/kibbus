var RIGTH =     68
var LEFT =      65
var UP =        87
var DOWN =      88
var UpRIGTH =   69
var UpLEFTH =   81
var DownRIGTH = 67
var DownLEFT =  90

var kibbus = {
    images : ["cow.svg" , "green-cow.svg" , "blue-cow.svg", "elephant.svg"],
    angle : 0,
    cow : false,
    x:-1,
    y:-1,
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
        
        if( this.visited_list != undefined ){
            $.each(this.visited_list , function(index,item){
                item.image.animate({
                    opacity:0
                } , 350 , function(){
                    this.remove()
                })
            })
        }
        
        this.visited_list = []
        this.coordenates =[]
        
        this.last.x = this.x
        this.last.y = this.y
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
    transtale_slow: function(pos, search_home){
        
        if( plot.on_house(pos))
            opacity = 0
        else
            opacity = 1
        
        this.cow.animate({
            x : pos.x * 50,
            y : pos.y * 50,
            transform: "r" + this.angle,
            opacity : opacity
        }, 400 , "linear", function(){

            kibbus.last.set(kibbus.x, kibbus.y)

            kibbus.x = pos.x
            kibbus.y = pos.y
            
            kibbus.visit(pos)
            
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
            
            if( !plot.is_obstacle(position) && !this.is_visited(position)){
                
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
        
        positions = utils.posibles_movents({x:this.x,y:this.y})
        
        if(positions.length > 0 ){
            index = Math.floor((Math.random() * positions.length ) )
            
            this.coordenates = new Array({
                x:positions[index].x,
                y:positions[index].y
            })
            
            this.move(true)
        
        }else{
            if( !this.last.compare({x:this.x,y:this.y}) && !this.is_visited({x:this.x,y:this.y})){
                this.coordenates = [{x:this.last.x , y:this.last.y}]
                this.move(true)
            }
            else
                alert("I'm lost")
        }
    
    },
    visit: function(pos){
        visited = $.grep( this.visited_list , function( visited ){
            return visited.x == pos.x && visited.y == pos.y
        })
        
        if( visited.length > 0 ){
            
            visited[0].times++
            switch(visited[0].times){
                case 2:
                    visited[0].image.animate({
                        fill: "#FFFC00"
                    } , 0 )
                    break;
                case 3:
                    visited[0].image.animate({
                        fill: "#FF8000"
                    } , 0 )
                    break;
                case 4:
                    visited[0].image.animate({
                        fill: "#0DB8AD"
                    } , 0  )
                    break;
                case 5:
                    visited[0].image.animate({
                        fill: "#FF0000"
                    } , 0  )
                    break;
                default:
                    alert("error")
            }
        }else{
            this.add_visited(pos)
        }
    },
    is_visited : function(pos){
        visited = $.grep( this.visited_list , function( visited ){
            return visited.x == pos.x && visited.y == pos.y
        })
        
        if( visited.length > 0 && visited[0].times > 4)
            return true
        return false
    },
    add_visited: function(pos){
        this.visited_list.push({
            x:pos.x,
            y:pos.y,
            times:1,
            image:paper.circle( ( pos.x * 50) + 25, (pos.y * 50) + 25, 6).attr("fill", "#adff2f").toBack()
        })
    }
}