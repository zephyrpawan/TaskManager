import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './task/addtask/addtask.component';
import { ViewtaskComponent } from './task/viewtask/viewtask.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add_task', component: AddtaskComponent },
  { path: 'view_task', component: ViewtaskComponent },
  { path: 'edit_task/:taskId', component: AddtaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
