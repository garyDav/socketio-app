import { todo } from '../db-api'
import { handleError } from '../utils'

export const todoMiddleware = async (req, res, next) => {
  try {
    req.todo = await todo.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
