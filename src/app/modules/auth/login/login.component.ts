import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}