import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AlarmService } from '../../../services/alarm.service';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-stats-cards',
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
})
export class StatsCardsComponent implements OnInit {
  stats: StatCard[] = [];

  constructor(private alarmService: AlarmService) {}

  ngOnInit(): void {
    this.stats = [
      { label: 'Alarmas Activas', value: String(this.alarmService.getActiveCount()), icon: 'access_alarm', color: '#1976d2' },
      { label: 'Alarmas Hoy', value: String(this.alarmService.getTodayCount()), icon: 'trending_up', color: '#0288d1' },
      { label: 'Prioridad Alta', value: String(this.alarmService.getHighPriorityCount()), icon: 'priority_high', color: '#e53935' },
    ];
  }
}