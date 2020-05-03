
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

//for generator functions
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


function* bubbleSort(arr=[]){
	do{
		swapped = false;
		let x = 0;
		for (let i = 0; i < arr.length - x; i++){
			if (arr[i]>arr[i+1]){
				swapped=  true;
				swap(arr, i, i+1);
				draw(arr, i, i+1);
				yield;
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


function* mergeSort(arr=[]){
	var n = arr.length;
	var buffer = [];
	for (var size=1; size < n; size = size*2){
		for (var leftStart = 0; leftStart < n; leftStart = leftStart+(2*size)){
			var left = leftStart;
			var right = Math.min(left+size, n);
			var leftLimit = right;
			var rightLimit = Math.min(right + size, n);
			var x=left;

			while (left < leftLimit && right < rightLimit){
				if (arr[left]<arr[right]){
					buffer[x] = arr[left];
					left++;
					x++;
				} else {
					buffer[x] = arr[right];
					right++;
					x++;
				}
			}
			while (left < leftLimit){
				buffer[x] = arr[left];
				left++;
				x++;
			}
			while (right < rightLimit){
				buffer[x] = arr[right];
				right++;
				x++;
			}
			//visualization section - copy the buffer to array
			for (var j = leftStart; j < rightLimit; j++){
				arr[j] = buffer[j];
				draw(arr, j);
				yield;
			}
		}
	}
	enableButtons();
	draw(arr);
	yield;
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

function animate(){
	if (sort.next().done == false){
		requestAnimationFrame(animate);
	}
	sort.next();
}

function startSort(func){
	disableButtons();
	sort = func(points);
	animate();
}
