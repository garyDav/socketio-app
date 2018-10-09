import express from 'express'
import { required } from '../middleware'
import { todo as task } from '../db-api'
import { handleError } from '../utils'

const app = express.Router();

// GET /api/tasks
app.get('/', async (req, res) => {
    try {
        const todo = await task.findAll()
        res.status(200).json(todo)
    } catch (error) {
        handleError(error, res)
    }
})


// POST /api/tasks
app.post('/', async (req, res) => {
  const recived = req.body
  console.log(recived)
  const t = recived

  /* SocketIO */
  const io = req.app.get('io')
  /* Fin SocketIO */

  try {
    const savedTodo = await task.create(t)

    /* SocketIO */
    io.emit('newTaskAdded')
    /* Fin SocketIO */

    res.status(201).json(savedTodo)
  } catch (error) {
    handleError(error, res)
  }

})

export default app
