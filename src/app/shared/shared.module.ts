import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DeleteAlarmModalComponent } from './delete-alarm-modal/delete-alarm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    DeleteAlarmModalComponent,
  ],
  exports: [DeleteAlarmModalComponent],
})
export class SharedModule {}