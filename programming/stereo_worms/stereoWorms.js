// stereoscopic worm sketch





let number_of_worms = 20;
let worm = [];
let r = 0;


function setup(){
	createCanvas(windowHeight*0.5*2.2,windowHeight*0.5);
	angleMode(DEGREES);
	stroke(0);
	noFill();

	for(i=0;i<number_of_worms;i++){
		worm.push(new Worm());
	}

}

function draw(){
	background(0);
	for(i=0;i<number_of_worms;i++){
		worm[i].move();
	}
	school(width*0.25,-20);
	school(width*0.75, 20);
}

function school(POSITION, OFF){
	fill(255);
	ellipse(POSITION+OFF*0.4, height/2, height-10);
	for(i=0;i<number_of_worms;i++){
		worm[i].show(POSITION, height/2, OFF);
	}

}

function Worm(){
	this.maxDepth = height*0.1;
	this.minDepth = height*0.4;
	this.z = random(this.maxDepth,this.minDepth);
	this.n = random(0,10000);
	this.speed = random(0.2,0.35);
	this.length = 20;


	this.show = function(X,Y,OFF){
		push();
			translate(X,Y);
			r+=0.003;
			rotate(r);
			strokeWeight(map(this.z,this.maxDepth,this.minDepth,height*0.0025,height*0.005));
			noFill();
			beginShape();
				for(e=0;e<this.length;e++){
					let scale = map(this.z,this.maxDepth,this.minDepth,0.1,1);
					let segment = this.n+e;

					let wiggle = map(noise(segment*0.02),0,1,-height*0.07,height*0.07)*scale;
					let x = sin(segment)*(this.z+wiggle)+(OFF*scale);
					let y = cos(segment)*(this.z+wiggle);
					vertex(x,y);
				}
			endShape();
		pop();
	}

	this.move = function(){
		this.n+=this.speed;
	}
}
