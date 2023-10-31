// 

let landscape = true;

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

	view = new View();
	strokeCap(ROUND);
	noCursor();
	resize();

}

function draw(){

	background(230);
	if(landscape == true){
		view.show(width*0.3,height/2,-40);
		view.show(width*0.7,height/2, 40);
	}else{
		rotate(PI/2);
		view.show(height*0.3,-width/2,-40);
		view.show(height*0.7,-width/2, 40);
	}

	if(landscape == true){
		if(mouseIsPressed){
			seed += dist(prev_x,prev_y,mouseX,mouseY)*0.0025;
		}else{
			ang_x += (mouseY-prev_y)*0.01;
			ang_y += (mouseX-prev_x)*0.01;
		}
		prev_x = mouseX;
		prev_y = mouseY;
	}else{ // portrait has rotate only
		if(mouseIsPressed){
			ang_x += (mouseY-prev_y)*0.01;
			ang_y += (mouseX-prev_x)*0.01;
		}else{
			seed += 0.005;
		}
		prev_x = mouseX;
		prev_y = mouseY;
	}

}
function touchStarted(){
	if(landscape == true){

	}else{
		prev_x = mouseX;
		prev_y = mouseY;
	}
}

class View{

	constructor(){
		this.w;
		this.h;
		this.obj = [];
		this.num = 10;
		
		for(let i=0;i<this.num;i++){
			this.obj[i] = new Coil();
			this.obj[i].resize();
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
	resize(){
		for(let i=0;i<this.num;i++){
			this.obj[i] = new Coil();
			this.obj[i].resize();
		}
	}
}

class Coil{
	constructor(){
		this.r;
		this.z;
		this.x = 0;
		this.y = 0;
		this.weight;
		this.length = 150;
		this.waviness;

		this.zseed = random(0,1000);
		this.xseed = random(0,1000);
		this.yseed = random(0,1000);
	}
	
	resize(){
		if(landscape==true){
			this.r = height*1;
			this.z = 500;
			this.weight = height*0.01;
			this.waviness = height*1.35;
		}else{//portrait
			this.r = height*0.5;
			this.z = 0;
			this.weight = 10;
			this.waviness = height*0.5;
		}
	}
	
	show(OFF){
	noFill();

	let oldx, oldy;
		for(let i=0;i<this.length;i++){
			let z = noise(seed+this.zseed+(i*0.005))*(this.waviness)-(this.waviness/2);
			let x = noise(seed+this.xseed+(i*0.005))*(this.waviness)-(this.waviness/2);
			let y = noise(seed+this.yseed+(i*0.005))*(this.waviness)-(this.waviness/2);
			
			let dis = sqrt(pow(z,2)+pow(y,2));
			let ang = atan2(z,y);
			z = sin(ang_x+ang)*dis;
			y = cos(ang_x+ang)*dis;
			
			dis = sqrt(pow(z,2)+pow(x,2));
			ang = atan2(z,x);
			z = (sin(ang_y+ang)*dis)+this.z;
			x = cos(ang_y+ang)*dis;
			
			let s = 1/(1+(z*scale));
			
			let proj_x = (x+OFF)*s;
			let proj_y = y*s;

			strokeWeight(this.weight*s);
		  stroke(0);//	stroke(map(s,0,1,255,0));
			line(oldx,oldy,proj_x,proj_y);
			oldx = proj_x;
			oldy = proj_y;
		}
	}
}

function resize(){
	if(width/height<1){
		landscape = false;
		print("portrait");
	}else{
		landscape = true;
		print("landscape");
	}

	resizeCanvas(windowWidth,windowHeight);
	view.resize();

}

window.onresize = ()=>{
	resize();
}

// function lerp(A,B,T){
// 	return A+(B-A)*T
// }


