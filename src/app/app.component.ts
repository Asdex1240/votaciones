import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router){
    
    let user = localStorage.getItem('userData');
    if (user) {
      this.router.navigateByUrl('dashboard', { replaceUrl: true })
    }
    
    
  }
}
