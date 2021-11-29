

let frame = [];
let tempVert = [];
let backg;
let source = [];
let img = 0;
let inputEnabled = true;

function preload(){
	source.push(loadImage("source.png"));
	source.push(loadImage("plant.JPG"));
	source.push(loadImage("yellow.JPG"));
	backg = loadImage("background.png");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	noStroke();
	noCursor();
}

function draw(){
	if(inputEnabled == true){
		background(0);
		image(backg,0,0,height,height);
		instructions();

		for(t=0;t<frame.length;t++){
			frame[t].showVert();
		}
		for(i=0;i<tempVert.length;i++){
			greenCross(tempVert[i].x,tempVert[i].y);
		}
		cross(mouseX,mouseY);
	}else{
		background(200);
		image(backg,0,0,height,height);
		for(i=0;i<frame.length;i++){
			frame[i].show();
		//	source[img].loadPixels();
			frame[i].update();
		}
	}
}

function keyPressed(){
	if(keyCode == TAB){
		if(inputEnabled == true){
			inputEnabled = false;
			print("inputEnabled is "+inputEnabled);
		}else{
			inputEnabled = true;
			print("inputEnabled is "+inputEnabled);
		}
		return false;
	}

	if(keyCode == ENTER && tempVert.length>2){
		frame.push(new WindowFrame(tempVert));
		print(frame);
		tempVert = [];
	}

	if(keyCode == BACKSPACE){
		frame.pop();
		print(frame);
		tempVert = [];
	}

	if(keyCode == UP_ARROW){
		img++;
		if(img>=source.length){
			img = 0;
			for(i=0;i<frame.length;i++){
				frame[i].reseed();
			}
		}
	}

}

function mousePressed(){
	if(inputEnabled == true){
		tempVert.push({
			x:mouseX,
			y:mouseY
		});
		print(tempVert);
	}
}

function WindowFrame(POINTS){
	this.pos = POINTS;

	this.sample = {x:random(10,source[img].width-10),y:random(10,source[img].height-10)};
	this.dir = {x:0,y:1};
	this.fill = color(255,0,0);

	this.show = function(){
		push();
			fill(this.fill);
			beginShape();
				for(e=0;e<this.pos.length;e++){
					vertex(this.pos[e].x,this.pos[e].y);
				}
			endShape(CLOSE);
		pop();
	}

	this.showVert = function(){
		push();
			beginShape();
				for(i=0;i<this.pos.length;i++){
					vertex(this.pos[i].x,this.pos[i].y);
					redCross(this.pos[i].x,this.pos[i].y);
				}
			endShape(CLOSE);
		pop();
	}

	this.update = function(){
		this.sample.x += this.dir.x;
		this.sample.y += this.dir.y;
		if(this.sample.x<5 || this.sample.x>source[img].width-5){
			this.dir.x*=-1;
		}
		if(this.sample.y<5 || this.sample.y>source[img].height-5){
			this.dir.y*=-1;
		}
		this.fill = source[img].get(this.sample.x,this.sample.y);
		//this.fill = pixels[(this.sample.y*source[img].width+this.sample.x)];

	}
	this.reseed = function(){
		this.sample = {x:random(10,source[img].width-10),y:random(10,source[img].height-10)};
	}
}

// window.onresize = ()=>{
//
// }

function cross(X,Y){
	push();
		stroke(255);
		strokeWeight(2);
		line(X-30,Y,X+30,Y);
		line(X,Y-30,X,Y+30);
	pop();
}
function redCross(X,Y){
	push();
		stroke(255,0,0);
		strokeWeight(2);
		line(X-20,Y-20,X+20,Y+20);
		line(X-20,Y+20,X+20,Y-20);
	pop();
}
function greenCross(X,Y){
	push();
		stroke(0,255,0);
		strokeWeight(2);
		line(X-20,Y-20,X+20,Y+20);
		line(X-20,Y+20,X+20,Y-20);
	pop();
}
function instructions(){
	push();
	fill(255);
		text("CLICK = CREATE SHAPE",20,25);
		text("'ENTER' = SAVE SHAPE",20,50);
		text("'TAB' = TOGGLE MODE",20,75);
		text("'BACKSPACE' = DELETE LAST SHAPE",20,100);
	pop();
}
