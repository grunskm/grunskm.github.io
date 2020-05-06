//// GRID IMAGE PAINTING///////


let rows = 10;
let cols = 10;
let grid = [];
let size;
let on = false;


function setup() {
	createCanvas(windowWidth,windowHeight*0.95);
	noStroke();
	size = width*0.2;
	for(i=0;i<rows;i++){
		for(e=0;e<cols;e++){
			grid[i*cols+e] = new SingleGrid(e,i,size,floor(random(2,10)));
			grid[i*cols+e].display();
		}
	}
}


function draw(){
	if(on==true){
	for(i=0;i<rows;i++){
		for(e=0;e<cols;e++){
			grid[i*cols+e].hit();
			grid[i*cols+e].display();
		}
	}
	}

}

function mousePressed(){
	if(on ==false){
		on=true;
	}else{on = false;}
}


function SingleGrid(X,Y,S,N){
	this.x = X*size;
	this.y = Y*size;

	this.s = S;
	this.n = N;		
	this.grid = [];

	
	for(p=0;p<this.n;p++){
		for(l=0;l<this.n;l++){
			this.grid[p*this.n+l] = new Square(p,l,this.s/this.n);
		}
	}

	this.display = function(){
		fill(random(0,255));
		//rect(this.x,this.y,this.w,this.w);
		for(p=0;p<this.n;p++){
			for(l=0;l<this.n;l++){
				this.grid[p*this.n+l].display(this.x,this.y);
			}
		}
	}

	this.hit = function(){
		if(mouseX>this.x && mouseX<this.x+this.s && mouseY>this.y && mouseY<this.y+this.s){
			this.n = floor(random(2,20));
			for(a=0;a<this.n;a++){
				for(s=0;s<this.n;s++){
					this.grid[a*this.n+s] = new Square(a,s,this.s/this.n);
				}
			}
		}
	}
}

function Square(X,Y,S){
	this.n = floor(random(2,10));
	this.x = X*S;
	this.y = Y*S;
	this.s = S;
	this.c = [random(0,255),random(0,255),random(0,255)];
	
	this.display = function(X,Y){
		fill(this.c[0],this.c[1],this.c[2]);
		rect(this.x+X,this.y+Y,this.s,this.s);
	}
// 	this.reColour = function(){
// 		for(q=0;q<3;q++){
// 			this.c[q] = random(0,255);
// 		}
// 	}

}
