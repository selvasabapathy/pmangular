import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { ProjComponent } from './proj/proj.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskViewComponent } from './task-view/task-view.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'user', component:  UserComponent },
  { path: 'proj', component:  ProjComponent },
  { path: 'taskadd', component:  TaskAddComponent },
  { path: 'taskupdate', component:  TaskUpdateComponent },
  { path: 'taskview', component: TaskViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
