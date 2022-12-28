import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { getCurrentUser } from '@shared/utils/utils.functions';

@Component({
  selector: 'smart-dropdown-user',
  templateUrl: './dropdown-user.component.html',
})
export class DropdownUserComponent {

  user = {
    app: 'SmartChef',
    name: 'Mr. Lawrance',
    email: 'lawrance@tic.com',
    avatar: 'avatar-admin-3.png',
  };
  constructor(private router: Router, private authService: AuthService, private viewContainerRef: ViewContainerRef) {
    this.user = getCurrentUser();
    this.user.name = 'Mr. Lawrance';
    this.user.avatar = 'avatar-admin-3.png';
    this.user.app = 'SmartChef';
  }
  getParentComponent(): MainComponent {
    return this.viewContainerRef['_data'].componentView.component.viewContainerRef['_view'].component
      .viewContainerRef['_data'].componentView.component.viewContainerRef['_view'].component
  }
  logout() {
    this.authService.logout()
    this.router.navigateByUrl('auth/login');
    // this.getParentComponent().isLoggedIn = false;

  }

}
