// import express from 'express'
import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl } from './config'
// import path from 'path'
import { createServer } from 'http'
import socketIO from 'socket.io'

const PORT = process.env.port || 3500,
      debug = Debug('socket.io:root'),
      server = createServer(app),
      io = socketIO(server)
      // publicDir = express.static( path.join(__dirname, '../../dist/socketio-app') )

app.set('io', io)

async function start() {
  await mongoose.connect( mongoUrl, { useNewUrlParser:true } )

  // app.use( publicDir )

  server.listen(PORT, () => {
    debug(`Server running at port ${PORT}`)
  })
}

start()

io.on('connection', function(socket) {
  // socket.emit('messages', 'Un estudiante se ha conectado')
})
