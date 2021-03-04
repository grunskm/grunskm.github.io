

let num = 15;
let fly = [];
let zapper;
let cursor0;
let seperation;

let scale = 0.0003;
let weight = 10;

let w;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	cursor0 = loadImage("cursor0.png");

	noCursor();

	w = width*0.7;
	seperation = width*0.4;

	for(i=0;i<num;i++){
		fly.push(new Fly());
	}
	zapper = new FlyTrap();
}

function draw(){
	background(210,150,30);

	translate(width/2,height/2);

// 	zapper.display(-seperation,-10);
// 	zapper.display(seperation,10);

	for(i=0;i<num;i++){
	//	fly[i].collide();
		fly[i].display(-seperation,-20);
		fly[i].display(seperation,20);
	}

}

// function mousePressed(){
// 	zapper.placeZapper();
// }


function Zapper(){
	this.x;
	this.y;
	this.d = 1000;

	this.zapper = 0;

	
	this.display = (POS,OFF)=>{
		push();

		this.x = map(mouseX,0,width,-w,w);
		this.y = map(mouseY,0,height,-w,w);
			let s = 1/(1+(D*scale));

	strokeWeight(s*weight);
	let x = (POS+X)*s;
	let y = Y*s;
		pop();
	}
}


function FlyTrap(){
	this.x;
	this.y;
	this.d = w*3;

	this.zapper = 0;

	this.tx;
	this.ty;
	this.td = this.d;
	this.tw;
	this.th;



	
	this.display = (POS,OFF)=>{
		push();


		this.x = map(mouseX,0,width,-w,w);
		this.y = map(mouseY,0,height,-w,w);
		
		if(this.zapper==0){
			//dPoint(this.tx+OFF,this.ty,this.td,POS);
		}else if(this.zapper==1){
			this.tw = this.x-this.tx;
			this.th = this.y-this.ty;
			stroke(255,50);
			strokeWeight(2);
			noFill();
			dRect(this.tx+OFF,this.ty,this.tw,this.th,this.td,POS);
		}else if(this.zapper == 2){
			fill(255,50);
			noStroke();
			dRect(this.tx+OFF,this.ty,this.tw,this.th,this.td,POS);
		}
		dImage(this.x+OFF, this.y,this.d,POS,cursor0);
		pop();
	}

	this.placeZapper = ()=>{
		if(this.zapper==0){
			this.tx = this.x;
			this.ty = this.y;

			this.zapper = 1;
		}else if(this.zapper == 1){
			this.zapper = 2;
			if(this.tw<0){
				this.tw *= -1;
				this.tx -= this.tw;
			}
			if(this.th<0){
				this.th *= -1;
				this.ty -= this.th;
			}
		}else if(this.zapper == 2){
			this.zapper = 0;
			this.tx = undefined;
			this.ty = undefined;
			this.tw = undefined;
			this.th = undefined;
			for(i=0;i<num;i++){
				fly[i].zapped = false;
			}
		
		}
	}
}




function Fly(){
	this.xseed = random(0,1000);
	this.yseed = random(0,1000);
	this.dseed = random(0,1000);
	this.wiggleX = 0;
	this.wiggleY = 0;
	this.x;
	this.y;
	this.d;


	this.inc = 0;

	this.zapped = false;

	this.display = function(POS,OFF){
		this.wiggleX = 0;//(noise(this.xseed+frameCount*0.1)-0.5)*5;
		this.wiggleY = 0;//(noise(this.yseed+frameCount*0.1)-0.5)*5;

		if(this.zapped==false){
			this.inc += 0.0025;
		}else if(this.zapped==true){
			this.inc += 0;
		}

		let offset = OFF;
		this.x = noise(this.inc+this.xseed)*w-(w/2)+offset+this.wiggleX;
		this.y = noise(this.inc+this.yseed)*w-(w/2)+this.wiggleY;
		this.d = noise((this.inc+this.dseed)*0.7)*w+this.wiggleX+(w*2.5);

		this.dPoint(this.x,this.y,this.d,POS);
	}

	this.collide = ()=>{

		if(
		zapper.zapper == 2 &&
		this.d < zapper.td+5 && 
		this.d > zapper.td-5 &&
		this.x > zapper.tx+5 && 
		this.x < zapper.tx + zapper.tw && 
		this.y > zapper.ty && 
		this.y < zapper.ty + zapper.th){
			this.zapped = true;
		}
	}

	this.dPoint = (X,Y,D,POS)=>{
	//receives X,Y,D in pixels. D is distance from view point in 'pixels'. X,Y => W,H

	let s = 1/(1+(D*scale));

	strokeWeight(s*weight);
	let x = (POS+X)*s;
	let y = Y*s;

	if(
	zapper.zapper==2 &&
	this.d > zapper.td && 
	this.x > zapper.tx && 
	this.x < zapper.tx + zapper.tw && 
	this.y > zapper.ty && 
	this.y < zapper.ty + zapper.th){
		stroke(100);
	}else{
		stroke(20);
	}

	point(x,y);
	}

}

function dRect(X,Y,W,H,D,POS){

	let s = 1/(1+(D*scale));
	let x = (POS+X)*s;
	let y = Y*s;
	let w = W*s;
	let h = H*s;
	rect(x,y,w,h);
}



function dImage(X,Y,D,O,IMG){

	let s = 1/(1+(D*scale));

	let x = (O+X)*s;
	let y = Y*s;
	image(IMG,x,y,IMG.width*s,IMG.width*s);

}
