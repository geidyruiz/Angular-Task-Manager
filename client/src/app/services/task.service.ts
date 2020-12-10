
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";

//get api server path from config
import globals from "../../../../config/globals";

// instantiate headers so all http calls are json-formatted
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  // inject HttpClient so the service can make http calls to the node api
  constructor(private http: HttpClient) {  }

  // GET - all tasks from node api & format call / response as json
  getTasks() {
    return this.http.get(globals.apiRoot + '/tasks', httpOptions)
  }

  // POST - save new task
  addTask(newTask) {
    return this.http.post(globals.apiRoot + '/tasks', newTask, httpOptions)
  }

  // DELETE
  deleteTask(_id) {
    return this.http.delete(globals.apiRoot + '/tasks' + _id, httpOptions)
  }

  // UPDATE
  updateTask(task) {
    return this.http.put(globals.apiRoot + '/tasks' + task._id, task, httpOptions)
  }
}
