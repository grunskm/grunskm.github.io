// stereoscopic worm sketch



let scale = 0.0005;

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
	school(width*0.25,-15);
	school(width*0.75,15);

	line(0,mouseY,width,mouseY);
}

function school(POSITION, OFF){
	fill(255);
	ellipse(POSITION+(OFF*0.7), height/2, height-10);
	for(i=0;i<number_of_worms;i++){
		worm[i].show(POSITION, height/2, OFF);
	}

}

function Worm(){

	this.z = random(0,2000);
	this.radius = height*0.3; 
	this.n = random(0,10000);
	this.speed = random(0.2,0.35);
	this.length = 20;
	this.weight = 2;


	this.show = function(X,Y,OFF){
		let s = 1/(1+(this.z*scale));
		push();
			translate(X+(OFF*s),Y);
			r+=0.003;
			rotate(r);
			noFill();
			
			strokeWeight(this.weight*s);
			beginShape();
				for(e=0;e<this.length;e++){
					let segment = this.n+e;

					let wiggle = noise(segment*0.02)*50;
					let wiggle2 = 0;//noise(segment*0.01)*50;
					let x = sin(segment)*(this.radius+wiggle+wiggle2)*s;
					let y = cos(segment)*(this.radius+wiggle+wiggle2)*s;

					vertex(x,y);
				}
			endShape();
		pop();
	}

	this.move = function(){
		this.n+=this.speed;
	}
}




