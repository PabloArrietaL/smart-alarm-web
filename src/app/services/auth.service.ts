import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'alarm_app_auth';
  private isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify({
        authenticated: true,
        timestamp: Date.now()
      }));
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.AUTH_KEY);
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) return false;
    const data = localStorage.getItem(this.AUTH_KEY);
    if (!data) return false;
    try {
      const parsed = JSON.parse(data);
      return parsed.authenticated === true;
    } catch {
      return false;
    }
  }
}