function Fish() {
  this.x = width/4;
  this.y = 10;
  this.dia = 30;
  this.bob = -4;
  this.ang = 0;
  this.sink = 3.5;
  this.buoyancy = -0.74;
  this.gravity = 0.40;

  this.display = function() {
    
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate((this.y - this.ang) / 26);
    //tint(30);
    image(imgFish[health],0,0);
    pop();
    this.ang = this.y;
  }

  this.sinking = function() {
    this.sink -= 0.250;
    this.y += this.sink+this.buoyancy;
    this.bob = this.sink; //map(this.y, 0, height / 2, -3, 0);
    //this.ang = this.y-this.ang;
    this.ang = this.y - this.sink * 1.5;
  }

  this.flying = function() {
    this.bob += this.gravity;
    this.y += this.bob;
    this.sink = 5;
  }

  this.bobbing = function() {
    this.bob += this.buoyancy + this.gravity;
    this.y += this.bob;
    this.sink = 5;
  }

  this.caught = function(){
    this.x = gull.x;
    this.y = gull.y;
  }
}
