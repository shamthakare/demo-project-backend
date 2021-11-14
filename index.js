//backend code
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userinfo',
    port: 3306
});

db.connect(err => {
    err ? console.log('err') : console.log('Database connected Successful!!!!')
})

app.get('/', (req, res) => {
    res.send(`<h1>working</h1>`);
})
    //Display data
app.get('/user', (req, res) => {
    let qrr = `SELECT * FROM user`;
    db.query(qrr, (err, result) => {
        if (err) { console.log(err, 'err'); }
        if (result.length > 0) {
            res.send({ massage: 'All user Data', data: result });
        }
    });
});

//get single data by id
app.get('/user/:id', (req, res) => {
    let qrId = req.params.id;
    let qr = `SELECT * FROM user where id = ${qrId}`
    db.query(qr, (err, results) => {
        if (err) { console.log(err); }
        if (results.length > 0) {
            res.send({ massage: "Get data by Id", data: results })
        } else {
            res.send({
                massage: "Data not found dear"
            })
        }
    })
})
  //add data
app.post('/user', (req, res) => {
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let qr = `insert into user(fullname,email,mobile) values('${fullname}','${email}','${mobile}')`;
    db.query(qr, (err, results) => {
        if (err) { console.log(err) }
        res.send({ massage: "Data create sucsess" });
    })
})
//update data
app.put('/user/:id', (req, res) => {
    // console.log('after',typeof(uid));
    let uid = parseInt(req.params.id);
    console.log(typeof(uid));
    // console.log(req.body,"Update data")
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let qr = `update user set fullname ='${fullname}' ,email = '${email}' ,mobile = '${mobile}'  where id = ${uid}`;
    db.query(qr, (err, results) => {
        if (err) { console.log(err) }
        res.send({
            massage: "data update successful",
            data: results
        })
    })

})

//Delet data
app.delete('/user/:id', (req, res) => {
    let uid = req.params.id;
    let qr = `delete from user where id = '${uid}'`;
    db.query(qr, (err, results) => {
        if (err) { console.log(err) }
        res.send({
            massage: "Data delete successful"

        })
    })
})


app.listen(3000, () => {
    console.log("server is runing 3000 PORT");
})