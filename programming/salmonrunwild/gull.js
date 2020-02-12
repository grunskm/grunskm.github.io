function gullObj() {
  this.frame = 0;
  this.acc = 0.08;
  this.flyaway = 0;
  this.up = 0;
  this.up2 = 0;
  this.up3 = 0;
  this.dive = 3;
  this.stage = 0;
  this.x = width+200;
  this.y = 0;
  this.dia = 25;
  this.speed = 1.3;
  this.flap = 0.2;
  this.sense = false;
  this.hit = false;
  this.bite = false;

  this.collide = function() {
    this.sense = collideCircleCircle(this.x-150, this.y+200+this.up, this.dia*10, salmon.x + 30, salmon.y, salmon.dia);
    this.bite = collideCircleCircle(this.x, this.y+20+this.up3, this.dia*5, salmon.x + 30, salmon.y, salmon.dia);
    this.hit = collideCircleCircle(this.x, this.y+this.up2, this.dia, salmon.x + 30, salmon.y, salmon.dia);

    if(this.sense){
      this.stage = 1;
      this.up = -800;
    }else if (this.bite){
      health--;
      //text("BITE",width/2,0);
      this.up3 = -800;
    }else if (this.hit) {
      this.up2 = -800;
      this.stage = 2;
      if(score>highscore){
      highscore = score;
      }
    }
  }
  this.floating = function() {
    if(frameCount%6===0){
      this.frame++;
      if(this.frame>=2){
        this.frame = 0;
      }
    }
    
    this.x -= this.speed;
    this.y += this.flap;
    if (this.y > 3 || this.y < -2) {
      this.flap = this.flap * -1;
    }
    if (this.x < -400) {
      this.x = random(width+200,width+600);
      this.up = 0;
      this.up2 = 0;
      this.up3 = 0;
      this.dive = 5;
      this.y = 0;
      this.stage = 0;
    }

    push();
    translate(this.x, this.y);
   // ellipse(0,0,this.dia);
    fill(10,10,10,40);
    image(imgGull[this.frame],-25,-35);
   // ellipse(-150,200,this.dia*10);
   // ellipse(0,20,this.dia*5);
    pop();
  }
  this.attack = function(){
    if(frameCount%6===0){
      this.frame++;
      if(this.frame>=2){
        this.frame = 0;
      }
    }
     this.y += this.dive;
     this.x -= 4;
    push();
      translate(this.x, this.y);
     // ellipse(0,20+this.up3,this.dia*3,this.dia*3);
     if(this.dive==-3){
       rotate(20);
     }
     // ellipse(0,0,this.dia);
      fill(255,255,255,40);
      image(imgDiving[this.frame],-35,-45);
     // ellipse(0,0,this.dia*20);
    
    if(this.y>200){
      this.dive = -3;
    }else if (this.y < 0) {
      this.stage = 0;
    }else if(this.x<-100){
      this.y = 0;
      this.stage = 0;
    }
    pop();
  }
  this.carry = function(){
        if(frameCount%6===0){
      this.frame++;
      if(this.frame>=2){
        this.frame = 0;
      }
    }
    
    this.flyaway+= this.acc;
    this.x -= 2;
    this.y -= this.flyaway;
    push();
    translate(this.x, this.y);
    ellipse(0,0,this.dia);
    image(imgFlying[this.frame],-90,-120);
    fill(10,10,10,40);
    //ellipse(0,0,this.dia*20);
    pop();
    //text("YOU DIED",width/2-length,0);
    push();
    rectMode(CORNERS);
    fill(255,map(this.y,0,-800,0,100));
    rect(0,-height/3,width,height/3*2);
    pop();
    if(this.y<-800){
      stage = 0;
      gull.stage = 0;
      this.flyaway = 0;

    }
  }
}
