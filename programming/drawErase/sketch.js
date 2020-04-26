
circles = [];

function setup() {
	createCanvas(windowWidth,windowHeight*0.95);
	background(255);
	angleMode(DEGREES);
	stroke(0);

	for(i=0;i<2;i++){
		circles.push(new Circle(i));
	}
}

function draw(){
	for(i=0;i<circles.length;i++){
		circles[i].display();
	}
}


function Circle(N){
	this.x = width*0.5;
	this.y = height*0.5;
	this.d = height*0.8/2;

	this.r = this.d*0.175;
	this.n = N*900;
	this.f = N*255;
	this.m;

	this.display = function(){
		stroke(this.f);
		if(this.n>0){
			stroke(0,0,0,0);
		}

		this.m = map(noise(this.n*0.01),0,1,0.1,1.25);

		let x = sin(this.n)*(this.d*this.m)+this.x;
		let y = cos(this.n)*(this.d*this.m)+this.y;
		
		for(e=0;e<360;e++){
			let xx = sin(e-this.n)*this.r+x;
			let yy = cos(e-this.n)*this.r+y;
			point(xx,yy);
		}
		this.n-=0.75;
	}
}