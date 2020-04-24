
//initialize variables
var points = [];
var swapped = true;
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var numDataPoints = document.getElementById('slider').value;
var datawidth = (canvas.width - points.length)/ numDataPoints;
var ssdone;
var isdone;

//fill data on load
points = getDataPoints(numDataPoints);
draw(points);

//for generator next functions
var sort;

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
				swapped=  true;
				draw(arr, i, i+1);
				yield;
				swap(arr, i, i+1);
				draw(arr, i, i+1);
				yield; // pause here
			}
		} 
		x++;
	}while (swapped == true);
	draw(points);
	enableButtons();
}

//helper function for bubblesort
function swap(arr=[], a, b){
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	return;
}


function* selectionSort(arr=[]){
	for (let i = 0; i<arr.length; i++){
		let minIndx=i;
		for (let j = i+1; j < arr.length; j++){
			if (arr[minIndx] > arr[j]){
				draw(arr, i, j);
				yield;
				swap(arr, j, i);
				draw(arr, i, j);
				yield;
			}
		}
	}
	ssdone = true;
	draw(points);
	enableButtons();
}


function* insertionSort(arr=[]){
	for (let i = 1; i < arr.length; i++){
		key=arr[i];
		j = i-1;
		while (j >=0 && key < arr[j]){
			draw(points, i, j);
			yield;
			arr[j+1] = arr[j];
			j--;
			draw(points, i, j);
			yield;
		}
		arr[j+1]=key;
	}
	isdone = true;
	draw(points);
	enableButtons();
}


function newData(){
	points = getDataPoints(numDataPoints);
	draw(points);
}


function draw(array=[], j, k){
	c.clearRect(0,0,canvas.width, canvas.height);
	var m = 0;
	datawidth = (canvas.width - points.length)/ numDataPoints;
	for (let i = 0; i < array.length; i++){
		if (i==j || i==k){
			c.fillStyle = 'red'
		}
		else{
			c.fillStyle = 'grey';
		}
		c.fillRect(m, canvas.height - array[i], datawidth, array[i]);
		m=m+datawidth+1;
	}
}


function disableButtons(){
	let buttons = document.querySelectorAll("button");
	for (let i = 0; i < buttons.length; i++){
		buttons[i].disabled = true;
	}
	let slider = document.querySelector("input");
	slider.disabled = true;
}

function enableButtons(){
	let buttons = document.querySelectorAll("button");
	for (let i = 0; i < buttons.length; i++){
		buttons[i].disabled = false;
	}
	let slider = document.querySelector("input");
	slider.disabled = false;
}

function bsAnimate(){
	if (swapped == true){
		requestAnimationFrame(bsAnimate);
	}
	sort.next();
}

function bsStart(){
	disableButtons();
	swapped = true;
	sort = bubblesort(points);
	bsAnimate();
}

function ssAnimate(){
	if (ssdone == false){
		requestAnimationFrame(ssAnimate);
	}
	sort.next();
}

function ssStart(){
	disableButtons();
	ssdone=false;
	sort=selectionSort(points);
	ssAnimate();
}


function isAnimate(){
	if (isdone == false){
		requestAnimationFrame(isAnimate);
	}
	sort.next();
}

function isStart(){
	disableButtons();
	isdone = false;
	sort = insertionSort(points);
	isAnimate();
}
