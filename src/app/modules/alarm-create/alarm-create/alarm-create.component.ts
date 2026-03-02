import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-alarm-create',
  templateUrl: './alarm-create.component.html',
  styleUrls: ['./alarm-create.component.css'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatToolbarModule, MatButtonModule, MatIconModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonToggleModule,
  ],
})
export class AlarmCreateComponent {
  hour = '07';
  minute = '00';
  repetition = 'once';
  notification = 'none';
  label = '';
  selectedPriority = 'medium';

  constructor(private router: Router, private alarmService: AlarmService) {}

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
    this.alarmService.addAlarm({
      time: `${this.hour}:${this.minute}`,
      repeat: this.getRepeatLabel(this.repetition),
      repeatType: this.repetition as 'once' | 'daily' | 'weekdays' | 'weekend' | 'custom',
      label: this.label || 'Sin etiqueta',
      priority: this.getPriorityLabel(this.selectedPriority),
      priorityLevel: this.selectedPriority as 'low' | 'medium' | 'high',
      notification: this.notification,
      active: true,
    });
    this.router.navigate(['/dashboard']);
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}