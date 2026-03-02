import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

export interface DeleteAlarmDialogData {
  time: string;
  label: string;
  repeat: string;
  priority: string;
  id: number;
}

@Component({
  selector: 'app-delete-alarm-modal',
  templateUrl: './delete-alarm-modal.component.html',
  styleUrls: ['./delete-alarm-modal.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule],
})
export class DeleteAlarmModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAlarmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteAlarmDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}