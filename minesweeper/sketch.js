let cell = [];
let cell_size = 20;
let rows, cols;
let flag = 1;
let game_state = 0;
let mine_count = 0;

function setup(){
	createCanvas(500,400);
	background(50);
	rows = height/cell_size;
	cols = width/cell_size;
	textSize(15);
	cursor(ARROW);
	
	for(let y=0;y<rows;y++){
		for(let x=0;x<cols;x++){
			let mine = false;
			let val = 0;
			if(x==0 || y==0 || y==rows-1 || x==cols-1){
				// allow hidden edges to be empty
				val = -1;
			}else{
				if(random()<0.15){mine = true; mine_count++;}
			}
			cell.push(new Cell(x,y,cell_size,mine,val));
		}
	}
	
	for(let i=0;i<cell.length;i++){
		if(i%cols!=0 && i%cols!=cols-1 && i>cols && i<cell.length-cols){
			cell[i].assign(i);
		}
	}
}

function draw(){
	for(let i=0;i<cell.length;i++){
		if(i%cols!=0 && i%cols!=cols-1 && i>cols && i<cell.length-cols){
			cell[i].show();
			if( cell[i].mouseCollide() == true && mouseIsPressed){
				cell[i].hover();
			}
		}
	}
	if(game_state==1){
		push();
		textSize(30);
		fill(255,0,0);
		text("GAME OVER",width*0.4,height*0.4);
		pop();
	}else if(game_state == 2){
		push();
		textSize(30);
		fill(0,255,0);
		text("YOU WIN",width*0.4,height*0.4);
		pop();
	}
}


function keyPressed(){
	if(keyCode==SHIFT){
		flag *= -1;
	}
	if(flag<1){
		cursor(HAND);
	}else{
		cursor(ARROW);
	}
}

function mouseReleased(){
	let remaining = (cols-2)*(rows-2);
	for(let i=0;i<cell.length;i++){
		if(i%cols!=0 && i%cols!=cols-1 && i>cols && i<cell.length-cols){
			if( cell[i].mouseCollide() == true){
				if(flag<0){
					cell[i].toggleFlag();
				}else{
					cell[i].reveal(i);
				}
			}
		}
		if(cell[i].mine == true && cell[i].hidden == false){
			game_state = 1;
		}
		if(cell[i].hidden==false){
			remaining--;
		}
	}
	print(remaining);
	if(remaining <= mine_count){
		game_state = 2;
		// win!
	}
}

class Cell{
	constructor(X,Y,S,MINE,VAL){
		this.size = S;
		this.x = X*S;
		this.y = Y*S;
		
		this.hidden = true;
		this.mine = MINE;
		this.flagged = false;
		this.value = VAL;

	}
	show(){
		push();
		fill(150);
		stroke(100);
		strokeWeight(1);
		rect(this.x,this.y,this.size,this.size);
		
		if(this.flagged == true){
			push();fill(255,255,0);
			triangle(this.x+10,this.y+2,this.x+15,this.y+17,this.x+5,this.y+17);pop();
		}
			
		if(this.hidden == true){return;}

		fill(100);
		stroke(100);
		strokeWeight(1);
		rect(this.x,this.y,this.size,this.size);

		if(this.mine==true){
			fill(255,0,0);
			ellipse(this.x+this.size/2,this.y+this.size/2,this.size/2);
		}else if(this.value>0){
			fill(0,255,255);
			text(this.value,this.x+this.size*0.25,this.y+this.size*0.75);
		}
		pop();
	}
	
	hover(){
		fill(200);
		stroke(230);
		rect(this.x+1,this.y+1,this.size-2,this.size-2);
	}
	
	mouseCollide(){
		if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.size && mouseY<this.y+this.size){
			return true;
		}
	}
	
	reveal(P){
		
		if(this.value<0 || this.flagged == true || this.hidden == false){return;}
		
		this.hidden = false;
		
		if(this.value!=0 || this.mine==true){return;}
		
		print("check squares");
		//recursive revealing empty squares
		let y = floor(P/cols)-1;
		let x = P%cols-1;
		for(let i=0;i<3;i++){
			for(let e=0;e<3;e++){
				let n = y*cols+x;
				if(cell[n].hidden == true){
					cell[n].reveal(n);
				}
				x++;
			}
			x-=3;
			y++
		}
	}
	
	toggleFlag(){
		print("toggle");
		if(this.flagged == false){
			this.flagged = true;
		}else{
			this.flagged = false;
		}
		this.show();
	}
	
	assign(P){
		if(this.mine == true){return;}
		let row = floor(P/cols)-1;
		let col = P%cols-1;
		for(let i=0;i<3;i++){
			for(let e=0;e<3;e++){
				if(cell[row*cols+col].mine == true){
					this.value++;
				}
				col++
			}
			col-=3;
			row++
		}
	}
}


















