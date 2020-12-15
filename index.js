const { response } = require('express');
const express = require('express')
const client = require('./db')
const app = express()

const port = 3000

app.use(express.json());

//get all users
app.get('/', (req, res) => { 
    client.query('SElECT * FROM users', (err, results) => {
        if(err){
            console.log(err);
            
        }
        return res.status(200).json(results.rows)
    })
 })

//get user by id
app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
        if(err){
            console.log(err);
           return res.status(500).json({message: 'Internal server error'})
        }
        if(results.rows.length > 0){
            return res.status(200).json(results.rows)
            
        }
        return res.status(200).send({message: 'User id not found'})
    })
})

//create user
app.post('/user', (req, res) => {
    const {name, email} = req.body
    client.query('INSERT INTO users (name, email) VALUES ($1, $2)',[`${name}`, `${email}`], (err, results) => {
        if(err){
            console.log(err); 
           return res.status(500).json({error: err})
        }
        console.log(results);
        return res.status(200).send({message: `User added`})
    })
})


//update user
app.put('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {name, email} = req.body

    client.query('Update users SET name = $1, email = $2 WHERE id = $3', [`${name}`, `${email}`, `${id}`], (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({error: err})
        }
        console.log(results);
        return res.status(200).send({message: `User updated`})
    })
})


app.delete('/user/:id',(req, res)=>{
    const id = parseInt(req.params.id)
    client.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({error: err})
        }
        console.log(result);
        return res.status(200).send({message: `User Deleted`})
    })
})


app.listen(port, () => console.log(`app listening on port ${port}!`))
