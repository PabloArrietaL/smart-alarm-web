import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { AlarmTableComponent } from '../alarm-table/alarm-table.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, StatsCardsComponent, AlarmTableComponent],
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }

  logout(): void {
    this.authService.logout();
  }
}