var canvas;
var count =0;

var notoReg;
var notoItal;

var img =[
[],
[],
[],
[]
];
var nLoad = 1;
var nPage = 0;

var n = 0;
var page = 0;

var slide;
var backButton;
var nextButton;
var navBar;


var title = [
["Almost Done",
"Parting Shot",
"Dai-Fugi Sushi",
"Nando's Flame Grilled Chicken",
"Reflections II",
"6105 III",
"Block #1"
],
[
"Focus Holes",
"Excess",
"Neves",
"DGYHU",
"Jacks",
"Computer Drawing of a New Painting",
"Sacs a Ordures,",
"XX_Flowers_XX",
"Gumdrops",
"Oh Baby"],
[""],
[""]
];

var caption = [
[
"Acrylic on board",
"Acrylic on board",
"Oil on canvas",
"Oil on canvas",
"Acrylic on canvas",
"Acrylic on canvas",
"Oil on canvas"],
[
"Plaster, tissue paper, oil paint",
"Plaster, paper towel, ink",
"Plaster, tissue paper, ink",
"Plaster, toilet paper, ink",
"Plaster, tissue paper, ink, oil paint",
"Plaster, paper towel, ink",
"Plaster, tissue paper, ink",
"Plaster, tissue paper, oil paint",
"Plaster, paper towel, ink",
"Plaster, tissue paper, ink, oil paint"
],
[""],
["Matthis Grunsky is from Halifax, NS"]
];

var dimension = [
[
"24''x24''",
"24''x24''",
"30''x28''",
"72''x60''",
"84''x60''",
"60''x60''",
"60''x60''"],
[
"14''x18''",
"9''x11''",
"12''x14''",
"12''x12''",
"16''x16''",
"9''x11''",
"20''x14''",
"14''x18''",
"9''x11''",
"16''x16''"],
[""],
["and currently lives in Vancouver, BC."]
];

var yyyy = [
[
"2019",
"2018",
"2015",
"2015",
"2012",
"2012",
"2010"],

[
"2018",
"2018",
"2018",
"2018",
"2018",
"2018",
"2018",
"2018",
"2018",
"2018",
"2018"],
[""],
["grunskm@gmail.com"]
];


//////////Image Loading//////////////////////////////

function preload(){
 img[0][0] = loadImage("assets/image0_0.jpg");
 notoReg = loadFont("NotoSans-Regular.ttf");
 notoItal = loadFont("NotoSans-Italic.ttf");
}

function loadImg(){
	if(nLoad<title[nPage].length){
		 img[nPage][nLoad] = loadImage("assets/image"+(nPage)+"_"+(nLoad)+".jpg",imgLoaded); 
	}
}
function imgLoaded(){
	
	if(nLoad<title[nPage].length){
	print("image"+nPage+"_"+nLoad+"loaded");
	nLoad++;
	loadImg();
	}
	
	if(nLoad>=title[nPage].length){
		nPage++;
		nLoad = 0;
		print(nPage);
		if(nPage<img.length){
			loadImg();
		}else{print("finished!");}
	}
}

///Main Loop//////////////////////////////////

function setup() {
  frameRate(30);
  canvas = createCanvas(windowWidth, windowHeight);
  slide = new Slide();
  navBar = new NavBar();
  textSize(20);
  imageMode(CENTER);
  loadImg();
  resize();
}

function draw(){
  count++;
  if(count<100){
  slide.transition();
  slide.display();
  navBar.display();
  backButton.display();
  nextButton.display();
  }
}

function mouseMoved(){
  if(frameCount>10){
  	 slide.display();
 	 navBar.display();
 	 backButton.display();
 	 nextButton.display();
  }
}

function mousePressed(){
	
	nextButton.click();
	backButton.click();
	
	backButton.display();
    nextButton.display();
    
    navBar.click();
	navBar.display();
}

function keyPressed(){
print("page="+page);
print("n="+n);

}

window.onresize = function(){
resize();
}


