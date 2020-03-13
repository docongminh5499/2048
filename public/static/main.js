// Get canvas elements
var mCanvas = document.getElementById('canvas');
var context = mCanvas.getContext('2d');

// Calculator square width in mode 4x4 and mode 8x8
const lineWidth = 10;
const p1 = (mCanvas.width - 3 * lineWidth) / 4;
const p2 = (mCanvas.width - 7 * lineWidth) / 8;
// Font size in different mode

var nums = 4; //Mode
var sqr = p1;
var valueArr = ['0', '2', '4', '8', '16', '32', '64', '128', '256', '512', '1024', '2048', '4096', '8192', '16384'];
var colorArr = [
  '#BFB0A1',
  '#EEE4DA',
  '#EEE4DA',
  '#F2B179',
  '#EC8D53',
  '#F47C5F',
  '#E95839',
  '#F4D86D',
  '#F1D04B',
  '#E4C02A',
  '#E3BA14',
  '#ECC400',
  '#71B5DC',
  '#5DA2E5',
  '#007EC2'
];
var gameBoard = [];

function setGameBoardValue(rowNumber, collNumber, value) {
  gameBoard[collNumber + rowNumber * nums] = value;
}

function getGameBoardValue(rowNumber, collNumber) {
  if (rowNumber === -1 || rowNumber === nums || collNumber === -1 || collNumber === nums) {
    return -1;
  }
  return gameBoard[collNumber + rowNumber * nums];
}

function isFull() {
  var list = gameBoard.filter(x => x === 0);
  return list.length === 0;
}

function initialScore() {
  document.getElementById('mine').innerHTML = '0';
  var bestScore = localStorage.getItem('bestScore') || 0;
  document.getElementById('best').innerHTML = bestScore;
}

function initGameBoard(_nums) {
  for (var i = 0; i < _nums * _nums; i++) gameBoard[i] = 0;
}

function drawFrames(_nums) {
  for (var i = 1; i < _nums; i++) {
    // straight line
    context.beginPath();
    context.strokeStyle = '#BBADA0';
    context.lineWidth = lineWidth;
    context.moveTo((sqr + lineWidth) * i - lineWidth / 2, 0);
    context.lineTo((sqr + lineWidth) * i - lineWidth / 2, mCanvas.height);
    context.stroke();

    // narrow line
    context.beginPath();
    context.strokeStyle = '#BBADA0';
    context.lineWidth = lineWidth;
    context.moveTo(0, (sqr + lineWidth) * i - lineWidth / 2);
    context.lineTo(mCanvas.width, (sqr + lineWidth) * i - lineWidth / 2);
    context.stroke();
  }
}

function split(_nums) {
  context.clearRect(0, 0, mCanvas.width, mCanvas.height);
  if (_nums === 4) {
    sqr = p1;
  } else {
    sqr = p2;
  }
  nums = _nums;
}

function randomSqure(num) {
  var num_of_random = 0;
  while (num_of_random !== num) {
    var x = Math.floor(Math.random() * nums * nums);
    while (gameBoard[x] !== 0 && !isFull()) {
      x = (x + 7) % gameBoard.length;
    }
    if (isFull()) {
      break;
    }
    gameBoard[x] = 1;
    num_of_random++;
  }
}

