const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || '3000');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/main.html'));
});

app.get('/api/get-leader-board/:id', (req, res) => {
  const mode = req.params.id || 4;
  if (mode != '8' && mode != '4') res.status(200).send('[]');

  const pathOfFile = path.join(__dirname, '/score.json');
  fs.readFile(pathOfFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      res.send('500 - Internal Error');
    }
    const dataObj = JSON.parse(data);
    res.status(200).json(dataObj[mode]);
  });
});

app.post('/add-score', (req, res) => {
  const pathOfFile = path.join(__dirname, '/score.json');
  const dataSend = req.body;
  fs.readFile(pathOfFile, 'utf8', (err, data) => {
    if (err) {
      console.log('Can not read file');
      return;
    }
    const dataObj = JSON.parse(data);
    dataObj[dataSend.mode].push({ name: dataSend.name, score: dataSend.score });
    dataObj[dataSend.mode].sort((prev, next) => next.score - prev.score).slice(0, 10);
    fs.writeFile(pathOfFile, JSON.stringify(dataObj, null, 2), err => {
      if (err) console.log('Can not write file');
      console.log('Write file successful');
    });
  });
  res.redirect(302, '/');
});

app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.end('404 - Not Found');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.type('text/plain');
  res.status(500);
  res.end('500 - Internal Error');
});

app.listen(app.get('port'), () => console.log('NodeJS listen to port ' + app.get('port')));
