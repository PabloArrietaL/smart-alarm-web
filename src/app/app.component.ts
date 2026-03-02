import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [':host { display: block; }'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {}
