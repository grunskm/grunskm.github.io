
let frame = [];
let tempVert = [];
let source = [];
let inputEnabled = true;
let currentImg = 1;

function preload(){
	source.push(loadImage("img0.png"));
	source.push(loadImage("img1.png"));
	source.push(loadImage("img2.png"));
	source.push(loadImage("img3.png"));
	source.push(loadImage("img4.png"));
	source.push(loadImage("img5.png"));

}

function setup(){
	createCanvas(windowWidth,windowHeight);
	frameRate(30);
	noStroke();
	noCursor();
}

function draw(){
	if(inputEnabled == true){
		background(0);
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
		for(i=0;i<frame.length;i++){
			frame[i].show();
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
		currentImg++;
		if(currentImg>=source.length){
			currentImg = 0;
		}
		for(t=0;t<frame.length;t++){
			frame[t].resample();
		}
	print(currentImg);
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

	this.sample = {x:floor(random(5,source[currentImg].width-5)),y:floor(random(5,source[currentImg].height-5))};
	this.dir = {x:1,y:1.2};
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
		if(this.sample.x<1 || this.sample.x>source[currentImg].width-5){
			this.dir.x*=-1;
		}
		if(this.sample.y<1 || this.sample.y>source[currentImg].height-5){
			this.dir.y*=-1;
		}
		this.fill = source[currentImg].get(this.sample.x,this.sample.y);

	}
	this.resample = function(){
		this.sample = {x:floor(random(5,source[currentImg].width-5)),y:floor(random(5,source[currentImg].height-5))};
	}

}

window.onresize = ()=>{

}

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
