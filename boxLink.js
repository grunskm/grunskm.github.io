function BoxLink(x,y,n){
	this.w = width/2;
	this.h = height/4;
	this.x = x*this.w;
	this.y = y*this.h;
	this.n = n;
	//print(this.n);


	this.display = function(){
		push();
		noStroke();
	    image(homeImg[this.n],this.x,this.y,this.w,this.w);
		pop();
	}
	
	this.hover = function(){
		if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h){
		push();
		fill(255,50);
		rect(this.x,this.y,this.w,this.h);
		textSize(30);
		fill(100,50,20);
		text(pageName[this.n],this.x+10,this.y+this.h-10);
		pop();
		}
	}
	
	this.resize = function(){
	this.w = width/2;
	this.h = height/4;
	this.x = x*this.w;
	this.y = y*this.h;
	}
}