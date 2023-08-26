var express = require("express");
var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + "/../dist/chatapp"));

app.listen(3000, "127.0.0.1", function() {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();

    console.log(`Server started at ${n}:${m}`);
    console.log(__dirname + "/../dist/chatapp");
});
