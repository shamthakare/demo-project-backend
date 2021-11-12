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

app.get('/users', (req, res) => {
    let qrr = `SELECT * FROM user`;
    db.query(qrr, (err, result) => {
        if (err) { console.log(err, 'err'); }
        if (result.length > 0) {
            res.send({ massage: 'All user Data', data: result });
        }
    }); 
});

//get single data by id
// app.get('/user/:id',(req,res)=>{
//     let qrId = req.params.id;
//     let qr = `SELECT * FROM users where id = ${qr}`;
//     db.query(qr,(err.results) =>{
//         if(er){
//             console.log(err);
//         }
//         if(results.length>0){

//         }
//     }) 
// })




app.listen(3000, () => {
    console.log("server is runing 3000 PORT");

})



// git init
// git add .
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/shamthakare/demo-project-backend.git
// git push -u origin main
