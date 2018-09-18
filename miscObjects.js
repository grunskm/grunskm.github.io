function BackButton(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.textfill=150;
	
	this.display = function(){
	push();
	fill(170,70,20);
	rect(this.x,this.y,this.w,this.h);
	fill(this.textfill);
	textSize(20);
	text("BACK",this.x+30,this.y+this.h-5);
	pop();
	}
	
	this.hover = function(){
		if(mouseX>this.x && 
       		mouseX<this.x+this.w && 
       		mouseY>this.y && 
       		mouseY<this.y+this.h){
					this.textfill = 225;
				}else{this.textfill = 150;}
	}
	
	this.click = function(){
		if(mouseX>this.x && 
       		mouseX<this.x+this.w && 
       		mouseY>this.y && 
       		mouseY<this.y+this.h){
			currentPage = new HomePage();
			currentPage.resize();
		}
	}
}

function TextObject(x,y,t0,t1,t2,t3,t4,t5,t6,t7){
	this.x = x;
	this.textx = x;
	this.y = y;
	this.slide = 0;
	this.space = 20;
	this.textSize = 20;
	
	this.text = [];
	this.text[0] = t0;
	this.text[1] = t1;
	this.text[2] = t2;
	this.text[3] = t3;
	this.text[4] = t4;
	this.text[5] = t5;
	this.text[6] = t6;
	
	this.display = function(){
		for(i=0;i<6;i++){
			push();
			if(this.x<mouseX){
				fill(50);
			}else if(this.x>mouseX){
				fill(50);
			}
			textSize(this.textSize);
			textStyle(ITALIC);
			text(this.text[i],this.textx,this.y+i*this.space);
			//fill(170,70,20);
			//rect(this.textx-150,this.y,140,40);
			pop();
			}
			
			if(this.x-this.textx > 10||this.x-this.textx < -10){
				this.slide = (this.x-this.textx)*0.1;
			}else{this.slide = 0;}
				this.textx += this.slide;
			}
			

	
	this.hover = function(){
		if(mouseX>this.x-20){
			this.x = width*0.5;
		}else if(mouseX < this.x){
			this.x = width*0.95;
		}
	}
}

  loadImg = function(){
  
  }

