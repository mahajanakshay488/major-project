const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/major-a1'));

app.listen(process.env.PORT || 8080);

app.get("*", (req, res) => {
    res.send(path.join(__dirname + '/dist/major-a1/index.html'));
});