
var planets = [];

var km = 0;

planets.push(new planet("Mercury",58,"red","black"));
planets.push(new planet(" Venus ",108,"orange","black"));
planets.push(new planet(" Earth ",150,"lightgreen","black"));
planets.push(new planet(" Mars ",228,"red","black"));
planets.push(new planet("Jupiter",779,"pink","black"));
planets.push(new planet("Saturn ",1434,"yellow","black"));
planets.push(new planet("Uranus ",2871,"aqua","black"));
planets.push(new planet("Neptune",4495,"white","black"));

window.setTimeout(()=>{
	window.setInterval(newLine,100);
},3000);


function newLine(){
	if(km<5000){
		km++;
		let bullet = document.createElement("SPAN");
				bullet.innerText = (km)+" million kilometers - ";
		let left = document.createElement("SPAN");
				left.innerText = leftText(km);
		let middle = document.createElement("SPAN");
				middleText(middle,km);
		let right = document.createElement("SPAN");
				right.innerText = rightText(km);
		let br = document.createElement("BR");


		document.getElementById("list").appendChild(bullet);
		document.getElementById("list").appendChild(left);
		document.getElementById("list").appendChild(middle);
		document.getElementById("list").appendChild(right);
		document.getElementById("list").appendChild(br);
		bullet.scrollIntoView();
	}
}
function leftText(n){
	let output ="";
	let sp = (Math.floor((Math.sin(n*0.3)+1)*30)+1);
	for(e=0;e<sp;e++){
		output+="*";
	}
	output+=". . . .";
	return output;
}

function middleText(obj,n){
	let output = " . . . . ";
	let col = "lightblue";
	let background = "clear"
	for(let w=0;w<planets.length;w++){
		if(n==planets[w].dist){
			output = planets[w].name;
			col = planets[w].c;
			background = planets[w].back;
		}
	}
	obj.innerText = output;
	obj.setAttribute("style","color:"+col);
//	obj.setAttribute("style","background-color:"+background);
}

function rightText(n){
	let output = ". . . .";
	let sp = 60-(Math.floor((Math.sin(n*0.3)+1)*30)+1);
	for(e=0;e<sp;e++){
		output+="*";
	}
	return output;
}

function planet(name,dist,c,back){
	this.name = name;
	this.dist = dist;
	this.c = c;
	this.back = back;
}
