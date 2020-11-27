//jshint esversion:6
require("dotenv").config();
const exp = require('express');
const mongoose = require('mongoose')
const crawler = require('crawler');

mongoose.connect(""+process.env.connString+"", {useNewUrlParser:true, useUnifiedTopology:true});

const itemSchema = {
  title : String,
  link: String
};


const Item = new mongoose.model("Item", itemSchema);
let data ="";
let crawl = new crawler({
  maxConnections :  10,
  callback : function(err, res, done){
    if(err){
      console.log(err);
    }else{
      let $ = res.$;


      $(".related-ad-title").each(function(i, element){
        title = element.children;
        if(title.length === 0){

        }
        else{
          data = new Item({
            title : $(element).text(),
            link : element.attribs.href
          });

        }

      });

    }
    done();
  }

});

crawl.queue("https://www.gumtree.co.za/s-western-cape/cheap+car+rental/v1l3100001q0p1" );

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

app.get('/crawl', function(req,res){
  Item.find({title:/Car/}, function(err,data){
    if(err){
      console.log(err);
    }
    else{
        res.render('crawl',{data:data})
    }
  });

});

app.listen(process.env.PORT || 3000, function(){
  console.log("listening on 3000");
});
