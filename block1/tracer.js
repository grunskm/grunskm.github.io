
let block1;
let drawing = false;
let gum = [];


function preload(){
	block1 = loadImage('block-1.1.png');
}

function setup(){
	createCanvas(windowHeight,windowHeight);
	noFill();
	noCursor();
	
}

function draw(){
	background(100);
	stroke(255,0,0);
	image(block1,0,0,width,height);
	
	fill(255,255,0);
	for(let i=0;i<gum.length;i++){
		beginShape();
		for(let e=0;e<gum[i].length;e++){
			vertex(gum[i][e].x*width,gum[i][e].y*height);
		}
		endShape(CLOSE);
	}
	noFill();
	
	
	ellipse(mouseX,mouseY,30);
	line(mouseX,mouseY+30,mouseX,mouseY-30);
	line(mouseX+30,mouseY,mouseX-30,mouseY);
	
	
}

function mousePressed(){
	if(drawing==false){
		drawing = true;
		gum.push([]);
		addpoint();
	}else{
		addPoint();
	}
	function addPoint(){
		let tx = mouseX/width;
		let ty = mouseY/height;
		gum[gum.length-1].push({x:tx,y:ty});
	}
}

function keyPressed(){
	if(keyCode== RETURN ){
		drawing = false;
		print('gum finish');
	} 
	if(keyCode==TAB){
		print('gum pop');
		gum.pop();
	}
	if(keyCode==OPTION){
		createStringDict(gum).saveJSON('gum_data');
	}
}