function drawSquareRect(x, y, value) {
  var text = valueArr[value];
  context.fillStyle = colorArr[value];
  context.fillRect(y * (sqr + lineWidth), x * (sqr + lineWidth), sqr, sqr);
  if (text == '2' || text == '4') context.fillStyle = '#776E65';
  else context.fillStyle = 'white';
  context.textAlign = 'center';
  context.textStyle = 'bold';
  if (nums === 4) {
    if (text < 100) {
      context.font = '70pt Catesque';
      context.fillText(text, y * (sqr + lineWidth) + sqr / 2, x * (sqr + lineWidth) + sqr / 2 + 33);
    } else if (text < 1000) {
      context.font = '50pt Catesque';
      context.fillText(text, y * (sqr + lineWidth) + sqr / 2, x * (sqr + lineWidth) + sqr / 2 + 24);
    } else if (text < 10000) {
      context.font = '35pt Catesque';
      context.fillText(text, y * (sqr + lineWidth) + sqr / 2, x * (sqr + lineWidth) + sqr / 2 + 17.5);
    } else {
      context.font = '30pt Catesque';
      context.fillText(text, y * (sqr + lineWidth) + sqr / 2, x * (sqr + lineWidth) + sqr / 2 + 15);
    }
  } else if (nums === 8) {
    if (text < 100) {
      context.font = '35pt Catesque';
      context.fillText(text, y * (sqr + lineWidth) + sqr / 2, x * (sqr + lineWidth) + sqr / 2 + 17.5);
    } else if (text < 1000) {
      context.font = '25pt Catesque';
      context.fillText(text, y * (sqr + lineWidth) + sqr / 2, x * (sqr + lineWidth) + sqr / 2 + 12.5);
    } else if (text < 10000) {
      context.font = '17pt Catesque';
      context.fillText(text, y * (sqr + lineWidth) + sqr / 2, x * (sqr + lineWidth) + sqr / 2 + 8.5);
    } else {
      context.font = '15pt Catesque';
      context.fillText(text, y * (sqr + lineWidth) + sqr / 2, x * (sqr + lineWidth) + sqr / 2 + 7.5);
    }
  }
}

function drawSquare(nums) {
  for (var i = 0; i < nums; i++) {
    for (var j = 0; j < nums; j++) {
      if (getGameBoardValue(i, j) !== 0) {
        drawSquareRect(i, j, getGameBoardValue(i, j));
      }
    }
  }
}

function drawGame(_nums) {
  split(_nums);
  initGameBoard(nums);
  randomSqure(2);
  drawSquare(_nums);
  drawFrames(_nums);
}

function EventProcessing(e) {
  var score = 0;
  var mine = document.getElementById('mine');
  if (e.keyCode === 40) {
    score = d_event();
    context.clearRect(0, 0, mCanvas.width, mCanvas.height);
    randomSqure(1);
    drawSquare(nums);
    drawFrames(nums);
    mine.innerHTML = Number(mine.innerHTML) + score;
    if (EndGame()) {
      endGameProcessing();
    }
  } else if (e.keyCode === 38) {
    score = u_event();
    context.clearRect(0, 0, mCanvas.width, mCanvas.height);
    randomSqure(1);
    drawSquare(nums);
    drawFrames(nums);
    mine.innerHTML = Number(mine.innerHTML) + score;
    if (EndGame()) {
      endGameProcessing();
    }
  } else if (e.keyCode === 37) {
    score = l_event();
    context.clearRect(0, 0, mCanvas.width, mCanvas.height);
    randomSqure(1);
    drawSquare(nums);
    drawFrames(nums);
    mine.innerHTML = Number(mine.innerHTML) + score;
    if (EndGame()) {
      endGameProcessing();
    }
  } else if (e.keyCode === 39) {
    score = r_event();
    context.clearRect(0, 0, mCanvas.width, mCanvas.height);
    randomSqure(1);
    drawSquare(nums);
    drawFrames(nums);
    mine.innerHTML = Number(mine.innerHTML) + score;
    if (EndGame()) {
      endGameProcessing();
    }
  }
}

function d_event() {
  var score = 0;
  for (var col = 0; col < nums; col++) {
    var index = nums - 1;
    var ori = nums - 2;
    while (ori >= 0) {
      if (getGameBoardValue(ori, col) !== 0) {
        var valueOri = getGameBoardValue(ori, col);
        var valueInd = getGameBoardValue(index, col);
        if (getGameBoardValue(index, col) === 0) {
          setGameBoardValue(ori, col, 0);
          setGameBoardValue(index, col, valueOri);
        } else if (getGameBoardValue(index, col) === getGameBoardValue(ori, col)) {
          setGameBoardValue(ori, col, 0);
          setGameBoardValue(index, col, valueInd + 1);
          index--;
          score = score + Math.pow(2, valueOri);
        } else {
          setGameBoardValue(ori, col, 0);
          setGameBoardValue(index - 1, col, valueOri);
          index--;
        }
      }
      ori--;
    }

    for (var i = 0; i < index; i++) {
      setGameBoardValue(i, col, 0);
    }
  }
  return score;
}

