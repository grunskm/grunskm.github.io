function flyObj() {
  this.stage = 0;
  this.up = 0;
  this.size = 1;
  this.x = width + 200;
  this.y = random(-50, -250);
  this.dia = 25;
  this.speed = random(1.5, 3);
  this.hit = false;

  this.collide = function() {

    this.hit = collideCircleCircle(this.x - 5, this.y + this.up, this.dia, salmon.x + 30, salmon.y, salmon.dia);
    if (this.hit) {
      score += 1;
      this.stage = 1;
      this.up = -300;
    }
  }
  this.flying = function() {
    if (this.stage === 0) {
      this.x -= this.speed;
      this.y += random(-0.5, 0.5);
      if (this.x < -300 || this.y > 0 || this.y < -200) {
        this.x = width + 50;
        this.y = random(-50, -150);
        this.speed = random(2, 4);
      }
      push();
      translate(this.x, this.y);
      noStroke();
      fill(0, 0, 0);
      ellipse(random(-1, 1),random(-3, 3), 3);
      //fill(255, 90);
      //ellipse(-5, 0, this.dia);
      pop();
    } else if (this.stage == 1) {
      this.size+= 5;
      push();
      translate(this.x, this.y);
      noStroke();
      fill(50, 50, 50, 100-this.size);
      ellipse(0, 0, this.size)
      //text("+1", this.x, this.y);
      pop();
      if (this.size > 100) {
        this.size = 0;
        this.stage = 0;
        this.up = 0;
        this.x = width + random(100, 300);
        this.y = random(0, -200);
      }
    }
  }
}

function roeObj(){
  this.stage = 0;
  this.x = 0;
  this.y = 0;
  this.xseperate = random(-70,70);
  this.yseperate = random(-20,20);
  this.up=0;
  this.dia = 20;
  this.expand = 20;

  this.lay = function(x,y){
    this.x = x+this.xseperate;
    this.y = y+this.yseperate;
    ellipse(this.x,this.y,this.dia);
  }

  this.fertilize = function(){
    push();
    this.expand++;
    fill(255,50-this.expand/2);
    ellipse(this.x,this.y,this.expand*2);
    pop();
  }

 this.collide = function() {
    push();
    fill(255,0,0,40);
    //ellipse(this.x,this.y+this.up,this.dia);
    //ellipse(salmon.x,salmon.y-width/3-140,60);
    pop();
    this.hit = collideCircleCircle(this.x, this.y+this.up, this.dia, salmon.x, salmon.y-width/3-140, 60);
    if (this.hit) {
      this.stage = 1;
      score++;
      this.up = -1000;
    }
  }
}

function bottomObj(x,y,z){
  this.stage = 0;
  this.x = x*width/8;
  this.y = y;
  this.z = z+random(-5,5);
  this.size = random(width/5,width/4);
  this.zzz=0;
  this.speed = 5;

  this.there = function(){
    push();
    translate(0,waterDepth);
    strokeWeight(this.size);
    this.x=this.x-this.speed;
    if(this.x<-100){
      this.x = width+sizeBottom;
      this.z += random(-10,0);
      this.size = random(width/5,width/4);
    }
    line(this.x,this.y,this.x,this.z);
    pop();
  }
  this.collide = function(){
    this.hit = collideCircleCircle(this.x, this.z+waterDepth+10, this.size, salmon.x + 30, salmon.y, salmon.dia);
    if (this.hit) {
      salmon.sink = 0;
      salmon.bob = -2;
      print(floor(this.z));
        if(this.z <-300 && salmon.y<-10){
          print(floor(this.z));
          for(k=0;k<numBottom+2;k++){
            bottom[k].stage = 1;
          }
        }
    }
  }
  this.halt = function(){
    push();
    translate(0,waterDepth);
    stroke(255,0,0);
    strokeWeight(this.size);
    line(this.x,this.y,this.x,this.z);
    pop();
  }
}

