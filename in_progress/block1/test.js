


function setup(){


}

function mousePressed(){
	let arr = [];

	for(let i=0;i<5;i++){
			arr.push(floor(random(100))); 
	}
	let sorted = false;
	print(arr);
	
	while(sorted==false){
		let switches = false;
		for(let i=0;i<arr.length;i++){
		
			if(arr[i]>arr[i+1]){
				let b = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = b;
				switches==true;
			}
			if(switches==false){
				sorted=true;
			}
			print(arr);
		}
	}

	print(arr);

}

function draw(){
}