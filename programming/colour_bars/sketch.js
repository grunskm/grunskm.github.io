
let div = 15;
let strip = [];
// let img = [];
let img;

function preload(){
	img = loadImage("images/fish3.jpg");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	noStroke();
	frameRate(30);

	for(i=0;i<div;i++){
// 		img.push(loadImage("images/image"+i+".jpg"));
		let w = width/(div-1);
		let h = height;
		let x = w*i;
		let y = 0;
		let c = 0;

		strip.push(new Strip(x,y,w,h,c,i));
	}
}

function draw(){
	for(i=0;i<div;i++){
		strip[i].display();
	}
}

function Strip(x,y,w,h,c,i){
// 	this.sample = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.c = c;
	this.sampleX = floor(random(img.width*0.3,img.width*0.7));
	this.sampleY = floor(random(img.width*0.3,img.width*0.7));
	this.mx = 1;
	this.my = 0.5;
	
	this.display = ()=>{

		this.sampleX += this.mx;
		this.sampleY += this.my;

		this.c = img.get(this.sampleX,this.sampleY);

		if(this.sampleX > img.width-5 || this.sampleX < 5){
			this.mx *= -1;
		}
		if(this.sampleY > img.height-5 || this.sampleY < 5){
			this.my *= -1;
		}

		this.x += 1;

		if(this.x>width){
			this.x = -this.w;
		}

		fill(this.c);
		rect(this.x,this.y,this.w,this.h);
	}

}