function u_event() {
  var score = 0;
  for (var col = 0; col < nums; col++) {
    var index = 0;
    var ori = 1;
    while (ori < nums) {
      if (getGameBoardValue(ori, col) !== 0) {
        var valueOri = getGameBoardValue(ori, col);
        var valueInd = getGameBoardValue(index, col);
        if (getGameBoardValue(index, col) === 0) {
          setGameBoardValue(ori, col, 0);
          setGameBoardValue(index, col, valueOri);
        } else if (getGameBoardValue(index, col) === getGameBoardValue(ori, col)) {
          setGameBoardValue(ori, col, 0);
          setGameBoardValue(index, col, valueInd + 1);
          index++;
          score = score + Math.pow(2, valueOri);
        } else {
          setGameBoardValue(ori, col, 0);
          setGameBoardValue(index + 1, col, valueOri);
          index++;
        }
      }
      ori++;
    }

    for (var i = index + 1; i < nums; i++) {
      setGameBoardValue(i, col, 0);
    }
  }
  return score;
}

function l_event() {
  var score = 0;
  for (var row = 0; row < nums; row++) {
    var index = 0;
    var ori = 1;
    while (ori < nums) {
      if (getGameBoardValue(row, ori) !== 0) {
        var valueOri = getGameBoardValue(row, ori);
        var valueInd = getGameBoardValue(row, index);
        if (getGameBoardValue(row, index) === 0) {
          setGameBoardValue(row, ori, 0);
          setGameBoardValue(row, index, valueOri);
        } else if (getGameBoardValue(row, index) === getGameBoardValue(row, ori)) {
          setGameBoardValue(row, ori, 0);
          setGameBoardValue(row, index, valueInd + 1);
          index++;
          score = score + Math.pow(2, valueOri);
        } else {
          setGameBoardValue(row, ori, 0);
          setGameBoardValue(row, index + 1, valueOri);
          index++;
        }
      }
      ori++;
    }

    for (var i = index + 1; i < nums; i++) {
      setGameBoardValue(row, i, 0);
    }
  }
  return score;
}

function r_event() {
  var score = 0;
  for (var row = 0; row < nums; row++) {
    var index = nums - 1;
    var ori = nums - 2;
    while (ori >= 0) {
      if (getGameBoardValue(row, ori) !== 0) {
        var valueOri = getGameBoardValue(row, ori);
        var valueInd = getGameBoardValue(row, index);
        if (getGameBoardValue(row, index) === 0) {
          setGameBoardValue(row, ori, 0);
          setGameBoardValue(row, index, valueOri);
        } else if (getGameBoardValue(row, index) === getGameBoardValue(row, ori)) {
          setGameBoardValue(row, ori, 0);
          setGameBoardValue(row, index, valueInd + 1);
          index--;
          score = score + Math.pow(2, valueOri);
        } else {
          setGameBoardValue(row, ori, 0);
          setGameBoardValue(row, index - 1, valueOri);
          index--;
        }
      }
      ori--;
    }

    for (var i = 0; i < index; i++) {
      setGameBoardValue(row, i, 0);
    }
  }
  return score;
}

function EndGame() {
  if (!isFull()) {
    return false;
  } else {
    for (var row = 0; row < nums; row++) {
      for (var col = 0; col < nums; col++) {
        var value = getGameBoardValue(row, col);
        if (
          value === getGameBoardValue(row - 1, col) ||
          value === getGameBoardValue(row + 1, col) ||
          value === getGameBoardValue(row, col - 1) ||
          value === getGameBoardValue(row, col + 1)
        ) {
          return false;
        }
      }
    }
    return true;
  }
}

