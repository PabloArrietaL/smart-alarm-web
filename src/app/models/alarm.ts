export interface Alarm {
  id: number;
  time: string;
  repeat: string;
  repeatType: 'once' | 'daily' | 'weekdays' | 'weekend' | 'custom';
  label: string;
  priority: string;
  priorityLevel: 'low' | 'medium' | 'high';
  notification: string;
  active: boolean;
}

export interface HistoryEntry {
  date: string;
  time: string;
  label: string;
  status: 'triggered' | 'snoozed' | 'edited' | 'deleted' | 'created';
  statusText: string;
  color: string;
}
