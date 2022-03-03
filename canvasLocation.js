var origin2d = { x:200, y:250};
var max3d = {x:200,y:200,z:200};
var c=document.getElementById("tagCanvas");
var ctx=c.getContext("2d");
var matrix = { 
				x:{x:-0.5, y:1, z:0},
				y:{x:0.5, y:0, z:-1}
			};
				
				
function clear(){
	ctx.clearRect(0,0,c.width,c.height); 
}
function turnleft(){
	matrix.x.x -=0.1;
	ctx.clearRect(0,0,c.width,c.height); 
	start();
}

function turnright(){
	matrix.x.x +=0.1;
	ctx.clearRect(0,0,c.width,c.height); 
	start();
}

function turn3to2(obj3){
	var obj2 = {x:0,y:0};

	obj2.x = origin2d.x + obj3.x*matrix.x.x + obj3.y*matrix.x.y + obj3.z*matrix.x.z ;
	obj2.y = origin2d.y + obj3.x*matrix.y.x + obj3.y*matrix.y.y + obj3.z*matrix.y.z ;	
	return obj2;
}

function drawAxis(){
	drawLine3d(0,0,0,max3d.x,0,0);
	drawLine3d(0,0,0,0,max3d.y,0);
	drawLine3d(0,0,0,0,0,max3d.z);
}

function drawLine3d(x,y,z,tox,toy,toz)
{
	var obj3 = {x:x,y:y,z:z};
	var obj2 = turn3to2(obj3);
	var obj3_ = {x:tox,y:toy,z:toz};
	var obj2_ = turn3to2(obj3_);
	ctx.beginPath(); 
	ctx.moveTo(obj2.x, obj2.y);	
    ctx.lineTo(obj2_.x, obj2_.y);
    ctx.closePath();
    ctx.stroke();
}

function drawPoint3d(x,y,z)
{
	var obj3 = {x:x,y:y,z:z};
	var obj2 = turn3to2(obj3);
	
	ctx.fillStyle="#FF0000";
	ctx.beginPath();
	ctx.arc(obj2.x, obj2.y,4,0,2*Math.PI);
	ctx.fill();

	ctx.setLineDash([1,4]);  // [实线长度, 间隙长度]
	drawLine3d(x,y,0,x,y,z);
	drawLine3d(0,0,0,x,y,0);
	ctx.setLineDash([]);
}
