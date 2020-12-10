//link to the express package
var express = require('express');
//instantiated a new express route to handle http request
var router = express.Router();


//Reference the task model
const Task = require('../models/task')
const globals = require('../../config/globals')

//allow cross origin requests
router.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin',globals.clientRoot);
    res.header('Access-Control-Allow-Headers','Origin, x-Request-with, Content-Type,Accept')
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
    next()
})
//GET ALL - API
router.get('/',(req, res) => {
    //use the task model to fetch a list of tasks and pass these to the view display
    //if err, the err parameter will be filled
    //if not, the task parameter will be filled with the query result
    Task.find((err, tasks) => {
        if (err)
        {
            return res.send(err).status(400) // 400 = Bad request
        }
        else {
            res.json(tasks).status(200) //200 = 0k
        }
    })
})

//GET ONE API
router.get('/:_id',(req, res) => {
    //use the task model to fetch a list of tasks and pass these to the view display
    //if err, the err parameter will be filled
    //if not, the task parameter will be filled with the query result
    Task.findById(req.params._id,(err, tasks) => {
        if (err)
        {
            return res.send(err).status(400) // 400 = Bad request
        }
        else {
            res.json(tasks).status(200) //200 = 0k
        }
    })
})

/*POST*/
router.post('/',(req, res) => {
    Task.create({
        name: req.body.name,
        complete: req.body.complete,
        priority: req.body.priority
    }, (err, tasks ) => {
        if(err){ //send 400 - Bad Request
            return res.send(err).status(400)
        }
        else //send 201 - Resource Created
            {
                res.json(tasks).status(201)
            }
    })
})

//DELETE
router.delete('/:_id',(req,res) => {
    Task.remove({_id: req.params._id},(err,tasks) => {
        if (err) {
            return res.send(err).status(400)
        }
        else
            {
            res.json(tasks).status(201)
        }
    })
})

//PUT(UPDATE)

router.put('/:_id',(req,res) => {
    Task.update({_id: req.params._id},req.body,(err,tasks) => {
        if (err) {
            return res.send(err).status(400)
        }
        else
        {
            res.json(tasks).status(201)

        }
    })
})

//Make public
module.exports = router;