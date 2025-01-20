
let capture;
// let fps = 15;

// let play = false;
// let cap_mode = false;

// for organization purposes:
// preview = live camera view?
// src = last captured image
// frame = current animation

// let frame;
// let src_img;
// let prv_img;
// let preview;

// function preload(){
//   src_img = loadImage("./test5.jpg");
// }

function setup() {
  createCanvas(400, 400);
  
//   noFill();
//   stroke(255,0,0);
//   frame = new Frame();
// 
//   frameRate(fps);
  let constraints = {
		audio:false,
		video: {
			facingMode:{
				exact:"environment"
			}
		}
	};
  
	capture = createCapture(constraints);
		
// 	if(!capture){
// 		capture = createCapture(VIDEO);
// 	}
	capture.hide();
  
}

function draw() {
	background(255);
	
	image(capture,0,0);
	
// 	if(cap_mode==false){
// 		//image(capture,0,0,preview_width,preview_height);
// 
// 		image(prv_img, 0,0);
// 		frame.display(width*0.75,height*0.5);
// 	}else{
// 		image(capture,0,0);
// 	}
// 
// 	if(play==true){
// 		frame.advance();
// 	}
}

// function mousePressed(){
// 	if(play==false){play=true;}else{play=false;}
// }
// 
// function keyPressed(){
// 	let st = 5;
// 	// adjusting frame size. sketch breaks when frame size below 0.
// 	if(keyCode == LEFT_ARROW){
// 		if(frame.w>st*4){
// 			frame.adjwidth(-st);
// 		}
// 	}else
// 	if(keyCode == RIGHT_ARROW){
// 		if(frame.w<(src_img.width-st*4)){
// 			frame.adjwidth(st);
// 		}
// 	}else
// 	if(keyCode == DOWN_ARROW){
// 		if(frame.h>st*4){
// 			frame.adjheight(-st);
// 		}
// 	}else
// 	if(keyCode == UP_ARROW){
// 		if(frame.h<src_img.height-st*4){
// 			frame.adjheight(st);
// 		}
// 	}
// 	
// 	if(keyCode == 87){ // w key
// 		frame.y_inset += st;
// 		print(frame.y_inset);
// 		frame.n = 0;
// 		frame.chop();
// 	}else
// 	if(keyCode == 83){ // s key
// 		frame.y_inset += -st;
// 		print(frame.y_inset);
// 		frame.n = 0;
// 		frame.chop();
// 	}else
// 	if(keyCode == 65){ // a key
// 		frame.x_inset += -st;
// 		print(frame.x_inset);
// 		frame.n = 0;
// 		frame.chop();
// 	}else
// 	if(keyCode == 68){ //d key
// 		frame.x_inset += st;
// 		print(frame.x_inset);
// 		frame.n = 0;
// 		frame.chop();
// 	}
// 	
// 	if(keyCode == 88){
// 		if(cap_mode==false){
// 			cap_mode = true;
// 		}else{cap_mode = false}
// 	}
// 	if(keyCode==80){
// 		src_img = capture;
// 		frame.chop();
// 	}
// }
// 
// function reset_image(){
// 
// 
// }
// 
class Frame{
	constructor(){
		this.x_inset = 0;
		this.y_inset = 0;
		this.w = 100;
		this.h = 100;
		
		this.cols;
		this.rows;

		this.cell = [];
		this.n = 0;
		
		this.chop();
	}

	display(X,Y){
		let x = X-this.w/2;
		let y = Y-this.h/2;

		if(this.cell.length>0){
			image(this.cell[this.n].p,x,y);
		}
	}
	
	chop(){
		this.cols = floor((src_img.width-this.x_inset)/this.w);
		this.rows = floor((src_img.height-this.y_inset)/this.h);
		this.cell = []
			for(let row = 0; row<this.rows; row++){
				for(let col = 0; col<this.cols; col++){
				let x = col*this.w+this.x_inset;
				let y = row*this.h+this.y_inset;
					this.cell.push({
						p:src_img.get(x,y,this.w,this.h),
						x:x,
						y:y
					});
				}
			}
		}
	adjwidth(V){
		this.w += V;
		this.n = 0;
		this.chop();
		print(this.w);
	}

	adjheight(V){
		this.h += V;
		this.n = 0;
		this.chop();
		print(this.h);
	}
	adj_x_inset(V){
		this.x_inset += V;
		this.n = 0;
		this.chop();
		print(this.x_inset);
	}
	adj_y_inset(V){
		this.y_inset += V;
		this.n = 0;
		this.chop();
		print(this.y_inset);
	}

	advance(){
		this.n++;
		if(this.n>=this.cell.length){
			this.n = 0;
		}
	}
}


