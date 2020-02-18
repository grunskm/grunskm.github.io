//// GRID IMAGE PAINTING///////


let rows = 10;
let cols = 10;


function setup() {
	if(windowWidth>windowHeight){
	createCanvas(windowWidth,windowWidth);
	}else{createCanvas(windowHeight,windowHeight);}
	noStroke();
	gridGrid();
}

function draw(){
// 	if(frameCount%30==0){
// 			rows = floor(random(3,30));
// 			cols = rows;
// 			gridGrid();
// 	}
}

function mousePressed(){
	rows = floor(random(3,10));
	cols = rows;
	gridGrid();
}
// function keyPressed(){
// 		saveCanvas("gridImage.png","png");
// }


function gridGrid(){
	for(i=0;i<rows;i++){
		for(e=0;e<cols;e++){
			let n = floor(random(4,13));
			grid(i*width/rows,e*height/cols,n,n,width/rows,height/cols);
		}
	}
}

function grid(xx,yy,row,col,wi,hi){
	for(q=0;q<row;q++){
		for(a=0;a<col;a++){
			let x = q*wi/col+xx;
			let y = a*hi/row+yy;
			let w = wi/col;
			let h = hi/row;
			fill(random(0,255),random(0,250),random(0,255));
			rect(x,y,w,h);
		}
	}
}