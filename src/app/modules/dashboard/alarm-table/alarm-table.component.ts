import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Alarm } from '../../../models/alarm';
import { AlarmService } from '../../../services/alarm.service';
import { DeleteAlarmModalComponent, DeleteAlarmDialogData } from '../../../shared/delete-alarm-modal/delete-alarm-modal.component';

@Component({
  selector: 'app-alarm-table',
  templateUrl: './alarm-table.component.html',
  styleUrls: ['./alarm-table.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
})
export class AlarmTableComponent implements OnInit, OnDestroy {
  alarms: Alarm[] = [];
  displayedColumns: string[] = ['time', 'repeat', 'label', 'priority', 'actions'];
  private subscription!: Subscription;

  constructor(
    private alarmService: AlarmService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.alarmService.alarms$.subscribe(alarms => {
      this.alarms = alarms;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getPriorityColor(level: string): string {
    switch (level) {
      case 'high': return '#e53935';
      case 'medium': return '#fb8c00';
      case 'low': return '#43a047';
      default: return '#616161';
    }
  }

  getRepeatBgColor(type: string): string {
    return type === 'daily' ? '#e3f2fd' : '#fff3e0';
  }

  getRepeatTextColor(type: string): string {
    return type === 'daily' ? '#1565c0' : '#e65100';
  }

  editAlarm(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteAlarm(alarm: Alarm): void {
    const dialogData: DeleteAlarmDialogData = {
      time: alarm.time,
      label: alarm.label,
      repeat: alarm.repeat,
      priority: alarm.priority,
      id: alarm.id
    };

    const dialogRef = this.dialog.open(DeleteAlarmModalComponent, {
      width: '480px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alarmService.deleteAlarm(alarm.id);
      }
    });
  }

  goToHistory(): void {
    this.router.navigate(['/history']);
  }
}