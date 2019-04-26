import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskToEnd: Task;
  private tasksSub: Subscription;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskService.getTasks();
    this.tasksSub = this.taskService.getTaskUpdateListener()
    .subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

onEndTask(id: string) {
  this.taskService.getTask(id).subscribe(taskData => {
    this.taskToEnd = new Task(taskData._id, taskData.parentId, taskData.taskName, taskData.startDate, 'Task Ended', taskData.priority);
    this.taskService.updateTask(this.taskToEnd);
  });
}

onDeleteTask(id: string) {
  this.taskService.deleteTask(id);
}

alertReadOnly() {
  alert('Task already ended, unable to edit!');
}

  ngDestroy() {
    this.tasksSub.unsubscribe();
  }

}
