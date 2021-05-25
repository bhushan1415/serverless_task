const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
// const pool = require('./configs/dbConfig')
const db = require('./models/index');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/test',(req,res)=>{
    res.send('hello world');
})

// Handle user GET route for all user
 app.get('/user/', async (req, res) => {
   try {
    const result = await db.User.findAll({attributes: ['id', 'FirstName','LastName','Email']});
    return res.send(result); 
   } catch (err) {
     console.log(err)
   }
 })

// Handle user GET route for specific user
app.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await db.User.findOne({where: {id}})
    if(result){
      return res.send(result);
    } else {
      return res.send('No recoed Found');
    }
  } catch (err) {
    console.log(err)
  }
})

// Handle user POST route
app.post('/user/', async (req, res) => {
    try {
      await db.User.create(req.body);
      res.send('User Added Successfully');
    } catch (err) {
      console.log(err)
    }
  })

// Handle user update post route
app.post('/user/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await db.User.findOne({where: {id}})
    if(result){
      await db.User.update(req.body,{where: {id}})
      return res.send('User Updated Successfully');
    } else {
      return res.send('No recoed Found');
    }   
  } catch (err) {
    console.log(err)
  } 
})

// Handler user DELETE route
app.delete('/user/:id', async (req, res) => {
  try {
      const { id } = req.params
      const result = await db.User.findOne({where: {id}})
      if(result){
        await db.User.destroy({where: {id}})
        return res.send('User Deleted Successfully');
      } else {
        return res.send('No recoed Found');
      }
      
    } catch (err) {
      console.log(err);
    }
  })

  module.exports.handler = serverless(app)