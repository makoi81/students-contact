var Sequelize = require('sequelize');
var express = require('express');
var databaseURL = 'sqlite://db';
var sequelize = new Sequelize(databaseURL);
var app = express();
var port = 3000;
//var blogStudent = [];
var bodyParser = require("body-parser");

var Student = sequelize.define('student', {

    fullName:Sequelize.STRING,
    email:Sequelize.STRING,
    location:Sequelize.STRING,
    age:Sequelize.INTEGER,
    hobbies:Sequelize.STRING,
    dateTime:Sequelize.DATE
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

// set of views engine for handlebars ejs for ejs
app.set('view engine', 'ejs')

// get the list of all studedent
app.get('/', function(req, res){
	console.log("hi this list rendering ");
	Student.findAll().then(function(rows){
			res.render('index', {blogStudent: rows});
	});
});

app.get('/Student.json', function(req, res){
	Student.findAll().then(function(){
		res.json(Student);
	});
});


app.post('/create', function(req, res){
  	// var d = new Date();
  	var newEntre = {
  		'fullName': req.body.fullName,
  		'email': req.body.email,
  		'location': req.body.location,
  		'age': req.body.age,
  		'hobbies':req.body.hobbies
  		// 'dateTime': d
  	}
    
  	console.log('Hi guys this my express app');

  	sequelize.sync().then(function()
    {
        		return Student.create(newEntre).then(function(blogStudent)
            {
      		      res.redirect('/')
      	    });

    });
});
// route to get the edit.ejs
app.get('/edit/:id', function(req, res){
	console.log("hi this list rendering ");
	Student.findById(req.params.id).then(function(rows){
			res.render('edit', {blogStudent: rows});
	});
});
// update the student info in the dataBase


app.post('/edit/:id', function(req, res){

	var newEntre = {
		'fullName': req.body.fullName,
		'email': req.body.email,
		'location': req.body.location,
		'age': req.body.age,
		'hobbies':req.body.hobbies,

	}


    Student.update(
    	newEntre,
    	{
      		where:{
  				id:req.params.id
  			}
    	}
    ).then(function(blogStudent) {



    	res.redirect("/")

    });

});

//Delete a student info from the dataBase
app.get('/delete/:id', function(req, res) {

    Student.destroy(
    	{
            where: {
                id: req.params.id
            }
        }).then(function() {


        res.redirect('/');
    });
});

app.listen(port, function(){
	console.log("app on port "+ port);
});
