// stereoscopic worm sketch

let mobile = false;

let scale = 0.0006;

let number_of_worms = 20;
let worm = [];
let r = 0;

let weight;
let amp;
let radius;

function resize(){
	if(width<height*1.4){ // mobile
		resizeCanvas(windowWidth,windowHeight);
		radius = width*0.15;
		amp = radius*0.3;
		weight = radius*0.0125;
	}else if(width>height*1.4){//desktop
		resizeCanvas(windowWidth,windowHeight);
		radius = height*0.2;
		amp = radius*0.3;
		weight = radius*0.015;
	}
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	resize();

	angleMode(DEGREES);
	stroke(0);

	for(i=0;i<number_of_worms;i++){
		worm.push(new Worm());
	}
}

function draw(){
	background(0);
	for(i=0;i<number_of_worms;i++){
		worm[i].move();
	}
	school(width/2-radius*1.6,-radius*0.1);
	school(width/2+radius*1.6,radius*0.1);

}

function school(POSITION, OFF){
	fill(255);
	ellipse(POSITION+(OFF*0.7), height/2, radius*3);
	for(i=0;i<number_of_worms;i++){
		worm[i].show(POSITION, height/2, OFF);
	}
}

function Worm(){

	this.z = random(0,2000);
	this.n = random(0,10000);
	this.speed = random(0.3,0.45);
	this.length = 20;


	this.show = function(X,Y,OFF){
		let s = 1/(1+(this.z*scale));
		push();
			translate(X+(OFF*s),Y);
			r+=0.006;
			rotate(r);
			noFill();

			strokeWeight(weight*s);
			beginShape();
				for(e=0;e<this.length;e++){
					let segment = this.n+e;
					let wiggle = noise(segment*0.02)*amp;
					let wiggle2 = 0;
					let x = sin(segment)*(radius+wiggle+wiggle2)*s;
					let y = cos(segment)*(radius+wiggle+wiggle2)*s;
					vertex(x,y);
				}
			endShape();
		pop();
	}

	this.move = function(){
		this.n+=this.speed;
	}
}

window.onresize = ()=>{
	resize();
}
