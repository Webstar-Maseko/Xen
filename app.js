//jshint esversion:6

const exp = require('express');

const app = exp();
app.use(exp.static("static"));
app.set("view engine", "ejs");



app.get("/", function(req,res){
  res.render("index");
});
app.get("/about", function(req,res){
    res.render("about");
});
app.get("/services", function(req,res){
    res.render("services");
});
app.get("/contact", function(req,res){
    res.render("contact");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("listening on 3000");
});
