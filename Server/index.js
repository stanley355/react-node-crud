const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
// Parse URL encoded bodies (as sent by HTML Form)
app.use(express.urlencoded({extended: true}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mydb'
});



app.get('/api/get', (req, res)=>{
    const sqlGet = 'SELECT * FROM crud1';
    db.query(sqlGet, (err, result)=>{
        if (err) console.log(err);
        else res.send(result);
    })
})


app.delete('/api/delete/:movieName', (req, res)=>{
    const name = req.params.movieName;
    const sqlDelete = 'DELETE FROM crud1 WHERE movieName = ?';
    db.query(sqlDelete, name, (err, result)=>{
        if (err) console.log(err);
        else console.log('Data deleted');
    });
});

app.put('/api/update', (req, res)=>{
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = 'UPDATE SET crud1 movieReview = ? WHERE movieName = ?';
    db.query(sqlUpdate, [review, name]), (err, result)=>{
        if (err) console.log(err);
        else console.log('Data deleted');
    };
});

app.post('/api/insert', (req, res)=>{

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = 'INSERT INTO crud1 (movieName, movieReview) VALUES (?, ?)';
    db.query(sqlInsert, [movieName, movieReview], (err, result)=>{
        if (err) console.log(err);
        else console.log(result);
    });

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Running at port 3001');
})