function bubbleObj(){
  this.x;
  this.y = 0;
  this.size = random(4,10);

  this.rise = function(){
    this.x -= random(1,3);
    this.y -= this.size/1.5;
      if(this.y<0){
      this.size = random(4,9);
      this.y = salmon.y;
      this.x = salmon.x;
    }
    push();
    fill(255,200);
    if(salmon.y<0){
      this.y = 0;
      this.x = salmon.x;
      if(this.y === 0){
        noFill();
      }
    }
    noStroke();
    ellipse(this.x+45,this.y,this.size);
    pop();
  }
}

function shoreObj(x,y,z){
  this.stage = 0;
  this.x = x*sizeBottom;
  this.y = y;
  this.z = z+random(-5,5);
  this.size = random(200,250);
  this.zzz=0;

  this.there = function(){
    push();
    translate(0,waterDepth);
    stroke(0);
    strokeWeight(this.size);
    this.x=this.x-3;
    if(this.x<-100){
      this.x = width+sizeBottom;
      this.z += random(-5,5);
      this.size = random(200,250);
    }
    stroke(150);
    line(this.x,this.y,this.x,this.z);
    pop();
  }

  this.halt = function(){
    push();
    translate(0,waterDepth);
    stroke(190);
    strokeWeight(this.size);q
    line(this.x,this.y,this.x,this.z);
    pop();
  }
}

function Water() {
 this.display = function() {
      push();
      noStroke();
      fill(20, 20, 20, 150);
      rect(0,0,width,height*0.75);
      pop();
    }
}

function SCORE() {
  push();
  fill(250, 100, 100);
  text("HIGHSCORE ="+highscore,width-300,2*height/3-50);
  text("SCORE = " + score, 20, 2 * height / 3 - 20);
  text("HEALTH = " + health, 20, 2 * height / 3 - 50);
  pop();
}

function Start() {
  // start screen variables
  this.startText = 50;
  this.startTextc = 1;
  this.xSpacing = (width-100)*0.099;
  this.ySpacing = height*0.09;
  this.textSpacing = 150;
  this.xText = -500;
  this.yText  = 200;

  this.display = function(){
    //reset all relevent game variables
      salmon.x = width/3;
      salmon.y = 10;
      salmon.gravity = 0.4;
      salmon.bob = -4;
      salmon.sink = 3.5;
      salmon.bouyancy = -0.74;
      score = 0;
      gull.stage = 0;
      gull.x = width + 100;
      health = 10;
      zzz=0;
      for(e=0;e<numBottom+2;e++){
      bottom[e].z = -10;
      bottom[e].zzz = 0;
      bottom[e].stage = 0;
    ///////////////////////////////////////////

    background(255,100,100);
    this.xText-= 0.25;
    if(this.xText<-500){
      this.xText = width;
      this.yText  = random(-height*0.3,height*0.6);
    }
    for(i=0;i<11;i++){
    image(imgFish[10-i],i*this.xSpacing,i*this.ySpacing-(height/3));
    }
    push();
      textSize(40);
      fill(this.startText,255-this.startText,200);
      this.startText+=this.startTextc;
      if(this.startText>=200||this.startText<=1){
          this.startTextc *= -1 ;
        }

    text("PRESS SPACE TO BEGIN", this.xText, this.yText);

  pop();
    }
  }
  // if(startText > 120){
  //     text("PRESS", 0*xSpacing+20, 100);
  //     text("SPACE", 1*xSpacing+20, 140);
  //     text("  TO ", 2*xSpacing+20, 180);
  //     text("BEGIN", 3*xSpacing+20, 220);
  //   }else if(startText>80){
  //
  //   }else if(startText>60){
  //     text("BEGIN", 3*xSpacing+20, 220);
  //   }else if(startText>40){
  //     text("  TO ", 2*xSpacing+20, 180);
  //   }else if(startText>20){
  //     text("SPACE", 1*xSpacing+20, 140);
  //   }else if(startText>0){
  //     text("PRESS", 0*xSpacing+20, 100);
  //   }
}
