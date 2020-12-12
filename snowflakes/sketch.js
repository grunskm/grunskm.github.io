
let sketch = function(p) {

	let tx;
	let ty;

	p.setup = function(){
		p.createCanvas(p.windowWidth,p.windowHeight);
		p.stroke(255);
		p.strokeWeight(3);
		p.background(255);
		p.angleMode(p.DEGREES);
		p.fill(0);
		p.rect(50,50,p.width-100,p.height-100);

	}

	p.draw = function(){

		if(p.mouseIsPressed){
			for(i=0;i<6;i++){
				p.push();
				p.translate(tx,ty);
				p.rotate(60*i);
				p.point(p.mouseX-tx,p.mouseY-ty);
				p.rotate(30);
				p.point((p.mouseX-tx)/2,(p.mouseY-ty)/2);

				p.pop();
			}
		}
	}

	p.mousePressed = function(){
		tx = p.mouseX;
		ty = p.mouseY;

	}
}

  p51 = new p5(sketch);
