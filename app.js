var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//setting up mongoose, title, image, body, date
mongoose.connect("mongodb://localhost/restfulblogapp");

//MONGOOSE/MODEL CONFIG
var blogSchema =  new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog",blogSchema);


// Blog.create({
//     title:"The Start of Something New",
//     image:"https://images.unsplash.com/reserve/unsplash_528b27288f41f_1.JPG",
//     body:"Inspired by Casey who vlogs everyday. As a developer, I want to challenge myself and develop more skill. I'm starting a challenge to develop one apps every week, no matter how hideous they look"
// });
//RESTFUL ROUTES

app.get("/", function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req,res){
    Blog.find({}, function(err,blogs){
        if(err){
            console.log("ERROR :" + err);
        } else{
            res.render("index",{blogs:blogs});
        }
    })
});

app.get("/blogs/new", function(req,res){
    res.render('new');
})

app.post("/blogs", function(req,res){
    //create blog
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new")
        } else{
            res.redirect("/blogs")
        };
    });
});

app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("show", {blog:foundBlog});
        }
    })
})

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Your Restful Blog has started!")
});

