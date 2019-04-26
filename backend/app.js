const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Task = require('./model/task');

const app = express();

mongoose.connect("mongodb://localhost/task_manager", {useNewUrlParser: true})
.then(() => {
    console.log("connected to the database");
})
.catch(()=>{
    console.log('Connection to db failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');

    next();
});

app.post("/api/postTask",(req, res, next) => {
  const task = new Task(req.body);
  task.save();
  res.status(201).json({
    message: 'Task added success'
  });
})

app.put("/api/editTask/:id", (req, res, next) => {
  const task = new Task(req.body);
  task._id = req.body.id;
  Task.updateOne({_id: req.params.id}, task).then(result => {
    res.status(200).json ({message: 'update successful'});
  });
});

app.delete("/api/deleteTask/:id", (req, res, next) => {
  Task.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json ({message: 'Task deleted'});
  });
});

app.get("/api/getTasks", (req, res, next) => {
  Task.find().then(documents => {
    res.status(200).json({
      message: 'Tasks fetched success!',
      tasks: documents
    });
  });
});

app.get("/api/edittask/:id", (req,res, next) => {
  Task.findById(req.params.id).then(task => {
    if (task){
      res.status(200).json(task);
    } else {
      res.status(404).json({message: 'Task not found!'});
    }
  })
});

module.exports = app;
