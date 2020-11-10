const crawler = require('crawler');

 let data  = [];

let crawl = new crawler({
  maxConnections :  10,
  callback : function(err, res, done){
    if(err){
      console.log(err);
    }else{
      let $ = res.$;
      $("h3").each(function(i, element){
        data[i] = $(element).text();
        console.log(data[i]);
          console.log(i);
        i++;
      });
      //console.log($("body").text());
    }
    done();
  }

});

crawl.queue("https://www.shelflife.co.za/category/");
