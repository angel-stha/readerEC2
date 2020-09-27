const express =require('express');
const mysql = require('mysql');
const bodyparser =require('body-parser');
const cors = require('cors');
var app = express();
//var jwt = require("jsonwebtoken");
const path = require('path');

app.use(cors())
//Configuring express server
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "client","build")))



var mysqlConnection = mysql.createConnection({
    host:'readers.c1vamkpv4k1c.us-east-1.rds.amazonaws.com',
    port:'3306',
    user:'admin',
    password:'angelshrestha',
    database:'bookcorner',
    insecureAuth: true,
    multipleStatements:true

});
mysqlConnection.connect((err)=>{
    if(!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed'+JSON.stringify(err,undefined,2));
});

app.get('/',(req,res)=> {
    res.json("OK")
})

app.post("/addbook", function(req, res) {
    console.log(req.body.Title);
    var  alreadythere = ("SELECT * FROM `bookcorner`.`book` where `bookname` = '" + req.body.Title + "' AND `author` = '" + req.body.Author + "'");
    console.log(alreadythere)
    mysqlConnection.query(alreadythere, function (err, result) {
            if (result.length>0) {
                res.send("Book Already in the Stack please review there")
            }
            else{
                mysqlConnection.connect(function () {

                        var sql = "INSERT INTO `bookcorner`.`book` (`bookname`, `author`) VALUES ('" + req.body.Title + "','" + req.body.Author + "')";
                        mysqlConnection.query(sql, function (err, result) {
                            if (err) throw err;
                            else
                            {
                                res.send ("Book inserted");
                            }
                        });
                    }
                )
            }

        }
    )
})




app.post("/login", function(req, res) {
    console.log(req.body.name)
    mysqlConnection.query("SELECT * FROM bookcorner.users where email = '" + req.body.name + "'", (err, rows, fields) => {
        if (rows && rows.length > 0) {
            if (req.body.pass === rows[0].password) {
                res.send("Verified")
            }
            console.log(rows[0])

        }
        else {
            res.json({error: 2})
        }
    });

})

app.get("/getbook",function(req,res){
    mysqlConnection.connect(function() {
        var dataquery =  "SELECT * FROM `bookcorner`.`book`";
        mysqlConnection.query(dataquery, function(err, results, fields) {
            if (!err)
                console.log(results);
            res.send(results);
        });
    });
});
app.post("/addReview",function(req,res){
    console.log(req.body.Review);
    console.log(req.body.Title);
    console.log(req.body.Author);
    mysqlConnection.connect(function() {
        var AddReviewQuery= "INSERT INTO `bookcorner`.`review`(`bookname`,`review`,`date`,`author`) VALUES('"+req.body.Title+"','"+req.body.Review+"','"+req.body.Date+"','"+req.body.Author+"')";
        console.log(AddReviewQuery)
        mysqlConnection.query(AddReviewQuery,function(err,add_comment,fields){
            if(!err){
                res.send('Comment Added');
                console.log(add_comment);
            }
        })
    })
})
app.get("/viewReview", function(req, res) {
    var title = req.param("Title");
    console.log(title);
    mysqlConnection.connect(function() {

        var hs =
            "SELECT * FROM `bookcorner`.`review` WHERE bookname = '" + title +"'";
        mysqlConnection.query(hs, (err, rows, fields) => {
            if (!err)
                res.json(rows);
            console.log(rows);
        });

    });
});

app.get("/getusers",function(req,res){

    var query =  "SELECT * FROM `bookcorner`.`users`";
    mysqlConnection.query(query, function(err, results, fields) {
        if (!err)
            console.log(results);
        res.send(results);
    });

});
app.get("/getrevieweddata",function(req,res){
    mysqlConnection.connect(function() {
        var dataquery =  "SELECT * FROM `bookcorner`.`reviewbook` WHERE `byuser`='" + req.user.name +"'";
        console.log(dataquery);
        mysqlConnection.query(dataquery, function(err, results, fields) {
            if (!err)
                console.log(results);
            res.send(results);
        });
    });
});
app.post("/DeleteReview",function(req,res){
    mysqlConnection.connect(function() {
        var deletequery =  "DELETE FROM `bookcorner`.`review` WHERE  `bookname` ='" + req.body.Title +"' AND `review` ='" + req.body.Review +"' AND `author`='"+req.body.Author+"'";
        console.log(deletequery)
        mysqlConnection.query(deletequery, function(err, results, fields) {
            if (!err)
                console.log(results[0]);
            res.send("Review Deleted");

        });
    });
});
app.post("/EditReview",function(req,res){
    mysqlConnection.connect(function() {
        var editquery =  "UPDATE `bookcorner`.`review` SET `review` = '"+req.body.NewReview+"' ,`date` = '"+req.body.date+"' WHERE  `bookname` ='" + req.body.Title +"' AND `review` ='" + req.body.Review +"' AND `author` ='" + req.body.Author +"'";
        console.log(editquery)
        mysqlConnection.query(editquery, function(err, results, fields) {
            if (!err)
                console.log(results);
            console.log("Review Edited");
            res.send("Review Edited");

        });
    });
});

app.get("/searchbooks", function(req, res) {
    var id = req.param("search");
    console.log(id);
    mysqlConnection.connect(function() {
            var hs =
                "SELECT * FROM `bookcorner`.`book` WHERE bookname like '" +
                id +
                "%' or author like  '" +
                id +
                "%'";
            console.log(hs)
            mysqlConnection.query(hs, (err, rows, fields) => {
                if (!err)
                    res.json(rows);
                console.log(rows);
            });
        }
    );
});
app.post("/signup",function(req,res){
    mysqlConnection.connect(function() {
        var ifalreadypresent= "SELECT * FROM `bookcorner`.`users` WHERE  `email`='"+req.body.email+"' AND `name` ='"+req.body.name+"'";
        console.log(ifalreadypresent)
        mysqlConnection.query(ifalreadypresent, function (err, result) {
                if (result=[]) {
                    console.log(result)
                    mysqlConnection.connect(function () {

                            var sql = "INSERT INTO `bookcorner`.`users` (`email`, `name`, `address`, `password`) VALUES ('" + req.body.email+ "','" + req.body.name + "','" + req.body.address + "','" + req.body.pass + "')";
                            console.log(sql)
                            mysqlConnection.query(sql, function (err, result) {
                                if (err) throw err;
                                else {
                                    console.log("1 user inserted");
                                    res.send("1 user inserted")
                                }

                            });
                        }
                    )

                }
                else{
                    res.send("User registered already")
                }

            }
        )

    })
})
const port = 8181;
app.listen(port,()=>console.log(`Listening to the port ${port}`))
