function Ghosts(x,y){
	this.x = 100;
	this.y = 100;
	this.imgx = width*0.25;
	this.imgy = height/2;
	this.wallh = windowHeight;
	this.p;

	
	this.n = 0;
	//this.words = new TextObject();
	
	this.backButton = new BackButton(0,0,100,40);
	
	this.display = function(){
		push();	
	 		background(100);
	 		imageMode(CORNER);
	 		image(ghostWall,0,0,this.wallw,this.wallh);
	 		image(ghostWall,width/2,0,this.wallw,this.wallh);
	 		
	 		
			imageMode(CENTER);
			image(ghostImg[0],this.imgx,this.imgy);
			image(ghostImg[1],this.imgx*2,this.imgy);
			text(lines,mouseX,mouseY);
			
			this.backButton.display();
			this.backButton.hover();
		pop();
	}

	this.click = function(){
		this.n++;
		if(this.n>=ghostImg.length){
			this.n = 0;
		}
		this.backButton.click()
	}
	this.resize = function(){
		this.wallh = windowHeight;
		this.wallw = windowHeight/ghostWall.height*ghostWall.width;
		canvas.resize(2*this.wallw,this.wallh);
  	}
}