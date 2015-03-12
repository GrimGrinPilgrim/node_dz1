var express = require('express'),
  app = express(),
  haml = require('hamljs'),
  fs = require('fs');

app.use(express.static('photos'));
app.use(express.static('404img'));

app.use(express.static(__dirname + '/css'));

app.get('/photos/:id',function(req,res){
  var hero_name = req.params.id
  var hero_img =hero_name+".jpg" 

  var view = fs.readFileSync('index.haml', 'utf8');
  res.setHeader("Content-Type", "text/html; charset=utf8");
  res.end( haml.render(view, { locals:{ hero: hero_name, hero_img: hero_img} }) );
})

app.engine('.haml', require('hamljs').renderFile);

app.get('*',function(req,res){
  var view = fs.readFileSync('404.haml', 'utf8');
  res.setHeader("Content-Type", "text/html; charset=utf8");
  res.end( haml.render(view) );
})

app.listen('4444')
console.log('all good')