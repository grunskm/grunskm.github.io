// calder mobile test

let n = 10;
let scale = 0.002;
let weight = 5;
let w;

let view;

let inc = 0;


function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	w = width*0.1;
	seperation = width*0.2;
	noStroke();
	view = new Frame();
}

function draw(){
	inc++;
	background(60,110,140);
	fill(190,150,20);
	rect(0,0,width*0.2,height);
	rect(width*0.8,0,width*0.2,height);

// 	view.display(-seperation,-10);
// 	view.display(seperation,10);
	
	view.display(0,0);

}

function Frame(){


	this.beam = new Beam(6);


	this.display = (POS,OFF)=>{
		push();
		translate(width/2+POS,height/2);
		this.beam.display(0,40,-80,OFF);
		pop();
	}


	function Beam(N){

		this.n = N;
		this.deg = 0;//random(0,360);
		this.rate = random(-0.3,0.3);

		this.r1 = 70;

		this.r2 = 70;

		this.child;

		if(this.n>0){
			this.child = new Beam(this.n-1);
		}

		this.display = (X, D, Y, OFF)=>{

			let inc = frameCount*this.rate%360+this.deg;
			let wig = frameCount*this.rate+this.deg;
			
			let  y1 = noise(wig*0.02)*(-this.r2/2)+(Y+60); 
			let  y2 = noise(wig*0.01)*(this.r1/2)+(Y); 
			
			let  d1 = D + sin(inc)*this.r1;
			let  d2 = D + sin(inc-180)*this.r2;
			
			let  x1 = X + cos(inc)*this.r1;
			let  x2 = X + cos(inc-180)*this.r2;
			
			//dPoint(x2,y2,d2,OFF);
			//dPoint(x1,y1,d1,OFF);
		//	dLine(x1,y1,d1,x2,y2,d2,20,OFF);
			
			//strokeWeight(20);
			stroke(255,0,0);
			dPoint(x1,y1,d1,OFF);

			if(this.child!=undefined){
				this.child.display(x2,d2,y2,OFF);
			}
		}
	}
}


function dRect(X,Y,W,H,D,POS){

	let s = 1/(1+(D*scale));
	let x = X*s+POS;
	let y = Y*s;
	let w = W*s;
	let h = H*s;
	rect(x,y,w,h);
	
}

function dPoint(X,Y,D,POS){
	//receives X,Y,D in pixels. D is distance from view point in 'pixels'. X,Y => W,H

	let s = 1/(1+(D*scale));
	fill(255,0,100);
	let x = X*s;
	let y = Y*s;
	circle(x+POS,y,s*40);
}

function dImage(X,Y,D,IMG,POS){

	let s = 1/(1+(D*scale));

	let x = X*s;
	let y = Y*s;
	image(IMG,x+POS,y,IMG.width*s,IMG.width*s);

}

function dLine(X1,Y1,D1,X2,Y2,D2,DIV,OFF){

	let xSpace = (X2-X1)/DIV;
	let ySpace = (Y2-Y1)/DIV;
	let dSpace = (D2-D1)/DIV;

	for(i=0;i<DIV;i++){
		let s = 1/(1+((D1+dSpace*i)*scale));

		let x1 = X1+xSpace*i*s;
		let y1 = Y1+ySpace*i*s;
		let o1 = OFF*s;
				//point(x1,y1);
				s = 1/(1+((D1+dSpace*(i+1))*scale));
		let x2 = X1+xSpace*(i+1)*s;
		let y2 = Y1+ySpace*(i+1)*s;
		let o2 = OFF*s;
				//point(x2,y2);

		strokeWeight(weight*s);
		stroke(255*s);
	
		line(x1+o1,y1,x2+o2,y2);

	} 

}



