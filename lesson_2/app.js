var express = require('express');
  app = express();
  fs = require('fs');
  passport = require('passport');
  passport_local = require('passport-local').Strategy;
  cookie_parser = require('cookie-parser');
  body_parser = require('body-parser');
  _ = require('underscore');
  multer  = require('multer');
  done=false;
  var uploaded_file_name;

app.set('views', './views');
app.set('view engine', 'jade');


app.use(express.static('images'));
app.use(express.static('css'));

// express.body_parser({ uploadDir: 'photos' });

app.use(cookie_parser());
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

app.use(require("express-session")({secret:"12"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passport_local(
  {
    usernameField:'username',
    passwordField:'password'
  },

  function(username, password,done){
    var userlist = [{username:'user', password:'password'}]

    if(_.filter(userlist,function(user){return(user.username==username && user.password==password)}).length>0)
      {done(null,{username:username, password:password})} 
    else{
      done(null,false,{message:"just for Marvel lovers"})
    }
  }
));

passport.serializeUser(function(user, done) {
  console.log('Сериализуем пользователя');
  done(null, user.username);
});
passport.deserializeUser(function(username, done) {
  console.log('Десериализуем пользователя ' + username);
  done(null, { username:username });
});

app.use(multer({ dest: './images/photos/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
  uploaded_file_name=file.name
}
}));

app.post('/', passport.authenticate('local', { successRedirect: '/add', failureRedirect: '/'}))
app.post('/add',function(req,res){
  if(done==true){
    var name = uploaded_file_name.split('.')
console.log(name)
    res.redirect('/photos/'+name[0])
  }
});

// app.get('/photos',function(req,res){
//  res.redirect('/photos/'+req.user.username)
// })

app.get('/photos/:id',function(req,res){
  var hero_name = req.params.id 
  res.render('index',{ hero: hero_name});
})

app.get('/',function(req,res){
  res.render( 'login_form' );
})
app.get('/add',function(req,res){
  res.render( 'add_hero' );
})
app.get('*',function(req,res){
  res.render( '404' );
})

app.listen('4444')
console.log('all good')