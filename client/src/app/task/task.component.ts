import { Component, OnInit } from '@angular/core';
//reference Task service and Observable Class
import {TaskService} from "../services/task.service";
import{Observable} from "rxjs";
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  tasks: any;
  _id: string;
  name: string;
  complete: boolean;
  priority: number;
  showForm: boolean;
  constructor(private taskService: TaskService) { }



  // When Angular initializes this component, automatically calls the api to get all  Tasks
  ngOnInit()
  {
    showForm: false
    this.getTasks()
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(res => {
      console.log(res);
      this.tasks = res;
    }, err => {
      console.log(err);
    })
  }

  addTask() {
    //create new task obj
    let newTask = {
      name: this.name,
      complete: this.complete,
      priority: this.priority
    }
    // call the service to add a task (which will call the server expresss api in turn)
    // then refresh the task list
    this.taskService.addTask(newTask).subscribe(response => {
      this.getTasks()
      this.clearForm()
      this.showForm = false;
    })
  }

  clearForm(): void {
    this._id = null
    this.name = null
    this.complete = null
    this.priority = null
  }

  deleteTask(_id): void
  {
    if(confirm('Are you sure you want to delete this?'))
      this.taskService.deleteTask(_id).subscribe(response =>{
        this.getTasks()
      })
  }

  updateTask(): void {

    let task = {
      _id: this._id,
      name: this.name,
      complete: this.complete,
      priority: this.priority
    }

    this.taskService.updateTask(task).subscribe(response => {
      this.getTasks()
      this.clearForm()
      this.showForm = false;
    })
  }
  displayForm()
  {
    this.showForm = true
  }

  selectTask(task): void {
    this.showForm = true
    this._id= task._id
    this.name= task.name
    this.complete= task.complete
    this.priority= task.priority
  }
}


