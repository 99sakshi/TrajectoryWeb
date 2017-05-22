var express = require("express");
var app = express()

console.log('Starting the main Trajectory Server ...');

app.get("/start",function(request, response){
    var id = request.params.id;
    var obj = { id : id, Content : "content " +id , data : " Simulation Start Karo !!!" };
    console.log('Button on front end clicked!');
    response.json(obj);
});

app.use(express.static('.'));
var server = app.listen(3000);

