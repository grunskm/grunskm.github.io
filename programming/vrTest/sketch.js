let frame;
let n = 25;
let size = 300;

function setup(){
	createCanvas(2220,1080);
	ellipseMode(CENTER);
	colorMode(HSB);
	frame = new img(width/2,height,0,0);
	noStroke();
	background(255);
	frame.display(0,0);
	frame.display(width/2,0);
}

// function draw(){
// 	background(255);
// 	frame.display(0,0);
// 	frame.display(width/2,0);
// }


function img(W,H,X,Y){
	this.ball = [];

	this.w = W;
	this.h = H;

	for(i=0;i<n;i++){
		this.ball.push(new Ball(random(size/2,W-size/2),random(size/2,H-size/2),map(i,0,n,0.25,1)));
	}

	this.display = function(X,Y){
		fill(255);
		rect(X,Y,this.w,this.h);

		for(i=0;i<n;i++){
			this.ball[n-1-i].display(X);
		}
	}

	function Ball(X,Y,D){
		this.depth = D;
		this.x = X;
		this.y = Y;
		this.s = size-(this.depth*size*0.9);
		this.c = random(0,255);
		
		
		this.display = function(x){
			this.x+= random(-1,1);
			this.y+= random(-1,1);
			this.off = map(x,0,width,-40,40)*this.depth; 
			let k = map(this.depth,0.25,1,100,10);
			fill(this.c,255,255,0.75);
			ellipse(this.x+x+this.off,this.y,this.s);
		}
	}
}


