var http = require('http'),
  fs = require('fs'),
  url =require('url');
var data = {
  complDate: new Date(),
  monthes:['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'],
  day_state:function(){
    var massage;
    switch(true){
      case data.complDate.getHours() >= 5 && data.complDate.getHours() < 11:
        massage = 'Gutten morgen'
      break
      case data.complDate.getHours() >= 11 && data.complDate.getHours() < 16:
        massage = 'Konnichiwa'
      break
      case data.complDate.getHours() >=16 && data.complDate.getHours() < 22:
        massage = 'Bonsoir'
      break
      case data.complDate.getHours() >=22 && data.complDate.getHours() < 5:
        massage = 'Доброй ночи'
      break
    }
    return massage;
  }
}

var routes = {
      spec:['/what_date_is_today','/what_time_is_it'],
      fav: function(req,res) {
        var img = fs.readFileSync('favicon.ico');
        res.writeHead(200, {'Content-Type': 'image/ico' });
        res.end(img, 'binary');
      },
      '/what_date_is_today': function(req,res) {
        var cur_month = data.monthes[data.complDate.getMonth()]
        var date = ''+data.complDate.getDate()+' '+cur_month+' '+data.complDate.getFullYear();
        res.end('Сегодня: ' + date);
      },
      '/what_time_is_it': function(req,res) {
        var time = ''+data.complDate.getHours()+':'+data.complDate.getMinutes()+':'+data.complDate.getSeconds();
        res.end('Сейчас: ' + time);
      }
    }

var resident = http.createServer(function(req,res){
  var name = url.parse(req.url).pathname;
  if (name === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    routes.fav(req,res)
    console.log('запрос иконки');
    // return;
  }else{
    res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    if(routes.spec.indexOf(name) >= 0) routes[name](req,res)
    else res.end(data.day_state());  
  }
  
});

resident.listen(4005);
console.log('welcome to the 4005 room')