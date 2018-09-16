function HomePage(){
  pageName = ["IN THE STUDIO","PLASTER","FLUFFS","PAINTHINGS","INSTALLATION","PUBLIC PROJECTS","UNCATAGORIZABLE","AVOID"];
  canvas = createCanvas(windowWidth,windowHeight);

  this.col = 2;
  this.line = 4;
  this.boxLink = [];
  
  for(i=0;i,i<this.col;i++){
  	for(e=0;e<this.line;e++){
  	  this.boxLink.push(new BoxLink(i,e,(i*this.line)+e));
  	}
  }

  this.display = function(){
  	//background Image
  	//title info
  	//exterior links
  	
  	for(i=0;i,i<pageCount;i++){
  	this.boxLink[i].display();
  	this.boxLink[i].hover();
  	}
  }
  
  this.click = function(){
  	for(i=0;i<8;i++){
    	if(mouseX>this.boxLink[0].x && 
    	   mouseX<this.boxLink[0].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[0].y && 
    	   mouseY<this.boxLink[0].y+this.boxLink[i].h){
    	   currentPage = new Ghosts(0);
  		}
  		if(mouseX>this.boxLink[1].x && 
    	   mouseX<this.boxLink[1].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[1].y && 
    	   mouseY<this.boxLink[1].y+this.boxLink[i].h){
    	   currentPage = new Ghosts(1);
  		}
  		if(mouseX>this.boxLink[2].x && 
    	   mouseX<this.boxLink[2].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[2].y && 
    	   mouseY<this.boxLink[2].y+this.boxLink[i].h){
    	   currentPage = new Fluffs();
  		}
  		if(mouseX>this.boxLink[3].x && 
    	   mouseX<this.boxLink[3].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[3].y && 
    	   mouseY<this.boxLink[3].y+this.boxLink[i].h){
    	   currentPage = new Ghosts(3);
  		}
  		if(mouseX>this.boxLink[4].x && 
    	   mouseX<this.boxLink[4].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[4].y && 
    	   mouseY<this.boxLink[4].y+this.boxLink[i].h){
    	   currentPage = new Ghosts(4);
  		}
  		if(mouseX>this.boxLink[5].x && 
    	   mouseX<this.boxLink[5].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[5].y && 
    	   mouseY<this.boxLink[5].y+this.boxLink[i].h){
    	   currentPage = new Ghosts(5);
  		}
  		if(mouseX>this.boxLink[6].x && 
    	   mouseX<this.boxLink[6].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[6].y && 
    	   mouseY<this.boxLink[6].y+this.boxLink[i].h){
    	   currentPage = new Ghosts(6);
  		}
  		if(mouseX>this.boxLink[7].x && 
    	   mouseX<this.boxLink[7].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[7].y && 
    	   mouseY<this.boxLink[7].y+this.boxLink[i].h){
    	   currentPage = new Bouncing();
  		}
  	}
  }
  
  this.resize = function(){
  canvas.size(windowWidth,windowHeight);
  for(i=0;i,i<pageCount;i++){
  	this.boxLink[i].resize();
  	}
  print("resize");
  }
}


