function Node(x,y){

	//X and Y positions -- corespond to their position in the array
	this.x = x;
	this.y = y;
	//Node score attributes
	this.f = 0;
	this.g = 0;
	this.h = 0;
	//Determines wether node is defined as an obstacle or not
	this.wall = false;

	//list of connected Nodes
	this.neighbors = [];
	//Previos node in analysed path
	this.previous = undefined;
	
	//Displays node as a position on the grid
	this.show = function(color){
		fill(color);
		if(this.wall){
			fill(0); 
		}
		noStroke();
		rect(this.x*w ,this.y*h,w-1,h-1);
	}

	//Adds nieghboring nodes assuming the graph structure is a perfect Grid shape
	this.addNeighbors = function(grid){
		var i = this.x;
		var j = this.y;
		
		if(i < cols - 1){
			this.neighbors.push(grid[i+1][j]);
		}
	
		if(i > 0){
			this.neighbors.push(grid[i-1][j]);
		}
		if(j < rows - 1){
			this.neighbors.push(grid[i][j+1]);
		}
		if(j > 0){
			this.neighbors.push(grid[i][j-1]);
		}
	}
}