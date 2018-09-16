function HomePage(){
  pageName = ["STUDIO","PLASTER","FLUFFS","PAINTHINGS","INSTALLATION","PUBLIC PROJECTS","UNCATAGORIZABLE","AVOID"];
  page = [new Ghosts(),new Ghosts, new Fluffs(), new Ghosts(), new Ghosts(), new Ghosts(), new Ghosts(), new Bouncing()];
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
    	if(mouseX>this.boxLink[i].x && 
    	   mouseX<this.boxLink[i].x+this.boxLink[i].w && 
    	   mouseY>this.boxLink[i].y && 
    	   mouseY<this.boxLink[i].y+this.boxLink[i].h){
    	   currentPage = page[i];
    	   currentPage.resize();
  		}
  	}
  }
  
  this.resize = function(){
  canvas.size(windowWidth,windowHeight);
  	for(i=0;i,i<pageCount;i++){
  		this.boxLink[i].resize();
  	}
  }
}


