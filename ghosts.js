function Ghosts(x,y){
	canvas.resize(ghostWall.width*2,windowHeight);
	this.x = 100;
	this.y = 100;
	this.imgx = width*0.25;
	this.imgy = height/2;
	this.wallh = height;
	this.scale = ghostWall.height/height;
	this.wallw = ghostWall.width*this.ratio;
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
			this.backButton.display();
		pop();
	}

	this.click = function(){
		this.n++;
		if(this.n>=ghostImg.length){
			this.n = 0;
		}
	
		if(mouseX>this.backButton.x && 
       		mouseX<this.backButton.x+this.backButton.w && 
       		mouseY>this.backButton.y && 
       		mouseY<this.backButton.y+this.backButton.h){
				this.backButton.click()
		}
	}
	this.resize = function(){
  		canvas.size(windowWidth,windowHeight);
  	}
}