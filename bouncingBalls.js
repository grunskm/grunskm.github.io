function Bouncing(){
  this.balls = [];
  this.backButton = new BackButton(0,0,100,40);

  for(i=0;i<30;i++){
    this.balls.push(new Ball(200,200,20));
  }

  this.display = function(){
    //background(0);
    strokeWeight(5);
    for(i=0;i<30;i++){
      this.balls[i].move();
      this.balls[i].collide();
    }
    push();
    fill(255);
    ellipse(mouseX,mouseY,40);
    pop();
    this.backButton.display();
    count = 0;
//   push();
//   textSize(30);
//   fill(200,200,11);
//   text("AVOID THE COLOURS",width*0.50,height*0.8);
//   pop();
    
  }
  this.click = function(){
		if(mouseX>this.backButton.x && 
       		mouseX<this.backButton.x+this.backButton.w && 
       		mouseY>this.backButton.y && 
       		mouseY<this.backButton.y+this.backButton.h){
				this.backButton.click()
		}
	}
  
  function Ball(x,y,s){
  	this.x = x;
    this.y = y;
    this.s = s;
    this.xchange = random(-3,3);
    this.ychange = random(-3,3);
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);

    this.move = function(){
    	this.x+=this.xchange;
    	this.y-=this.ychange;
    	if(this.x>width||this.x<0){
    	this.xchange *= -1
    	}
    	if(this.y>height||this.y<0){
    	this.ychange *= -1
    	}
    	
    	push();
    	fill(this.r,this.g,this.b);
		ellipse(this.x,this.y,this.s);
    }
    
    this.collide = function(){
     this.hit = collideCircleCircle(this.x, this.y, this.s, mouseX, mouseY, 40);

     if(this.hit){
      	currentPage = new HomePage();
    	}
    
    }
  }
}
