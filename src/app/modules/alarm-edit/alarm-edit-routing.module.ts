import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmEditComponent } from './alarm-edit/alarm-edit.component';

const routes: Routes = [
  { path: '', component: AlarmEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmEditRoutingModule {}
