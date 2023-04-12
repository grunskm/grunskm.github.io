

function setup(){
	createCanvas(500,500);
	stroke(255);

	background(50);
	for(let i=0;i<5;i++){
		for(let e=0;e<5;e++){
			let rot = floor(random(0,4))*TWO_PI*0.25;
			curved_cell(i*100+50,e*100+50,100,rot,5);
		}	
	}
}


function square_cell(X,Y,WIDTH, R, SPACE){
	let space = SPACE;
	let lines = WIDTH/space;
	push();
	translate(X,Y);
	rotate(R);
	for(let i=0; i<lines; i++){
		let x1 = 0-WIDTH/2;;
		let y1 = i*space-WIDTH/2;;
		let x2 = WIDTH-i*space-WIDTH/2;;
		let y2 = i*space-WIDTH/2;;
		
		line(x1,y1,x2,y2);
		
		x1 = WIDTH-i*space-WIDTH/2;
		y1 = i*space-WIDTH/2;
		x2 = WIDTH-i*space-WIDTH/2;
		y2 = WIDTH-WIDTH/2;
		
		line(x1,y1,x2,y2);
	}
	pop();
}

function curved_cell(X,Y,WIDTH, R, SPACE){
	let space = SPACE;
	let lines = WIDTH/space;
	push();
	translate(X,Y);
	rotate(R);
	beginShape();
	for(let i=0; i<lines; i++){
		let a = i*(TWO_PI*0.25/lines);
		let x = sin(a)*W/2+X;
		let y = cos(a)*W/2+Y;
		vertex(x,y);
	}
	endShape(OPEN);
	pop();
}

