const express = require('express');

const router = express.Router();

const Task = require('../models/Task');

const auth = require('../middleware/authMiddleware');


//GET TASKS 
router.get('/', auth, async (req, res) => {

  try {

    const tasks = await Task.find({
      user: req.user.id
    });

    res.json(tasks);

  }

  catch (err) {

    res.status(500).json({
      message: 'Server error'
    });

  }

});


//CREATE TASK 
router.post('/', auth, async (req, res) => {

  try {

    const { title, description } = req.body;

    const task = await Task.create({

      title,
      description,
      user: req.user.id

    });

    res.status(201).json(task);

  }

  catch (err) {

    res.status(500).json({
      message: 'Server error'
    });

  }

});


//UPDATE TASK
router.put('/:id', auth, async (req, res) => {

  try {

    const task = await Task.findOneAndUpdate(

      {
        _id: req.params.id,
        user: req.user.id
      },

     { title: req.body.title, description: req.body.description, completed: req.body.completed },


      {
        new: true
      }

    );

    if (!task) {

      return res.status(404).json({
        message: 'Task not found'
      });

    }

    res.json(task);

  }

  catch (err) {

    res.status(500).json({
      message: 'Server error'
    });

  }

});


//DELETE TASK
router.delete('/:id', auth, async (req, res) => {

  try {

    const task = await Task.findOneAndDelete({

      _id: req.params.id,
      user: req.user.id

    });

    if (!task) {

      return res.status(404).json({
        message: 'Task not found'
      });

    }

    res.json({
      message: 'Task deleted'
    });

  }

  catch (err) {

    res.status(500).json({
      message: 'Server error'
    });

  }

});

module.exports = router;