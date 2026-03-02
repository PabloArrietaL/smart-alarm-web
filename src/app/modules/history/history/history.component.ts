import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { AlarmService } from '../../../services/alarm.service';
import { HistoryEntry } from '../../../models/alarm';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatToolbarModule, MatButtonModule, MatIconModule,
    MatCardModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule,
  ],
})
export class HistoryComponent implements OnInit {
  historyData: HistoryEntry[] = [];
  displayedColumns: string[] = ['date', 'time', 'label', 'status'];
  currentPage = 0;
  pageSize = 10;
  totalPages = 5;

  periodFilter = 'week';
  actionFilter = 'all';
  labelFilter = 'all';

  constructor(private router: Router, private alarmService: AlarmService) {}

  ngOnInit(): void {
    this.historyData = this.alarmService.getHistory();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }
}