var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//setting up mongoose, title, image, body, date
mongoose.connect("mongodb//localhost/restfulblogapp");

app.get("/", function(req,res){
    res.send("You are connected");
});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Your Restful Blog has started!")
});


