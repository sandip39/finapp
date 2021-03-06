﻿import { Component } from '@angular/core';

import { AuthenticationService } from './_services/index';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent { 
 constructor (
    private authService: AuthenticationService
  ) {}
 ngOnInit() {
    this.authService.populate();
  }

}
