// radius sketch

let dot = [];
let dots = 10000;
let radius = 200;
let d = radius*2;


function setup(){
	createCanvas(windowWidth,windowHeight);
	stroke(255);
	strokeWeight(1);
	translate(width/2,height/2);
	for(let i=0;i<dots;i++){
		dot.push(
			{
			a : random(0,TWO_PI),
			r : floor(sqrt(random(0,pow(radius,2))))
			}
		);
// 
// 		let x = sin(dot[i].a)*dot[i].r;
// 		let y = cos(dot[i].a)*dot[i].r;
// 		
// 		point(x,y);
	}

}

function draw(){
	//background(0);
	translate(width*0.5,height*0.5);
	
	let inc_a = map((mouseX+mouseY)%200,0,200,0,TWO_PI);

	for(let i=0;i<dot.length;i++){
		if(dot[i].a < inc_a+TWO_PI*0.02 && dot[i].a > inc_a-TWO_PI*0.02){

			let x = sin(dot[i].a)*dot[i].r;
			let y = cos(dot[i].a)*dot[i].r;
			
			stroke(0);
			point(x+width*0.2,y);
			point(x-width*0.2,y);
			
			dot[i].a = random(0,TWO_PI),
			dot[i].r = floor(sqrt(random(0,pow(radius,2))));
			
			x = sin(dot[i].a)*dot[i].r;
			y = cos(dot[i].a)*dot[i].r;
			
			stroke(255);
			point(x+width*0.2,y);
			point(x-width*0.2,y);
		}
	}
}




