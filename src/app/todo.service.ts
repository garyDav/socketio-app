import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../environments/environment'

import { Todo } from './todo'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private taskUrl = urljoin(environment.apiUrl, 'tasks')  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** GET task from the server */
  getTasks(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.taskUrl)
      .pipe(
        tap(tasks => this.log(`fetched tasks ${tasks}`)),
        catchError(this.handleError('getTasks', []))
      )
  }

  /** POST: add a new task to the server */
  addTask (task: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.taskUrl, task, httpOptions).pipe(
      tap((task: Todo) => this.log(`added task w/ id=${task._id}`)),
      catchError(this.handleError<Todo>('addTask'))
    )
  }

  /** Log a TaskService message with the console.log */
  private log(message: string) {
    console.log(`TaskService: ${message}`)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

}
