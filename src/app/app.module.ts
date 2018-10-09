import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { TodoComponent } from './todo/todo.component'

import { SocketIoModule, SocketIoConfig } from 'ng6-socket-io';
import { Todo2Component } from './todo2/todo2.component';
import { NgZoneDemoComponent } from './ng-zone-demo/ng-zone-demo.component';
 
const config: SocketIoConfig = { url: 'http://localhost:3500', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    Todo2Component,
    NgZoneDemoComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
