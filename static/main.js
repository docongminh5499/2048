
// Get canvas elements
var mCanvas = document.getElementById("canvas");
var context = mCanvas.getContext('2d');


// Calculator square width in mode 4x4 and mode 8x8
const p1 = mCanvas.width / 4;
const p2 = mCanvas.width / 8;
// Font size in different mode
const font4 = "38px Arial Black";
const font8 = "18px Arial Black";
        


var nums = 4; //Mode
var sqr = p1;
var valueArr = 
	["0", "2", "4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048", "4096", "8192", "16384"];
var colorArr =  ["#BFB0A1", "#EEE4DA", "#EEE4DA", "#F2B179", "#EC8D53", "#F47C5F", "#E95839", "#F4D86D", "#F1D04B", "#E4C02A", "#E3BA14", "#ECC400", "#71B5DC", "#5DA2E5", "#007EC2"];
var gameBoard = [];
	



function setGameBoardValue(rowNumber, collNumber, value)
{ gameBoard[rowNumber + collNumber * nums] = value; }
function getGameBoardValue(rowNumber, collNumber)
{ return gameBoard[rowNumber + collNumber * nums]; }
  



function initGameBoard(_nums)
{
     var numOfSquares = _nums *_nums; 
     for ( var i = 0; i < numOfSquares ; i++) gameBoard[i] = 0;
}
        
function drawFrames(_nums)
{
    for(var i = 1; i < _nums; i++)
    {
            
      // straight line
      context.beginPath();
      context.strokeStyle = "#BBADA0";
      context.lineWidth = 10;
      context.moveTo((sqr+1)*i, 0);
      context.lineTo((sqr+1)*i, mCanvas.height);
      context.stroke();        
         
                
      // narrow line
      context.beginPath();
      context.strokeStyle = "#BBADA0";
      context.lineWidth = 10;
      context.moveTo(0, (sqr+1)*i);
      context.lineTo(mCanvas.width, (sqr+1)*i);
      context.stroke();
     }
}
        
function split (_nums)
{
    context.clearRect(0, 0, mCanvas.width, mCanvas.height);
    if (_nums == 4) sqr = p1;
    else sqr = p2;
    nums = _nums;
}
      

function randomSqure(num)
{
	var num_of_random = 0;
	while (num_of_random !== num)
	{
		var x = Math.floor(Math.random()*nums);	
		var y = Math.floor(Math.random()*nums);
		while (getGameBoardValue(x, y) != 0)
			{
				x = (x + 5) % gameBoard.length;
				y = (y + 7) % gameBoard.length;
			}
		setGameBoardValue(x, y, 1);
		num_of_random++;
	}
}

function drawSquareRect(x, y, value)
{
     var text = valueArr[value];
     context.fillStyle = colorArr[value];
     context.fillRect(x * (sqr+1), y*(sqr+1), sqr, sqr);
     if (text == "2" || text == "4")
		 context.fillStyle = "#776E65";
 	 else
		 context.fillStyle = "white";
     context.textAlign ="center";
     context.textStyle = "bold";
     if (nums == 4) 
	 {
		 context.font = font4;
		 context.fillText(text, x * (sqr) + sqr / 2  , y*(sqr)+ sqr / 2); 
	 }
     else 
	 {
		 context.font = font8;
     	 context.fillText(text, x * (sqr) + sqr/ 2 , y*(sqr)+ sqr / 2); 
	 }
}

function drawGame(_nums)
{
    split(_nums);
            
    initGameBoard(_nums);
	
	//Random 
	randomSqure(2);

     for (var i = 0; i < nums; i++)
		 {
           for (var j = 0; j < nums; j++)
			   {
                 if (getGameBoardValue(j,i) !== 0) 
					 {
                        drawSquareRect(j, i, getGameBoardValue(j,i));
					 }
			   }
		 }
	  drawFrames(_nums);
            
}
function EventProcessing()
{
        
           // if (UpEvent(event))
}

function d_event()
{
	
}


function EndGame() 
{ 
	// Endgame
};






function start()
{
	// CSS For idTabs
	drawGame(nums);
}



window.onload = start;



$("#mode4").click(function(){
	if (nums !== 4)
		{
			nums = 4;
			start();
		}
});


$("#mode8").click(function(){
	if (nums !== 8)
		{
			nums = 8;
			start();
		}
});



$("#replay").click(function(){
	start();
});



$("#leaderboard").tabs();
$("#link1").css("background-color", "black");


$("#link1").click(function(){
	$(this).css("background-color", "black");
	$("#link2").css("background-color", "#BAAEA0");
});


$("#link2").click(function(){
	$(this).css("background-color", "black");
	$("#link1").css("background-color", "#BAAEA0");
});