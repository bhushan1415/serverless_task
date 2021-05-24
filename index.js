const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const pool = require('./configs/dbConfig')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/test',(req,res)=>{
    res.send('hello world');
})

// Handle user GET route for all user
app.get('/user/', (req, res) => {
    const query = 'SELECT * FROM user_tb'
    pool.query(query,(error, results) => {
        if (error) {
            console.log(error);
          throw error
        }
        res.status(200).json(results.rows)
      })
  })

// Handle user GET route for specific user
app.get('/user/:id', (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM user_tb WHERE id=${id}`
    pool.query(query, (err, results) => {
      if (err) {
        const response = { data: null, message: err.message, }
        res.send(response)
      }
  
      res.status(200).json(results.rows)
    })
  })

  // Handle user POST route
app.post('/user/', (req, res) => {
    const { name } = req.body
  
    const query = `INSERT INTO user_tb (name) VALUES ('${name}')`
    pool.query(query, (err, results) => {
      if (err) {
        const response = { data: null, message: err.message, }
        res.send(response)
      }
      const { insertId } = results
      const user = { id: insertId, name }
      const response = {
        data: user,
        message: `user ${name} successfully added.`,
      }
      res.status(201).send(response)
    })
  })

  // Handle user update post route
app.post('/user/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM user_tb WHERE id=${id}`
    pool.query(query, (err, results) => {
      if (err) {
        const response = { data: null, message: err.message, }
        res.send(response)
      }
      const userId = {...results.rows};
      const Id = userId[0].id;
      const { name } = { ...req.body }
      const query = `UPDATE user_tb SET name='${name}' WHERE id='${Id}'`
      pool.query(query, (err, results) => {
        if (err) {
          const response = { data: null, message: err.message, }
          res.send(response)
        }
  
        const user = {
          id,
          name,
        }
        const response = {
          data: user,
          message: `user ${name} is successfully updated.`,
        }
        res.send(response)
      })
    })
  })

  // Handler user DELETE route
app.delete('/user/:id', (req, res) => {
    const { id } = req.params
    const query = `DELETE FROM user_tb WHERE id=${id}`
    pool.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message }
        res.send(response)
      }
  
      const response = {
        message: `user with id: ${id} successfully deleted.`,
      }
      res.send(response)
    })
  })

  module.exports.handler = serverless(app)