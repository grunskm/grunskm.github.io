// 

let scale = 0.003;
let size = 100;

let view;
let currentMX;
let currentMY;
let ang_x = 1;
let ang_y = 2;
let cart_data;
let cart;

let locus = {x:0,y:0}


function preload(){
	cart_data = loadJSON('cart_data.json');
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	resize();
	cart = new View();
	strokeCap(ROUND);
	strokeWeight(2);
	stroke(255,200,200);
	noFill();
// 	noCursor();
}

function draw(){

	background(10,20,20);
	
	locus.x = lerp(locus.x,mouseX,0.1);
	locus.y = lerp(locus.y,mouseY,0.1);
	
	ang_y = (mouseX-locus.x)*0.00125;
	ang_x = (mouseY-locus.y)*0.00125;
	cart.rotate(ang_y,ang_x);
	cart.show(width*0.33,height*0.5, -30);
 	cart.show(width*0.66,height*0.5,  30);

}

class View{
	
	constructor(){
		this.cart = structuredClone(cart_data);
	}
	
	rotate(ANG_Y,ANG_X){
		this.cart = cart_data; 
		for(let l in this.cart){
			for(let p in this.cart[l]){
				let pnt = this.cart[l][p]
				let dis = dist(pnt.y,pnt.z,0,0);
				let ang = atan2(pnt.z,pnt.y);
				pnt.z = sin(ANG_X+ang)*dis;
				pnt.y = cos(ANG_X+ang)*dis;
			
				dis = dist(pnt.x,pnt.z,0,0);
				ang = atan2(pnt.z,pnt.x);
				pnt.z = sin(ANG_Y+ang)*dis;
				pnt.x = cos(ANG_Y+ang)*dis;
			}
		}
	}
	
	show(XPOS,YPOS,SEP){
		
		let thresh = 0;
		// crop here

		for(let l in this.cart){
			beginShape();
			for(let p in this.cart[l]){
				
				let s = 1/(1+(size*(this.cart[l][p].z)*scale));
				let x = (size*this.cart[l][p].x+SEP)*s+XPOS
				let y = size*this.cart[l][p].y*s+YPOS
				vertex(x,y)
			}
			endShape(OPEN);
		}

	}
	
}

function lerp(A,B,T){
	return A+(B-A)*T
}


function resize(){
	if(width<height*1.4){ // mobile
		resizeCanvas(windowWidth,windowHeight);
	//	view.resize();
		
	}else if(width>height*1.4){//desktop
		resizeCanvas(windowWidth,windowHeight);
	//	view.resize();

	}
}

window.onresize = ()=>{
	resize();
}



