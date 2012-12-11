var thread = {
    find_way : function(list , house_position , nodo){
        list.push(nodo.position)

        if( this.same_positions(house_position , nodo.position )){
            this.ways = list
            return true
        }

        child = this.sort_ways(nodo.ways)

        for (var i = child.length - 1; i >= 0; i--) {
            if( !this.in_list( list , child[i].node ) ){
                if(this.find_way(list , house_position ,child[i].node ))
                    return true
            }
        }

        return false

    },
    find_way2 : function(list , house_position , node){
        var stack = []
        stack.push({ list:list , node:node })

        var iterations = 0

        while(stack.length != 0 ){
            iterations++
            element = stack.pop()

            element.list.push(element.node.position)

            if( this.same_positions(house_position , element.node.position )){
                return {list:element.list,iterations:iterations}
            }

            var child = this.sort_ways(element.node.ways)

            child.reverse()

            for (var i = child.length - 1; i >= 0; i--) {
                if( !this.in_list( element.list , child[i].node.position )){
                    stack.push({ list:element.list, node:child[i].node })
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

    self.postMessage( thread.find_way2( [] , data.house_position , data.node ) )


}, false);