
let number_of_blades = 0;
let grass = [];
let img = [];
let ground;
let knife;
let w;

let gum_data;
let gum = [];

let currentMX;
let currentMY;

let scale = 0.002;

function preload(){
	gum_data = loadJSON('gum_data.json');
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	w = windowHeight*0.3;
	noCursor();
	//stroke(0);
	noStroke();
	//noFill();
	currentMX = 0;
  currentMY = 0;

// 	for(i=0;i<number_of_blades;i++){
// 		grass.push(new Blade(
// 			random(-w/2,w/2),
// 			0,
// 			random(-w/2,w/2)
// 		));
// 	}
	for(let i in gum_data){
		gum.push([]);
		for(let e in gum_data[i]){
			gum[i].push(new p5.Vector(
				gum_data[i][e].x * w-w/2,
				100,
				gum_data[i][e].y * w-w/2
			))
		}
	}
	
	ground = new Surface(0,100,0,w,w,50);
		fill(random(0,255),random(0,255),random(0,255));

}

function draw(){
	//background(100);

	let	mouseXdiff = currentMX-mouseX;
	let mouseYdiff = mouseY-currentMY;	
	


	if(mouseXdiff>1 || mouseXdiff<-1){
		ground.update(mouseXdiff*0.05,0);	
		currentMX = lerp(currentMX,mouseX,0.025);
	}
	if(mouseYdiff>1 || mouseYdiff<-1){
		ground.update(0,mouseYdiff*-0.05);	
		currentMY = lerp(currentMY,mouseY,0.025);
	}


	ground.show(width*0.3,-40);
	ground.show(width*0.7, 40);
	
	line(mouseX,mouseY-10,mouseX,mouseY+10);
	line(mouseX+10,mouseY,mouseX-10,mouseY);

}

// function patch(XPOS, OFF, YANG,XANG){
// 	translate(XPOS,height/2);
// 	for(let i=0;i<number_of_blades;i++){
// 		grass[i].show(XPOS, OFF, YANG,XANG);
// 	}
// 
// }

function mousePressed(){
	fill(random(0,255),random(0,255),random(0,255));
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
	//	fill(255);
	//noFill();
// 	beginShape();
// 		for(let i=0;i<4;i++){
// 			let r_pos = this.points[i];
// 			
// 			let s = 1/(1+r_pos.z*scale);
// 			let x = (r_pos.x+OFF)*s;
// 			let y = r_pos.y*s;
// 			vertex(x,y);
// 		}
// 		endShape(CLOSE);
		//fill(255);
		for(let i=0;i<gum.length;i++){
			beginShape();
			for(let e=0;e<gum[i].length;e++){

				let r_pos = gum[i][e];
				let s = 1/(1+r_pos.z*scale);
				let x = (r_pos.x+OFF)*s;
				let y = r_pos.y*s;
				vertex(x,y);
			}
			endShape(CLOSE);
		}
		pop();
	}
	update(YANG, XANG){
		for(let i=0;i<gum.length;i++){
			for(let e=0;e<gum[i].length;e++){	
				rotY(gum[i][e],YANG);
				rotX(gum[i][e],XANG);
			}
		}
		for(let i=0;i<4;i++){
			rotY(this.points[i],YANG);
			rotX(this.points[i],XANG);
		}
	}
}

function rotY(vec, ANG){
 	//let vec = VEC;
	
	let a = atan2(vec.x, vec.z);
	let d = sqrt(pow(vec.x,2)+pow(vec.z,2));
	
	vec.x = sin(ANG+a)*d;
	vec.z = cos(ANG+a)*d;
	
//	return vec;
}

function rotX(vec, ANG){
 	//let vec = VEC;
	
	let a = atan2(vec.y, vec.z);
	let d = sqrt(pow(vec.y,2)+pow(vec.z,2));
	
	vec.y = sin(ANG+a)*d;
	vec.z = cos(ANG+a)*d;
	
//	return vec;
}

class Blade{

	constructor(X,Y,Z){

		this.pos = new p5.Vector(X,Y,Z);
		this.segments = 10;
		
	}

	show = function(X,OFF,YANG,XANG){

		noFill();
		rotY(this.pos,YANG);
		rotX(this.pos,XANG);
		let s = 1/(1+this.pos.z*scale);
		
		beginShape();
			for(let e=0;e<this.segments;e++){

				let x = this.pos.x*s;
				let y = this.pos.y*s;
				point(x,y);
				vertex(x,y);
			}
		endShape();

	}

	grow = function(){
		for(let e=0;e<this.segments;e++){
		
		}
	}
}
