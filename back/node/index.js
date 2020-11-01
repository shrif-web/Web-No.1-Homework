var express = require('express');
var bodyParser = require('body-parser');



var app = express();
app.use(express.json());
app.use(bodyParser.json());  


const port = '3030'
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

app.post('/node/sha', (req, res) => {
    var a = req.body.num1;
    var b = req.body.num2;

    if (Number.isNaN(a) || Number.isNaN(b)){
        res.status(400).json({
			message: "Please insert numbers!"
        });
    return;
    }
    var s = a + b;
    var hash = require("crypto").createHash("sha256").update(s.toString()).digest("hex")
    // const json = "{\"result\":"+hash+'}';
    // const obj = JSON.parse(json);
    const obj = {'Result':hash}
    res.send(obj);
});

var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname,'..', 'sample.txt');

app.get('/node/write', (req, res) => {
    if(req.query.lineNum == undefined){
        res.status(400).send("Insert number!");
			return;
    }
    var num = parseInt(req.query.lineNum);
    if(num < 1 || num > 100){
        res.status(400).send("Line number out of bound!");
			return;
    }
    fs.readFile(filePath, 'utf8', (err,data) => {
        if (err) {
            res.status(400).send("Error!");
            return;
        }
        res.send(data.split('\n')[num-1]);
      })
});



