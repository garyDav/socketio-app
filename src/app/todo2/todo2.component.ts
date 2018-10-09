import { Component, OnInit } from '@angular/core'

import { Todo } from '../todo'
import { TodoService } from '../todo.service'

import * as io from 'socket.io-client'

@Component({
  selector: 'app-todo2',
  templateUrl: './todo2.component.html',
  styleUrls: ['./todo2.component.css']
})
export class Todo2Component implements OnInit {
  socket
  toDoList: Todo[]

  constructor(
    private todoService: TodoService
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

}
