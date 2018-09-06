function initializePanels(){
  panel[0] = new Panel(210*ratio,270*ratio,130*ratio,130*ratio,10,0);
  panel[1] = new Panel(598*ratio,327*ratio,160*ratio,130*ratio,12,1);
  panel[2] = new Panel(817*ratio,254*ratio,140*ratio,125*ratio,10,2);
  panel[3] = new Panel(754*ratio,350*ratio,125*ratio,105*ratio,10,3);
  panel[4] = new Panel(403*ratio,355*ratio,130*ratio,105*ratio,10,4);
  panel[5] = new Panel(148*ratio,353*ratio,150*ratio,108*ratio,12,5);
  panel[6] = new Panel(300*ratio,394*ratio,105*ratio,60*ratio,8,6);
  panel[7] = new Panel(460*ratio,295*ratio,90*ratio,115*ratio,7,7);
  panel[8] = new Panel(340*ratio,270*ratio,130*ratio,130*ratio,10,8);
  panel[9] = new Panel(957*ratio,254*ratio,140*ratio,125*ratio,10,9);
}


function Panel(x, y, w, h, d,imgn) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.n = imgn+(imgSet*10);

  this.div = d;
  this.pix = [];

  for (i = 0; i < this.div; i++) {
    this.pix[i] = new Pix(i,this.w,this.h,this.div,this.x,this.y,this.n);
  }
  this.pixels = function(){

    for (i = 0; i < this.div; i++) {
    this.pix[i].n = this.n;
  }
    img[timeDay][this.n].loadPixels();
  }

  this.display = function() {

    for (i = 0; i < this.div; i++) {
      this.pix[i].display();
    }
    fill(50,50,100,50);
    rect(this.x,this.y,this.w,this.h);
    push();
    fill(255,0,0);
    stroke(255,0,0);
    textSize(20);
    text(this.n+(timeDay*20),this.x,100);
    line(this.x,100,this.x,this.y);
    pop();
  }

  function Pix(xx,w,h,d,x,y,nn) {
    this.n = nn;
    this.x = floor(random(10,img[timeDay][this.n].width)-10);
    this.y = floor(random(10,img[timeDay][this.n].height)-10);
    this.xp = xx * (w / d)+x;
    this.w = w / d;
    this.h = h;
    this.yp = y;
    this.xc = floor(random(1,2));
    this.yc = floor(random(1,2));
    this.f;

    this.display = function() {
      this.x += this.xc;
      this.y += this.yc;

      if (this.x <= 10 || this.x >= img[timeDay][this.n].width-10) {
        this.xc *= -1;
      }
      if (this.y <= 10 || this.y >= img[timeDay][this.n].height-10) {
        this.yc *= -1;
      }
      this.f = img[timeDay][this.n].get(this.x, this.y);

      fill(this.f);
      rect(this.xp, this.yp, this.w, this.h);
    }
  }
}
