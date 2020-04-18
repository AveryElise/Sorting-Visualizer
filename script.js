
//initialize variables
var points = [];
var swapped = true;
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var numDataPoints = document.getElementById('slider').value;
var datawidth = (canvas.width - points.length)/ numDataPoints;

//fill data on load
points = getDataPoints(numDataPoints);
draw(points);

//for generator function
var bs;

//draw new canvas every time slider is updated
document.getElementById('slider').oninput = function() {
	numDataPoints = document.getElementById('slider').value;
	points = getDataPoints(numDataPoints);
	draw(points);
}


//fill points array
function getDataPoints(n){
	let rl=[]
	for (let j=0;j<n;j++){
		rl.push(Math.floor(Math.random()*300)+1)
	}
	return rl;
}



function* bubblesort(arr=[]){
	do{
		swapped = false;
		let x = 0;
		for (let i = 0; i < arr.length - x; i++){
			if (arr[i]>arr[i+1]){
				swap(arr, i, i+1);
				swapped = true;
				draw(arr, i+1);
				yield swapped; // pause here
			}
		} 
		x++;
	}while (swapped == true);
	draw(points);
}



function newData(){
	points = getDataPoints(numDataPoints);
	draw(points);
}

//helper function for bubblesort
function swap(arr=[], a, b){
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	return;
}


function draw(array=[], j){
	c.clearRect(0,0,canvas.width, canvas.height);
	var m = 0;
	datawidth = (canvas.width - points.length)/ numDataPoints;
	for (let i = 0; i < array.length; i++){
		if (i==j){
			c.fillStyle = 'red'
		}
		else{
			c.fillStyle = 'grey';
		}
		c.fillRect(m, canvas.height - array[i], datawidth, array[i]);
		m=m+datawidth+1;
	}
	return canvas;
}


function bsAnimate(){
	console.log('here');
	if (swapped == true){
		requestAnimationFrame(bsAnimate);
	}
	bs.next();
}


function bsStart(){
	swapped = true;
	bs = bubblesort(points);
	bsAnimate();
}