function endGameProcessing() {
  const score = Number(document.getElementById('mine').innerHTML) || 0;
  $('#end_game').css('display', 'block');
  document.getElementById('new_score').innerHTML = 'YOUR SCORE: ' + score;
  document.getElementById('score-to-submit').value = score;
  document.getElementById('mode-to-submit').value = nums;
  // Unbound listener
  document.removeEventListener('keydown', EventProcessing);
  // Cap nhat vao leaderBoard => ten ms vs mau khac
  const bestScore = localStorage.getItem('bestScore') || 0;
  if (bestScore < score) localStorage.setItem('bestScore', score.toString());
}

function loadLeaderBoard() {
  const mode4 = document.querySelector('#tab1 > .wrapper');
  const mode8 = document.querySelector('#tab2 > .wrapper');

  const request = new XMLHttpRequest();
  const request8 = new XMLHttpRequest();

  request.open('GET', 'https://docongminh5499-game-2048.herokuapp.com/api/get-leader-board/4');
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      JSON.parse(request.responseText).forEach(item => {
        const div = document.createElement('div');
        div.setAttribute('class', 'person');

        const name = document.createElement('p');
        name.setAttribute('class', 'name');
        name.innerHTML = item.name;

        const score = document.createElement('p');
        score.setAttribute('class', 'lead_score');
        score.innerHTML = item.score;

        div.appendChild(name);
        div.appendChild(score);
        mode4.appendChild(div);
      });
    }
  };
  request.send();

  request8.open('GET', 'https://docongminh5499-game-2048.herokuapp.com/api/get-leader-board/8');
  request8.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      JSON.parse(request8.responseText).forEach(item => {
        const div = document.createElement('div');
        div.setAttribute('class', 'person');

        const name = document.createElement('p');
        name.setAttribute('class', 'name');
        name.innerHTML = item.name;

        const score = document.createElement('p');
        score.setAttribute('class', 'lead_score');
        score.innerHTML = item.score;

        div.appendChild(name);
        div.appendChild(score);
        mode8.appendChild(div);
      });
    }
  };
  request8.send();
}

function start() {
  initialScore();
  drawGame(nums);
  document.addEventListener('keydown', EventProcessing, false);
}

$('#mode4').click(function() {
  if (nums !== 4) {
    $('#confirm').css('display', 'block');
    $('#yes').click(function() {
      nums = 4;
      $('#confirm').css('display', 'none');
      document.removeEventListener('keydown', EventProcessing);
      start();
    });
    $('#cancel').click(function() {
      $('#confirm').css('display', 'none');
    });
  }
});

$('#mode8').click(function() {
  if (nums !== 8) {
    $('#confirm').css('display', 'block');
    $('#yes').click(function() {
      nums = 8;
      $('#confirm').css('display', 'none');
      document.removeEventListener('keydown', EventProcessing);
      start();
    });
    $('#cancel').click(function() {
      $('#confirm').css('display', 'none');
    });
  }
});

$('#replay').click(function() {
  $('#confirm_new').css('display', 'block');
  $('#yes_new').click(function() {
    $('#confirm_new').css('display', 'none');
    document.removeEventListener('keydown', EventProcessing);
    start();
  });
  $('#cancel_new').click(function() {
    $('#confirm_new').css('display', 'none');
  });
});

$('#leaderboard').tabs();
$('#link1').css('background-color', '#CDD1D2');
$('#link1').css('color', 'darkblue');

$('#link1').click(function() {
  $(this).css('background-color', '#CDD1D2');
  $(this).css('color', 'darkblue');
  $('#link2').css('background-color', '#BAAEA0');
  $('#link2').css('color', 'white');
});

$('#link2').click(function() {
  $(this).css('background-color', '#CDD1D2');
  $(this).css('color', 'darkblue');
  $('#link1').css('background-color', '#BAAEA0');
  $('#link1').css('color', 'white');
});

window.onload = function() {
  start();
  loadLeaderBoard();
};
