import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/index';
import { AuthenticationService } from '../../_services/index';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthenticationService
  ) {}

  currentUser: User;

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
  }
}
