window.onload = start;

function drawTable()
{
	var context = document.getElementById('canvas').getContext('2d');
	
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(365, 0);
	context.lineTo(365, 365);
	context.lineTo(0, 365);
	context.lineTo(0, 0);
	context.strokeStyle = "#CCC0B4";
	context.lineWidth = 25;
	context.lineCap = "round";
	context.stroke();
	
	context.beginPath();
	context.moveTo(0, 91);
	context.lineTo(365, 91);
	context.strokeStyle = "#CCC0B4";
	context.lineWidth = 15;
	context.lineCap = "round";
	context.stroke();
	
	context.beginPath();
	context.moveTo(0, 182);
	context.lineTo(365, 182);
	context.strokeStyle = "#CCC0B4";
	context.lineWidth = 15;
	context.lineCap = "round";
	context.stroke();
	
	context.beginPath();
	context.moveTo(0, 273);
	context.lineTo(365, 273);
	context.strokeStyle = "#CCC0B4";
	context.lineWidth = 15;
	context.lineCap = "round";
	context.stroke();
	
	context.beginPath();
	context.moveTo(91, 0);
	context.lineTo(91, 365);
	context.strokeStyle = "#CCC0B4";
	context.lineWidth = 15;
	context.lineCap = "round";
	context.stroke();
	
	context.beginPath();
	context.moveTo(182, 0);
	context.lineTo(182, 365);
	context.strokeStyle = "#CCC0B4";
	context.lineWidth = 15;
	context.lineCap = "round";
	context.stroke();
	
	context.beginPath();
	context.moveTo(273, 0);
	context.lineTo(273, 365);
	context.strokeStyle = "#CCC0B4";
	context.lineWidth = 15;
	context.lineCap = "round";
	context.stroke();
}

function start()
{
	drawTable();
}