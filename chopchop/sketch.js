
// let capture;
// 
// let constraints = {
// 	audio:false,
// 	video:{
// 		facingMode:{
// 			exact:"environment"
// 		}
// 	}
// }
// capture = createCapture(constraints);
// if(!capture){
// 	capture = createCapture(VIDEO);
// }
// capture.hide();

//  free

let input;
let img;

let frame;

function preload(){
  img = loadImage("./drawing_small.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255,0,0);
  
  frame = new Frame();
  frameRate(30);
}

function draw() {
	background(200);
	image(img,0,0);
	
	frame.display()
	if(keyCode == DOWN_ARROW){
		frame.advance();
	}
	
	text("play/pause",width*0.45,height*0.9);
	text("save",width*0.9,height*0.9);
	text("settings",width*0.1,height*0.9);
}

function mousePressed(){
	frame.chop();
}

function keyPressed(){
	if(keyCode == RIGHT_ARROW){
		frame.advance();
	}
}

// function mouseReleased(){
// 	frame.assign(false);
// }


class Frame{
	constructor(){
		this.w = 70;
		this.h = 30;
		this.x = width/2;
		this.y = height/2;
		this.cols = floor(img.width/this.w);
		this.rows = floor(img.height/this.h);
		this.action = "none"
		this.cell = [];
		this.n = 0;
		print(this.rows,this.cols);
	}
	display(){
		
		rect(this.x-this.w/2,this.y-this.h/2,this.w, this.h);
		
		if(this.cell.length>0){
			image(this.cell[this.n].p,this.x-this.w/2,this.y-this.h/2);
			rect(this.cell[this.n].x,this.cell[this.n].y,this.w,this.h);
		}

	}
	chop(){
		for(let row = 0; row<this.rows; row++){
			for(let col = 0; col<this.cols; col++){
				this.cell.push({
					p:img.get(col*this.w,row*this.h,this.w,this.h),
					x:col*this.w, 
					y:row*this.h
				});
			}
		}
	}
	advance(){
		this.n++;
		if(this.n>=this.cell.length){
			this.n = 0;
		}
	}
	
// 	assign(tag){
// 		if(tag == false){
// 			this.action = "none";
// 		}
// 	}
}
