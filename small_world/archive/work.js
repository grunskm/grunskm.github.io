// 

let scale = 0.001;
let view;
let currentMX;
let currentMY;
let ang_x = 0;
let ang_y = 0;
let c_ang_x, c_ang_y;
let seed=0;
let prev_x = 0;
let prev_y = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	resize();
	view = new View();
	view.reset();
	strokeCap(ROUND);
	noCursor();
}

function draw(){

	background(230);
	//view.reorder();
	
//     let mouseXdiff = c_MX-mouseX;
//     let mouseYdiff = mouseY-c_MY;
//   	c_MX = mouseX;
// 		c_MY = mouseY;

//     if(mouseXdiff>1 || mouseXdiff<-1){
//     		ang_y = c_ang_y;//ang_y+(c_ang_y-ang_y)*0.5;
//       y_rotate(cube,mouseXdiff*0.001);
//       currentMX = lerp(currentMX,mouseX,0.05);
//     }
//     if(mouseYdiff>1 || mouseYdiff<-1){
//     		ang_x = c_ang_x;//ang_x+(c_ang_x-ang_x)*0.5;
//       x_rotate(cube,mouseYdiff*0.001);
//       currentMY = lerp(currentMY,mouseY,0.05);
//     }



	if(mouseIsPressed){
		seed += dist(prev_x,prev_y,mouseX,mouseY)*0.0025;
		view.reset();
		view.show(width*0.3,height/2,-40);
		view.show(width*0.7,height/2, 40);

	}else{
		ang_x += (mouseY-prev_y)*0.01;
		ang_y += (mouseX-prev_x)*0.01;
		view.show(width*0.3,height/2,-40);
		view.show(width*0.7,height/2, 40);
	}
	prev_x = mouseX;
	prev_y = mouseY;
}

class View{

	constructor(){
		this.w = 300;
		this.h = 300;
		this.obj = [];
		
		for(let i=0;i<17;i++){
			this.obj.push(new Coil());
		}
	}
	reset(){
		for(let i=0;i<this.obj.length;i++){
			this.obj[i].progress();
		}
	}
	show(XPOS,YPOS,OFF){
	
		push();
			translate(XPOS,YPOS);
			fill(100);
		//	rect(-this.w*0.5,-this.h*0.5,this.w,this.h);
		
		for(let i=0;i<this.obj.length;i++){
			this.obj[i].show(OFF);
		}

		pop();
	}
}
function lerp(A,B,T){
	return A+(B-A)*T
}


class Coil{
	constructor(I){
		this.r = 1000;
		this.x = 0;
		this.y = 0;
		this.z = 0;

		this.zseed = random(0,1000);
		this.xseed = random(0,1000);
		this.yseed = random(0,1000);
		
		this.length = 100;
		this.waviness = 700;
		this.weight = 5;
		
		this.pos=[];

	}
	progress(){
		for(let i=0;i<;i++){
			this.pos = {
				z : noise(seed+this.zseed+(i*0.005))*(this.waviness)+this.z-(this.waviness/2),
				x : noise(seed+this.xseed+(i*0.005))*(this.waviness)+this.x-(this.waviness/2),
				y : noise(seed+this.yseed+(i*0.005))*(this.waviness)+this.y-(this.waviness/2)
			};
		}
	}
	
	show(OFF){
		noFill();
		
		strokeWeight(5);

		let oldx, oldy;
			for(let i=0;i<this.length;i++){
				
				x_rotate(this.pos,ang_x);
			  y_rotate(this.pos,ang_y);
				
// 				let dis = sqrt(pow(z-this.z,2)+pow(y,2));
// 				let ang = atan2(z-this.z,y);
// 				z = sin(ang_x+ang)*dis;
// 				y = cos(ang_x+ang)*dis;
// 				
// 				dis = sqrt(pow(z,2)+pow(x,2));
// 				ang = atan2(z,x);
// 				z = sin(ang_y+ang)*dis;
// 				x = cos(ang_y+ang)*dis;
				
				let s = 1/(1+(this.pos.z*scale));
				
				let proj_x = (this.pos.x+OFF)*s;
				let proj_y = this.pos.y*s;

 				strokeWeight(this.weight*s);
 				stroke(map(s,0,1,255,0));
 				line(oldx,oldy,proj_x,proj_y);
 				oldx = proj_x;
 				oldy = proj_y;
			}
	}
}

function resize(){
	if(width<height*1.4){ // mobile
		resizeCanvas(windowWidth,windowHeight);
	//	view.resize();
		
// 		radius = width*0.15;
// 		amp = radius*0.3;
// 		weight = radius*0.0125;
	}else if(width>height*1.4){//desktop
		resizeCanvas(windowWidth,windowHeight);
	//	view.resize();
		
// 		radius = height*0.2;
// 		amp = radius*0.3;
// 		weight = radius*0.015;
	}
}

window.onresize = ()=>{
	resize();
}

function x_rotate(OBJ,INC){
		let dist = sqrt(pow(OBJ.z,2)+pow(OBJ.y,2));
		let ang = atan2(OBJ.z,OBJ.y)+INC;
		OBJ.z = sin(ang)*dist;
		OBJ.y = cos(ang)*dist;
}
function y_rotate(OBJ,INC){
		let dist = sqrt(pow(OBJ.z,2)+pow(OBJ.x,2));
		let ang = atan2(OBJ.z,OBJ.x)+INC;
		OBJ.z = sin(ang)*dist;
		OBJ.x = cos(ang)*dist;
}



