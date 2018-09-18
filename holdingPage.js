function HoldingPage(){
  this.ball = [];
  for(i=0;i<30;i++){
  	this.ball.push(new Ball(random(0,width),random(0,height),random(-2,2),random(-2,2)));
  }

  this.display = function(){
	  for(i=0;i<30;i++){
  		this.ball[i].bounce();
  		}
  		textSize(30);
  		text("WEBSITE COMING SOON",this.ball[0].x,this.ball[1].y);
  		text("I PROMISE",mouseX,mouseY);
  }
  
  this.click = function(){
	background(random(0,255),random(0,255),random(0,255));
  }
  
  this.resize = function(){
 	canvas.size(windowWidth,windowHeight);
  }
  
  function Ball(x,y,sx,sy){
	this.x = x;
	this.y = y;
	this.xspeed = sx;
	this.yspeed = sy;
	this.size = 20;
	
	this.r = random(0,255);
	this.g = random(0,255);
	this.b = random(0,255);
	
	this.bounce = function(){
		if(this.x>width||this.x<0){
			this.xspeed *= -1;
		}
		if(this.y>height||this.y<0){
			this.yspeed *= -1;
		}
		this.xspeed *= random(0.9,1.1);
		this.yspeed *= random(0.9,1.1);
		this.x += this.xspeed;
		this.y += this.yspeed;
		fill(this.r,this.g,this.b);
		ellipse(this.x,this.y,this.size);
	}
  }
}