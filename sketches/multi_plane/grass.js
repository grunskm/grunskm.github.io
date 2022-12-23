

let ground = [];
let knife;
let w;

let currentMX;
let currentMY;

let scale = 0.002;


function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	w = windowHeight*0.2;
	noCursor();
	noStroke();
	noFill();

// 	for(let i=0;i<10;i++){
// 		ground.push(new Surface(0,100,0,w,w,50));
// 	}
}

function mousePressed(){

	if(ground.length == 0){
		currentMX = mouseX;
 		currentMY = mouseY;
	}
	ground = [];
	for(let i=0;i<10;i++){
		ground.push(new Surface(0,100,0,w,w,50));
	}
}
	
function draw(){
	background(100);

	let	mouseXdiff = currentMX-mouseX;
	let mouseYdiff = mouseY-currentMY;	
	
	if(mouseXdiff>1 || mouseXdiff<-1){

		currentMX = lerp(currentMX,mouseX,0.025);

	}
	if(mouseYdiff>1 || mouseYdiff<-1){
		currentMY = lerp(currentMY,mouseY,0.025);
	}
	
	for(let i=0;i<ground.length;i++){
			ground[i].update(mouseXdiff*0.05,0);
			ground[i].update(0,mouseYdiff*-0.05);	
			ground[i].show(width*0.3,-40);
			ground[i].show(width*0.7, 40);
	}



	
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

class Surface{

	constructor(X,Y,Z,W,D,H){
		this.x = W;
		this.d = D;
		this.spinfactor = random(-1,1)*2;
		this.yoff = random(-W/2,W/2);
		this.xoff = random(-W/2,W/2);
		this.col = color(random(0,255),random(0,255),random(0,255));
		this.points = [
			new p5.Vector(X-W/2,Y,Z-D/2),
			new p5.Vector(X+W/2,Y,Z-D/2),
			new p5.Vector(X+W/2,Y,Z+D/2),
			new p5.Vector(X-W/2,Y,Z+D/2)
		];
		let rx = random(0,1000);
		let ry = random(0,1000);
		let rz = random(0,1000);
		for(let i=0;i<this.points.length;i++){
			rotY(this.points[i],rx);
			rotX(this.points[i],ry);
			rotZ(this.points[i],rz);
			this.points[i].x += this.xoff;
			this.points[i].y += this.yoff;
		}

	}
	
	show(XPOS, OFF){
		push();
		translate(XPOS,height/2);
		fill(this.col);
		beginShape();
		for(let i=0;i<4;i++){
			let r_pos = this.points[i];
			
			let s = 1/(1+r_pos.z*scale);
			let x = (r_pos.x+OFF)*s;
			let y = r_pos.y*s;
			vertex(x,y);
		}
		endShape(CLOSE);
	
		pop();
	}
	update(YANG, XANG){
		for(let i=0;i<4;i++){
			rotY(this.points[i],YANG*this.spinfactor);
			rotX(this.points[i],XANG*this.spinfactor);
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
function rotZ(vec, ANG){
 	//let vec = VEC;
	
	let a = atan2(vec.y, vec.x);
	let d = sqrt(pow(vec.y,2)+pow(vec.x,2));
	
	vec.y = sin(ANG+a)*d;
	vec.x = cos(ANG+a)*d;
	
//	return vec;
}


