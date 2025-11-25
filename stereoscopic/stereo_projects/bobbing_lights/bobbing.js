


let obj = []
let pov = -180;
let fov = 0.02;
let n = 0;
let orb_frq = 100;

function setup() {
  createCanvas(windowWidth, windowWidth);
  noCursor();
  noStroke();
  
  for(let i=6;i<40;i++){ 
  	let f = 0.5;
  	let sag = cos(i*f*2)/2+1;
  	let x = sin(i*f)*500;
  	let y = (sin(-i*f)*100)+sag*150+sin(i*4.5)*25;
  	let z = i*5+50;

  	obj.push(new Orb(x,y,z,i,sag));
  }
  obj.push(new Rect())
  print(obj);
}

function draw(){
	background(120,28,100);
	translate(width/2,height/2);
	let x_off = map(mouseX,0,width,-100,100);
	let y_off = map(mouseY,0,height,-100,100);
	for(let i=obj.length-1;i>-1;i--){
		
		obj[i].project( width*0.2, 40+x_off,y_off);
		obj[i].project(-width*0.2,-40+x_off,y_off);
	}
	
	if(frameCount%orb_frq==0){
		orb_frq = floor(random(13,17));
		
		if(obj[n].fill == 0){
			obj[n].fill = color(255,255,0);
		}else{
			obj[n].fill = 0;
		}
		n++;
		if(n>=obj.length){
			n=0;
		}
	}
}


class Window{
	constructor(X,Y,Z,W,H){
		this.pos = {
			a:{x:X,y:Y},
			b:{x:X+W,y:Y},
			c:{x:X+W,y:Y+H},
			d:{x:X,y:Y+H}
		}
	}
	project(){
	
	}


}

class Orb{
	constructor( X, Y, Z, N, SAG){
		this.pos = {
			x:X,
			y:Y,
			z:Z,
			n:N
		}
		this.frq = floor(random(100,500));
		this.s = 20;
		this.fill = 0;
		this.sag = SAG;
	}
	project(XPOS, XOFF, YOFF){
		let sway = 0;//(noise(frameCount*0.2)*2)*this.sag;
		let s = 1/(1+((this.pos.z+sway)*fov));
		let x = (this.pos.x+XOFF)*s;
		let y = (this.pos.y+YOFF)*s;
		let size = this.s*s;

		fill(this.fill);
		
		ellipse(x+XPOS,y,size,size);
  }
}









