let n = 50;
let scale = 0.01;
let offset = 30;

let seperation;
let cutHeight;

let grass = [];
let blade ;
let w; 

let view;

let snip;


function setup() {
  createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	noFill();
	strokeWeight(1);
//	noCursor();

	stroke(30,100,80);

	seperation = width*0.15;
	w = width*0.2;
	cutHeight = w*0.2;

	snip = loadSound('snip.mp3');

	for(i=0;i<n;i++){
		let x = random(0,w)-w/2;
		let y = height*0.3;
		let z = i;
		grass.push(new Grass(x,y,z));
	}

	grass.sort((a,b)=>{return a.d-b.d});

	blade = new Disc(cutHeight+height*0.3);

}

function draw() {
	translate(width/2,height/2);
	background(50,30,30);
	stroke(30,100,80,250);

	let speed  = map(noise(frameCount*0.0001),0,1,0.005,0.01);
		
  for(i=0;i<n;i++){
		grass[i].update(speed);
		grass[i].display(seperation,offset);
		grass[i].display(-seperation,-offset);

		if(mouseIsPressed){
			grass[i].collide();
		}
	}

	blade.display(seperation,offset);
	blade.display(-seperation,-offset); 
}


function Disc(Y){

	this.y = Y;
	this.x;
	this.d;
	this.size = 40;

	this.display = function(SEP,OFF){
		
//this.d = 1/(1+(scale*(height-mouseY)));
		dEllipse(mouseX-width/2,200,height-mouseY,OFF)
	}

}

function dEllipse(X,Y,D,R,OFF){
	
	beginShape();
	for(c=0;c<91;c++){	
		let x = sin(c*4)*R+X;
		let y = Y;
		let d = cos(c*4)*R+D;
		dVertex(x,y,d,OFF);
	}
	endShape();
}

function dVertex(X,Y,D,OFF){
	//receives X,Y,D in pixels. D is distance from view point in 'pixels'. X,Y => W,H

	let s = 1/(1+(D*scale));
	stroke(50);
	strokeWeight(s*5);
	let x = (OFF+X)*s;
	let y = Y*s;
	vertex(x,y);	
}

function Grass(X,Y,Z){
	
	this.d = 1/(1+(Z*scale));
	print(this.d);
	this.x = X*this.d;
	this.y = Y*this.d;

	this.pos = [];


	this.length = 10;
	this.height = w*0.02;
	this.cutHeight = w*0.2;
	this.maxHeight = w;// random(height*0.05,height*0.04)*this.z;
	this.growthRate = 0.02;//random(0.002,0.004);

	this.Xsample = X;
	this.Ysample = Z;

	this.update = (SPEED)=>{
		if(this.height<this.maxHeight){
				this.height+=this.growthRate;
			}
			this.Xsample-=SPEED;
			this.Ysample-=SPEED;
			let force = map(noise(this.Xsample,this.Ysample),0,1,0.01,0.03);
			for(e=0;e<this.length;e++){
				let sway = e*e*force*this.height;
				let x = this.x+sway;
				let y = this.y+sway-(e*this.height); 
				this.pos[e] = {x,y}
			}	
	}

	this.display = (XPOS,OFF)=>{
		push();
		translate((OFF*this.d)+XPOS,0);
			beginShape();
			for(e=0;e<this.length;e++){
				vertex(this.pos[e].x,this.pos[e].y);
			}
			endShape();
		pop();
	}

	this.collide = ()=>{
	//	ellipse(blade.x,blade.z,blade.s,blade.s*0.3);
		let s = blade.s/3;
		if(this.height>cutHeight && blade.x+s>this.x && blade.x-s<this.x && blade.z-s*0.3<this.y-cutHeight*3 && blade.z+s*0.3>this.y-cutHeight*3 ){
					this.height = cutHeight-2;
					//snip.play();
		}
	}
}
