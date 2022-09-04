
let popcorn = [];
let corn = [];
let scale;

let n = 0;

function preload(){
	for(i=0;i<100;i++){
		popcorn[i] = loadImage("popcorn/popcorn-"+(i+1)+".png");
	}
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	corn[0] = new obj(n);
	noCursor();
	textSize(30);
	fill(250,180,10);
	if(width<height){
		scale = 0.1;
	}else{
		scale = 0.15;
	}
}

function draw(){

	background(255);

	if(n<100){
		if(width<height){
			if(n===0){
				text("pop",width/2-20,height/2);
			}
			 corn[0].move(-100,-100);
		}else{
			corn[0].move(mouseX,mouseY);
		}
	}else{
	  cursor();
		noFill();
	}
	for(i=0;i<corn.length;i++){
		corn[i].display();
	}
	text(100-n,width*0.05,height*0.05);
}

function obj(N){

	this.x = width/2;
	this.y = height/2;

	this.p = N;
	this.r = 0;

	this.display = ()=>{
		push();
	//
		translate(this.x,this.y);
		rotate(this.r);

		image(popcorn[this.p],-popcorn[this.p].width*0.5*scale,-popcorn[this.p].height*0.5*scale,popcorn[this.p].height*scale,popcorn[this.p].height*scale);
		pop();
	}

	this.move = (X,Y)=>{
		this.x = X;
		this.y = Y;
		this.r = frameCount*0.01;
	}
}

function mousePressed(){
	//print(n);
	if(width<height){
		if(mouseX>width*0.1 && mouseY>height*0.1){
			n++;
			if(n<100){
				corn[0].x = mouseX;
				corn[0].y = mouseY;
				corn.unshift(new obj(n));
			}
		}
	}else{
		n++;
		if(n<100){
			corn.unshift(new obj(n));
		}
	}
}
