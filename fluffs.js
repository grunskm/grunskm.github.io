function Fluffs(){
	this.n = 0;
	this.imgw = width/3;
	this.scale = this.imgw/fluffImg[this.n].width;
	this.imgh = fluffImg[this.n].height*this.scale;
	this.x = width/2;
	this.imgx = width/2;
	this.imgy = height/2;
	this.slide = 0;
	

	
	this.backButton = new BackButton(0,0,100,40);
	
	this.words = new TextObject(width*0.95,this.imgy,
	"Fluffs (2013)",
	"Embossed paper",
	"Fluffs is a series of 130 paper embossings",
	"that uses the repeating pattern of a roll",
	"of toilet paper as a stencil. Each piece",
	"is embossed individually by hand.");

	this.display = function(){
	background(170);
	push();
	imageMode(CENTER);
	/////////////////////////////// positioning of image according to text position
	if(this.words.x<width*0.8){
		this.x = width*0.30;
	}else{
		this.x = width*0.5;
	}
	
	///////////////////////////////// display text
	textSize(this.textSize);
	this.words.display();
	this.words.hover();
	
	/////////////////////////////// animation of image
	if(this.x-this.imgx > 10||this.x-this.imgx < -10){
		this.slide = (this.x-this.imgx)*0.1;
	}else{this.slide = 0;}
	
	this.imgx+=this.slide; 
	
	image(fluffImg[this.n],this.imgx,this.imgy,this.imgw,this.imgh);
	

	pop();
	///////////////////////////////// display back button
	this.backButton.display();

	}

	this.click = function(){
		this.n++;
		if(this.n>=10){
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
		this.imgw = width/3;
		this.imgx = width/2;
		this.imgy = height/2;
		this.scale = this.imgw/fluffImg[this.n].width;
		this.imgh = fluffImg[this.n].height*this.scale;
	}
}
