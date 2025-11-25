
let number_of_blades = 50;
let grass = [];
let ground;
let knife;
let w;

let currentMX;
let currentMY;

let scale = 0.002;


function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	w = windowHeight*0.3;
	noCursor();
	stroke(255);
	noFill();

  currentMX = 0;

	for(i=0;i<number_of_blades;i++){
		grass.push(new Blade(
			random(-w/2,w/2),
			200,
			random(-w/2,w/2)
		));
	}
	
	ground = new Surface(0,200,0,w,w,50);

}

function draw(){
	background(100);

	let mouseXdiff = mouseX-currentMX;	

	if(mouseXdiff>1 || mouseXdiff<-1){
		ground.update(mouseXdiff*-0.01,0);	
		currentMX = lerp(currentMX,mouseX,0.025);
	}

	ground.show(width*0.5,0);
	
	for(i=0;i<number_of_blades;i++){
		grass[i].grow(mouseXdiff*-0.01,0);
	}
	
// 	ground.show(width*0.3,-40);
// 	ground.show(width*0.7, 40);
	
	line(mouseX,mouseY-10,mouseX,mouseY+10);
	line(mouseX+10,mouseY,mouseX-10,mouseY);
	
}

class Surface{

	constructor(X,Y,Z,W,D,H){
		this.x = W;
		this.d = D;
		this.points = [
			new p5.Vector(X-W/2,Y,Z-D/2),
			new p5.Vector(X+W/2,Y,Z-D/2),
			new p5.Vector(X+W/2,Y,Z+D/2),
			new p5.Vector(X-W/2,Y,Z+D/2)
		];

	}
	
	show(XPOS, OFF){
		push();
		translate(XPOS,height/2);
		//fill(255);
		beginShape();
		for(let i=0;i<4;i++){
			let r_pos = this.points[i];
			
			let s = 1/(1+r_pos.z*scale);
			let x = (r_pos.x+OFF)*s;
			let y = r_pos.y*s;
			vertex(x,y);
		}
		endShape(CLOSE);
		
		for(i=0;i<number_of_blades;i++){
			grass[i].show(0,0);
		}
		pop();
	}
	update(YANG, XANG){
		for(let i=0;i<4;i++){
			rotY(this.points[i],YANG);
			rotX(this.points[i],XANG);
		}
	}
}

function rotY(vec, ANG){
	
	let a = atan2(vec.x, vec.z);
	let d = sqrt(pow(vec.x,2)+pow(vec.z,2));
	
	vec.x = sin(ANG+a)*d;
	vec.z = cos(ANG+a)*d;
}

function rotX(vec, ANG){
	
	let a = atan2(vec.y, vec.z);
	let d = sqrt(pow(vec.y,2)+pow(vec.z,2));
	
	vec.y = sin(ANG+a)*d;
	vec.z = cos(ANG+a)*d;
}

class Blade{
	constructor(X,Y,Z){
		this.pos = new p5.Vector(X,Y,Z);
		this.segments = 25;
		this.len = 20;
	}

	show = function(X,OFF,YANG,XANG){
		noFill();
		let s = 1/(1+this.pos.z*scale);
		
		beginShape();
			for(let e=0;e<this.segments;e++){
				let x = this.pos.x*s;
				let y = (this.pos.y-(e*this.len))*s;
				vertex(x,y);
			}
		endShape();
	}

	grow = function(YANG,XANG){
	
		rotY(this.pos,YANG);
		rotX(this.pos,XANG);
		
		for(let e=0;e<this.segments;e++){
		// 
		}
	}
}
