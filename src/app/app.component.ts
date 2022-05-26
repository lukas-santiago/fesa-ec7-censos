import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fesa-ec7-censos-web';
  showFiller = false;
  authenticated: boolean = false;
  user!: User;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    AuthenticationService.authenticated.subscribe(data => {
      this.authenticated = data
      if (!this.authenticated) {
        router.navigateByUrl('login')
      } else {
        this.user = AuthenticationService.user
      }
    })

  }

  logout() {
    this.authenticationService.signout().subscribe(data => {
      this.router.navigateByUrl('')
    })
    this.router.navigateByUrl('')
  }
}
