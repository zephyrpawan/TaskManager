import { Task } from './task.model';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient } from '@angular/common/http';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks() {
    this.http.get<{message: string, tasks: any}>('http://localhost:3000/api/getTasks')
      .pipe(map((taskData) => {
        return taskData.tasks.map(task => {
          return {
            id: task._id,
            parentId: task.parentId,
            taskName: task.taskName,
            startDate: task.startDate,
            endDate: task.endDate,
            priority: task.priority
          };
        });
      }))
      .subscribe((mappedTask) => {
        this.tasks = mappedTask;
        this.tasksUpdated.next([...this.tasks]);
    });
  }

  getTask(id: string) {
    return this.http
    .get<{_id: string, taskName: string, parentId: string, startDate: string, endDate: string, priority: number, __v: any}>
    ('http://localhost:3000/api/editTask/' + id);
  }

  addTask(task: Task) {
    this.http.post<{message: string}>('http://localhost:3000/api/postTask', task)
      .subscribe((resData) => {
        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  updateTask(task: Task) {
    this.http.put('http://localhost:3000/api/editTask/' + task.id, task)
      .subscribe(response => {
        const updatedTasks = [...this.tasks];
        const oldTaskIndex = updatedTasks.findIndex(t => t.id === task.id);
        updatedTasks[oldTaskIndex] = task;
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  deleteTask(taskId: string) {
    this.http.delete('http://localhost:3000/api/deleteTask/' + taskId)
    .subscribe(() => {
      const updatedTasks = this.tasks.filter(task => task.id !== taskId);
      this.tasks = updatedTasks;
      this.tasksUpdated.next([...this.tasks]);
    });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

}
