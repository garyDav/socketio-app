import { Component, OnInit } from '@angular/core'

import { Todo } from '../todo'
import { TodoService } from '../todo.service'

// import { Socket } from 'ng6-socket-io';
import * as io from 'socket.io-client'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  socket
  toDoList: Todo[]

  constructor(
    private todoService: TodoService
    // private socket: Socket
    ) {
    this.socket = io.connect('http://localhost:3500')
  }

  ngOnInit() {
    this.getTasks()
    this.socket.on('newTaskAdded', () => {
      this.getTasks()
    })
  }

  getTasks(): void {
    this.todoService.getTasks()
      .subscribe(tasks => this.toDoList = tasks)
  }

  addToDo(todo: string):void {
    todo = todo.trim()
    if (!todo) { return }
    this.todoService.addTask({ description: todo } as Todo)
      .subscribe(task => {
        this.toDoList.unshift(task)
      })
  }

}
