import Debug from 'debug'
import { Todo } from '../models'

const debug = new Debug('socket.io:db-api:todo')

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all Tasks')
    return Todo.find().sort(sort)
  },

  findById: (_id) => {
    debug(`Find Task with id ${_id}`)
    return Todo
      .findOne({ _id })
  },

  create: (t) => {
    debug(`Creating new Task ${t}`)
    const todo = new Todo(t)
    return todo.save()
  }
}