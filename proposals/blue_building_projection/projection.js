

let frame = [];
let tempVert = [];
let source;
let inputEnabled = true;

function preload(){
	source = loadImage("source.png");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
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

	if(keyCode == ENTER){
		frame.push(new WindowFrame(tempVert));
		print(frame);
		tempVert = [];
	}

	if(keyCode == BACKSPACE){
		frame.pop();
		print(frame);
		tempVert = [];
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

	this.sample = {x:random(0.1,0.9),y:random(0.1,0.9)};
	this.dir = {x:random(-0.0001,0.0001),y:random(-0.0001,0.0001)};
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
		if(this.sample.x<0.1 || this.sample.x>0.9){
			this.dir.x*=-1;
		}
		if(this.sample.y<0.1 || this.sample.y>0.9){
			this.dir.y*=-1;
		}
		this.fill = source.get(this.sample.x*source.width,this.sample.y*source.height);

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
