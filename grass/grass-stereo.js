let n = 100;
let grass = [];
let blade;


let mx, my;

let offset = 30;

let viewAngle; 
let cutHeight;
let horizon;
let seperation;




function setup() {
  createCanvas(windowWidth,windowHeight);
	noFill();
	strokeWeight(1);
	stroke(30,100,80);
	//stroke(255);

	horizon = 0;
	seperation = width*0.15;
	viewAngle = height*0.8;
	cutHeight = height*0.005;

	for(i=0;i<n;i++){
		grass.push(new Grass(random(-width*0.1,width*0.1),viewAngle,random(0.8,random(0.9,1))));
	}
	blade = new Disc(viewAngle-cutHeight);

}

function draw() {
	mx = mouseX-width/2;
	my = mouseY-horizon;

	translate(width*0.5,horizon);
	background(50,30,30);
	stroke(30,100,80,250);

	let speed  = map(noise(frameCount*0.0001),0,1,0.005,0.01);

  for(i=0;i<n;i++){
		grass[i].display(speed,seperation,offset);
		grass[i].display(speed,-seperation,-offset);
		if(mouseIsPressed){
			grass[i].collide();
		}
	}
	blade.display(mx,my,seperation,offset);
	blade.display(mx,my,-seperation,-offset);

}

function Disc(Y){

	this.y = Y;
	this.x;
	this.z;
	this.size = 60;

	this.display = function(X,Z,S,O){

		this.z = Z;
		let z = map(this.z,horizon,this.y,0,1);
		this.s = this.size*z*this.size*0.02;
		this.x = X;  // x pos for collision calc
		let x = this.x+S+(O*z); // x pos for individual instance 

		push();
		noCursor();
		stroke(255,255,255,50);
		ellipse(x,this.z-cutHeight,this.s,this.s*0.2);
// 		stroke(50,10,40);
// 		ellipse(x,this.z+cutHeight,this.s,this.s*0.3);		
		pop();
	}
}

function Grass(X,Y,Z){
	
	this.z = Z;


	this.x = X*this.z;
	this.y = Y*this.z;


	this.length = 10;
	this.height = 0;
	this.maxHeight = height*0.05;// random(height*0.05,height*0.04)*this.z;
	this.growthRate = random(0.002,0.004);


	this.Xsample = X*0.005;
	this.Ysample = Z*8;

	




	this.display = (speed,xPos,offSet)=>{
			if(this.height<this.maxHeight){
				this.height+=this.growthRate;
			}

			this.Xsample-=speed;
			this.Ysample-=speed;
			let force = map(noise(this.Xsample,this.Ysample),0,1,0.005,0.015);

			beginShape();
			for(e=0;e<this.length;e++){
				let sway = e*e*force*this.height;
				let x = this.x+sway+xPos+(offSet*this.z);
				let y = this.y+sway-(e*this.height); // not currently factoring depth into height to preserve relative shape of top vs. bottom
				vertex(x,y);
			}
			endShape();


	}

	this.collide = ()=>{
	//	ellipse(blade.x,blade.z,blade.s,blade.s*0.3);
		let s = blade.s/3;
		if(this.height>cutHeight && blade.x+s>this.x && blade.x-s<this.x && blade.z-s*0.3<this.y-cutHeight*3 && blade.z+s*0.3>this.y-cutHeight*3 ){
					this.height = cutHeight;
		}
	}
}

