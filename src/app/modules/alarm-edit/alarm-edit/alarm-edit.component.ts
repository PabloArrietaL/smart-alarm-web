import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AlarmService } from '../../../services/alarm.service';

@Component({
  selector: 'app-alarm-edit',
  templateUrl: './alarm-edit.component.html',
  styleUrls: ['./alarm-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatToolbarModule, MatButtonModule, MatIconModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonToggleModule,
  ],
})
export class AlarmEditComponent implements OnInit {
  alarmId = 0;
  hour = '12';
  minute = '30';
  repetition = 'daily';
  notification = '10min';
  label = 'Reunión importante';
  selectedPriority = 'high';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alarmService: AlarmService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.alarmId = +idParam;
      const alarm = this.alarmService.getAlarmById(this.alarmId);
      if (alarm) {
        const timeParts = alarm.time.split(':');
        this.hour = timeParts[0];
        this.minute = timeParts[1];
        this.repetition = alarm.repeatType;
        this.notification = alarm.notification || '10min';
        this.label = alarm.label;
        this.selectedPriority = alarm.priorityLevel;
      }
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

  getPriorityLabel(level: string): string {
    switch (level) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return '';
    }
  }

  getRepeatLabel(value: string): string {
    switch (value) {
      case 'daily': return 'Diario';
      case 'weekdays': return 'L-V';
      case 'weekend': return 'Fin de semana';
      case 'custom': return 'Personalizado';
      default: return 'Una vez';
    }
  }

  save(): void {
    this.alarmService.updateAlarm(this.alarmId, {
      time: `${this.hour}:${this.minute}`,
      repeat: this.getRepeatLabel(this.repetition),
      repeatType: this.repetition as 'once' | 'daily' | 'weekdays' | 'weekend' | 'custom',
      label: this.label,
      priority: this.getPriorityLabel(this.selectedPriority),
      priorityLevel: this.selectedPriority as 'low' | 'medium' | 'high',
      notification: this.notification,
    });
    this.router.navigate(['/dashboard']);
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}