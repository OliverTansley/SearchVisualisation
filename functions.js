function ToggleGo(){
    go = (!go);
}

//Removes an item from an array
function Remove(arr,el){
	for (var i = arr.length -1; i >=0; i--){
		if(arr[i] == el){
			arr.splice(i,1);
		}
	}
}

//Uses pythag to calculate real distance as heuristic value
function PythagHeuristic(a,b){
	var d = dist(a.x,a.y,b.x,b.y);
	return d;
}

//Uses manhattan measurement to calculate a heuristic value
function ManhattanHeuristic(a,b){
	var d = abs(a.x-b.x) + abs(a.y-b.y); 
	return d;
}

function Reset(){

    go = false;

    for(i=0 ; i< rows; i++){
        for(j=0 ; j< cols; j++){
            grid[j][i].wall = false;
        }
    }
    closedSet = [];
    openSet = [];
    path = [];
    //Recolor the two sets (CLOSED AND OPEN)
	for(i = 0; i <closedSet.length; i++){
		closedSet[i].show(color(250, 65, 65))	
	}
	for(i = 0; i <openSet.length; i++){
		openSet[i].show(color(174, 252, 246))	
	}
    for(i = 0; i < path.length ; i++){
		path[i].show(color(0,255,0))	//Show as green
	}
	endNode.show(color(153, 148, 12));
    startNode.show(color(0,0,255));
    openSet.push(startNode);
}
//Generates obstacles randomly on the map
function RandomObstacle(){
    for(i=0;i<rows;i++){
        for(j=0;j<cols;j++){
            if(random(1) < 0.1){
                grid[j][i].wall = true;
            }
        }
    }
    startNode.wall = false;
    endNode.wall = false;
}

//Creates a random generated maze on the map
function RandomMaze(){

    for(i=0;i<cols;i++){
        grid[i][0].wall = true;
        grid[i][rows-1].wall = true;
    }
    for(i=0;i<rows;i++){
        grid[0][i].wall = true;
        grid[cols-1][i].wall = true;
    }

    for(i=0;i<cols;i+=2){
        for(j=0;j<rows;j++){
            if(random(1) < 0.7){
                grid[j][i].wall = true;
            }
        }
    }

    for(i=0;i<rows;i+=3){
        for(j=0;j<cols;j++){
            if(random(1) < 0.1){
                grid[i][j].wall = true;
            }
        }
    }

    startNode.wall = false;
    endNode.wall = false;

}

//A star search algorithm
function Astar(){
    if(openSet.length > 0){

		//Keep searching
		var lowestIndex = 0;
		for (i = 0; i < openSet.length; i++){
			if(openSet[i].f < openSet[lowestIndex].f){
				lowestIndex = i;
			}
		}
		
		var current = openSet[lowestIndex]

		if(current === endNode){
			
			path = [];
			var temp = current;
			path.push(temp);
			while(temp.previous){
				
				path.push(temp.previous);
				temp = temp.previous
				
			}

		}else{
		
			Remove(openSet, current);
			closedSet.push(current);
		
			var neighbors = current.neighbors;
		
			for(i = 0; i < neighbors.length; i++){
				var neighbor = neighbors[i];
		
				if(!closedSet.includes(neighbor) && !neighbor.wall){
					var tempG = current.g +1;
			
					if (openSet.includes(neighbor)){
						if(tempG< neighbor.g){
							neighbor.g = tempG;
						}
					}else {
						neighbor.g = tempG;
						openSet.push(neighbor);
					}
					neighbor.h = PythagHeuristic(neighbor, endNode);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
				}
			}
		}
	
	}else{
		console.log("There is no solution to this maze! :(")
	}

}