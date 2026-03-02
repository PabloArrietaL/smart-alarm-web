import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmCreateComponent } from './alarm-create/alarm-create.component';

const routes: Routes = [
  { path: '', component: AlarmCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmCreateRoutingModule {}
