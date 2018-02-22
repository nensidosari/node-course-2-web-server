const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


//the port to deploy to heroku
const port = process.env.PORT || 4000;

let app = express(); // call the method to create the app

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next)=> {
  let now = new Date().toString();
  let log = `${now} : ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('unable to append server.log');
    }
  });

  next();
});

// middleware without next. only this will execute not the others

/*
app.use((req, res, next)=> {

  res.render('maintenance.hbs',{
    pageTitle: 'Maintenance Page',
    //currentYear: new Date().getFullYear(),
    message: 'Page is down for maintenance. Please try again later.'
  });
});*/

app.use(express.static(__dirname + '/public'));// path to project directory with __dirname


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
 // res.send('<h1>Hello Express</h1>'); //after getting request from user we response
  /*  res.send({
      name: 'Nensi',
      likes: [
        'biking',
        'cities'
      ]
    });*/

  res.render('home.hbs',{
    pageTitle: 'Home Page',
    //currentYear: new Date().getFullYear(),
    name: 'Nensi'
  });
});

app.get('/about', (req,res) => {
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });// object second arg optional
});

app.get('/bad', (req,res) =>{
  res.send({
    error: 'Stimulated',
    reason: 'trial'
  });
});

app.listen(port, ()=> {
  console.log(`server is up on port ${port}`);
}); // to bind the app to a port on our machine

// if you want app.listen can take another argument




