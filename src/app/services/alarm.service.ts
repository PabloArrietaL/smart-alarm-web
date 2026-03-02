import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alarm, HistoryEntry } from '../models/alarm';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  private alarms: Alarm[] = [
    { id: 0, time: '07:00', repeat: 'Diario', repeatType: 'daily', label: 'Rutina matutina', priority: 'Media', priorityLevel: 'medium', notification: 'none', active: true },
    { id: 1, time: '09:30', repeat: 'L-V', repeatType: 'weekdays', label: 'Reunión de equipo', priority: 'Alta', priorityLevel: 'high', notification: '10min', active: true },
    { id: 2, time: '12:30', repeat: 'Diario', repeatType: 'daily', label: 'Almuerzo', priority: 'Baja', priorityLevel: 'low', notification: 'none', active: true },
    { id: 3, time: '18:00', repeat: 'L-V', repeatType: 'weekdays', label: 'Ejercicio', priority: 'Media', priorityLevel: 'medium', notification: '5min', active: true },
    { id: 4, time: '22:00', repeat: 'Diario', repeatType: 'daily', label: 'Dormir', priority: 'Alta', priorityLevel: 'high', notification: '15min', active: true },
  ];

  private alarmsSubject = new BehaviorSubject<Alarm[]>(this.alarms);
  alarms$: Observable<Alarm[]> = this.alarmsSubject.asObservable();

  private history: HistoryEntry[] = [
    { date: '05/02/2026', time: '07:00', label: 'Rutina matutina', status: 'triggered', statusText: 'Disparada', color: '#43a047' },
    { date: '05/02/2026', time: '07:05', label: 'Rutina matutina', status: 'snoozed', statusText: 'Pospuesta', color: '#fb8c00' },
    { date: '04/02/2026', time: '22:00', label: 'Dormir', status: 'triggered', statusText: 'Disparada', color: '#43a047' },
    { date: '04/02/2026', time: '18:00', label: 'Ejercicio', status: 'triggered', statusText: 'Disparada', color: '#43a047' },
    { date: '04/02/2026', time: '15:30', label: 'Reunión importante', status: 'edited', statusText: 'Editada', color: '#0288d1' },
    { date: '04/02/2026', time: '12:30', label: 'Almuerzo', status: 'triggered', statusText: 'Disparada', color: '#43a047' },
    { date: '04/02/2026', time: '09:30', label: 'Reunión de equipo', status: 'triggered', statusText: 'Disparada', color: '#43a047' },
    { date: '04/02/2026', time: '07:00', label: 'Rutina matutina', status: 'triggered', statusText: 'Disparada', color: '#43a047' },
    { date: '03/02/2026', time: '20:00', label: 'Película nocturna', status: 'deleted', statusText: 'Eliminada', color: '#e53935' },
    { date: '03/02/2026', time: '14:00', label: 'Medicación', status: 'created', statusText: 'Creada', color: '#1976d2' },
  ];

  getAlarms(): Alarm[] {
    return [...this.alarms];
  }

  getAlarmById(id: number): Alarm | undefined {
    return this.alarms.find(a => a.id === id);
  }

  addAlarm(alarm: Omit<Alarm, 'id'>): void {
    const newAlarm: Alarm = { ...alarm, id: this.alarms.length };
    this.alarms = [...this.alarms, newAlarm];
    this.alarmsSubject.next(this.alarms);
  }

  updateAlarm(id: number, updates: Partial<Alarm>): void {
    this.alarms = this.alarms.map(a => a.id === id ? { ...a, ...updates } : a);
    this.alarmsSubject.next(this.alarms);
  }

  deleteAlarm(id: number): void {
    this.alarms = this.alarms.filter(a => a.id !== id);
    this.alarmsSubject.next(this.alarms);
  }

  getHistory(): HistoryEntry[] {
    return [...this.history];
  }

  getActiveCount(): number {
    return this.alarms.filter(a => a.active).length;
  }

  getTodayCount(): number {
    return 3;
  }

  getHighPriorityCount(): number {
    return this.alarms.filter(a => a.priorityLevel === 'high').length;
  }
}
