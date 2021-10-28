//Declares Array along with the number of rows and columns
var cols = 25;
var rows = 25;
var grid = new Array(cols);

//declares width and height of nodes on the grid
var w,h;

//Declares Path Variable
var path = [];

//Declares the arrays to hold objects that have/havent been searched for
var openSet = [];
var closedSet = [];


//Declares the start and end of the traversal
var startNode;
var endNode;

var go = false;
function setup() {

    createCanvas(650,650);
	background(215);
	openSet = [];
	closedSet = [];
	path = [];
	w = width/cols;
	h = height/rows;
	//Creates 2D array
	for(i = 0;i< cols; i++){
		grid[i] = new Array(rows);
	}
	//Fills Array with Node objects
	for(i = 0;i< cols; i++){
		for(j = 0;j< rows; j++){
			grid[i][j] = new Node(i,j);
		}
	}
	//Adds Connections to each node
	for(i = 0;i< cols; i++){
		for(j = 0;j< rows; j++){
			grid[i][j].addNeighbors(grid);
		}
	}
		//Declares the start and end of the traversal
		startNode = grid[1][1];
		endNode = grid[cols -2][rows -2];
		//Makes sure start and end node do not become walls
		startNode.wall = false;
		endNode.wall = false;
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
		//Adds the start node to the list of nodes to be searched
		openSet.push(startNode);
}

//Animation Loop -- Used as while loop in A* algorithm
function draw() {
	background(215);
	if(go){
		//Search algorithm is called
		Astar();
	}
	for(i = 0;i< cols; i++){
		for(j = 0;j< rows; j++){
			grid[i][j].show(color(255));	//Show as white
		}
	}
	//Recolor the Places on the grid
	for(i = 0; i <closedSet.length; i++){
		closedSet[i].show(color(250, 65, 65));	
	}
	for(i = 0; i <openSet.length; i++){
		openSet[i].show(color(174, 252, 246));	
	}
	for(i = 0; i < path.length ; i++){
		path[i].show(color(0,255,0));	//Show as green
	}
	endNode.show(color(153, 148, 12));
	startNode.show(color(0,0,255));
}
