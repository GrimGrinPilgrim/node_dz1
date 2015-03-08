var express = require('express'),
  app = express(),
  haml = require('haml'),
  fs = require('fs');

app.use(express.static('photos'));

app.get('/photos/:id',function(req,res){
  var hero_name = req.params.id
  var hero_img =hero_name+".jpg" 

  var view = fs.readFileSync('index.haml', 'utf8');
  res.setHeader("Content-Type", "text/html; charset=utf8");
  res.end( haml.render(view, { locals:{ hero: hero_name, hero_img: hero_img} }) );
})

app.get('*',function(req,res){
  res.end('404')
})
app.listen('4444')
console.log('all good')