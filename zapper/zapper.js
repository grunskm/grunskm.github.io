

let num = 15;
let fly = [];
let zapper;

let zap;

let seperation;

let scale = 0.001;
let weight = 10;

let w;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);

	noCursor();

	w = width;
	seperation = width*0.2;

	for(i=0;i<num;i++){
		fly.push(new Fly());
	}

	zapper = new Zapper();

	zap = loadSound('snip.mp3');

}

function draw(){
	translate(width/2,height/2);
	background(210,150,30);

	zapper.update();
	zapper.display(-seperation,-40);
	zapper.display(seperation,40);

	for(i=0;i<fly.length;i++){
		fly[i].update();
		fly[i].collide();
		fly[i].display(-seperation,-40);
		fly[i].display(seperation,40);
	}
}

function keyPressed(){
	if(keyCode===RETURN){
		for(i=0;i<num;i++){
			fly.push(new Fly());
		}
	}
}


function Zapper(){
	this.x;
	this.y;
	this.d = 1500;
	this.scale = 1/(1+(this.d*scale));
	this.w = w*0.1*this.scale;
	this.h = w*0.1*this.scale;

	this.charged = false;

	this.update = ()=>{

		if(mouseIsPressed){
			this.charged = true;
		}else{this.charged = false;}

		this.x = map(mouseX,0,width,-w,w)*this.scale;
		this.y = map(mouseY,0,height,-w,w)*this.scale;
	}
	this.display = (POS,OFF)=>{
		push();
			if(this.charged==true){
			noStroke();
			fill(200,100);
			}else if(this.charged==false){
				noFill();
				stroke(200,100);
				strokeWeight(2);
			}
			let x = this.x+(OFF*this.scale);
			rect(x+POS,this.y,this.w,this.h);
		pop();
	}
}


function Fly(){
	this.xseed = random(0,1000);
	this.yseed = random(0,1000);
	this.dseed = random(0,1000);


	this.wiggleX;
	this.wiggleY;
	this.x;
	this.y;
	this.d;
	this.scale;

	this.inc = 0;
	this.fall = 0.3;
	this.down = 0;
	this.floor = 600;


	this.zapped = false;
	this.dead = false;

	this.update = ()=>{

		if(this.zapped == false){
			this.wiggleX = (noise(this.xseed+frameCount*0.1)-0.5)*5;
			this.wiggleY = (noise(this.yseed+frameCount*0.1)-0.5)*5;
			this.inc += 0.004;
			this.d = noise(this.inc+this.dseed)*3000+this.wiggleX;
			this.scale = 1/(1+(this.d*scale));
			this.x = (noise(this.inc+this.xseed)*w-(w/2)+this.wiggleX)*this.scale;
			this.y = (noise(this.inc+this.yseed)*w-(w/2)+this.wiggleY)*this.scale;
			
		}else if(this.zapped == true && this.dead == false){
// 		  this.inc += 0.1;
// 			this.d += noise(this.inc)*20+10;
			this.scale = 1/(1+(this.d*scale));

			this.down += this.fall;
			this.y+= this.down;
		}else if(this.dead == true){
			this.y = this.floor*this.scale;
		}
		
		if(this.y>this.floor*this.scale && this.down>0){
			this.down*=-random(0.2,0.4);
			if(this.down<0.1 && this.down > -0.1){
				this.dead = true;
			}
		}

	}

	this.display = function(POS,OFF){


		strokeWeight(weight*this.scale);
		let x = this.x+(OFF*this.scale);

		if(
		zapper.charged==true &&
		this.d > zapper.d && 
		x > zapper.x+(OFF*this.scale) && 
		x < zapper.x+(OFF*this.scale) + zapper.w && 
		this.y > zapper.y && 
		this.y < zapper.y + zapper.h){
			stroke(150);
		}else{
			stroke(20);
		}

		point(x+POS,this.y);
	}

	this.collide = ()=>{

		if(
		zapper.charged == true &&
		this.zapped == false &&
		this.d < zapper.d+100 && 
		this.d > zapper.d-100 &&
		this.x > zapper.x && 
		this.x < zapper.x + zapper.w && 
		this.y > zapper.y && 
		this.y < zapper.y + zapper.h){
			zap.play();
			this.zapped = true;
		}
	}
}





