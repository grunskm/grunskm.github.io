
let capture;
let fps = 15;
let input;
let img;
let frame;
let play = false;
let exportMode = false;
let preview_height, preview_width;


//let container = document.getElementById("my-container");
let gif, gifLoading;


function preload(){
  img = loadImage("./drawing.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight*0.9);
  
  preview_height = height*0.5;
  
  noFill();
  stroke(255,0,0);
  background(100);
  frame = new Frame();
  frame.chop();
  frameRate(fps);
  
	capture = createCapture({
			audio:false,
			video:{facingMode:{exact:"user"}}
		});
		
	if(!capture){
		capture = createCapture(VIDEO);
	}
	capture.hide();
	preview_width = (preview_height/capture.height)*capture.width;
	
	gifLoading = fetch('https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js').then(
	(response) => {
		if (!response.ok)throw new Error("Network response was not OK");
		return response.blob();
	}).then(workerBlob => {
		gif = new GIF({
		workers: 4,
		workerScript: URL.createObjectURL(workerBlob),
		quality: 10,
		width: preview_width,
		height: preview_height
		});
	
		gif.on('finished', function(blob) {
			window.open(URL.createObjectURL(blob));
		});

		return gif;
	});
}

function draw() {
	background(200);

	//frame.displayAll();
	if(exportMode==false){
		image(capture,0,0,preview_width,preview_height);
		image(img, 0,preview_height,preview_width,preview_height);
		frame.display(width*0.75,height*0.5);
	}else{
		//frame.exportDisplay();
	}


	if(play==true){
		frame.advance();
	}
}

function keyPressed(){
	if(keyCode == SHIFT){
		img = capture.get();
		frame = new Frame();
		frame.chop();
	  preview_width = (preview_height/capture.height)*capture.width;

	}else
	if(keyCode == RIGHT_ARROW){
		frame.advance();
	}else
	if(keyCode == OPTION){
		exportGif();
	}else
	if(keyCode==DOWN_ARROW){
		if(play==false){play=true;}else{play=false;}
	}
}

class Frame{
	constructor(){
		this.w = 100;
		this.h = 100;

		this.cols = floor(img.width/this.w);
		this.rows = floor(img.height/this.h);
		this.action = "none"
		this.cell = [];
		this.n = 0;
		print(this.rows,this.cols); 
	}
	exportDisplay(){
			if(this.cell.length>0){
				image(this.cell[this.n].p,0,0);
			}
			
			gifLoading.then(gif => {
			for(let i=0;i<100;i++){
			  let img = document.getElementById(i);
				gif.addFrame( img , { delay: 100 });
			}

			gif.render();
			});
	}
	display(X,Y){
		
		//rect(this.x-this.w/2,this.y-this.h/2,this.w, this.h);
		
		if(this.cell.length>0){
			image(this.cell[this.n].p,X-this.w/2,Y-this.h/2);
			//rect(this.cell[this.n].x+width/2-img.width/2,this.cell[this.n].y+height/2-img.height/2,this.w,this.h);
		}

	}
	displayAll(){
	if(this.cell.length>0){
		let k = 0;
			for(let col=0; col<this.cols; col++){
				for(let row=0; row<this.rows; row++){
					image(this.cell[k].p,this.cell[k].x+width/2-img.width/2,this.cell[k].y+height/2-img.height/2);
					k++;
				}
			}
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
			if(exportMode==true){
				exportMode=false;
				resizeCanvas(windowWidth,windowHeight);
			}
			this.n = 0;
		}
	}
}

function exportGif(){
	gifLoading.then(gif => {
	for(let i=0;i<99;i++){
		let img = document.getElementById(i);
		gif.addFrame( img , { delay: 100 });
	}


	});
}






