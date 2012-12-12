var thread = {
    find_way : function(list , house_position , node){
        var stack = []
        
        stack.push({
            list:list.slice(), 
            node:node
        })

        while(stack.length != 0 ){
            element = stack.pop()

            element.list.push(element.node.position)

            if( this.same_positions(house_position , element.node.position ))
                return element.list
                    

            var child = this.sort_ways(element.node.ways)

            child.reverse()

            for (var i = child.length - 1; i >= 0; i--) {
                if( !this.in_list( element.list , child[i].node.position )){
                    stack.push({
                        list:element.list.slice(), 
                        node:child[i].node
                    })
                }
            }

        }

    },
    sort_ways : function(costs){
        var ways = costs.slice(0)
        list = []

        total = ways.length

        while(list.length != total){
            candidate = 0

            mayor = ways[candidate]

            for (var i = candidate + 1; i < ways.length; i++) {
                if(ways[i].value > ways[candidate].value )
                    candidate = i
            }

            list.push(ways[candidate])
            ways.splice(candidate , 1)
        }

        return list
    },
    same_positions : function(pos1 , pos2){
        return pos1.x == pos2.x && pos1.y == pos2.y
    },
    in_list : function(list , element ){
        for (var i = list.length - 1; i >= 0; i--)
            if(list[i].x == element.x && list[i].y == element.y)
                return true

        return false
    }
}

self.addEventListener('message', function(e) {
    var data = e.data
    self.postMessage( thread.find_way( [] , data.house_position , data.node ) )
}, false);