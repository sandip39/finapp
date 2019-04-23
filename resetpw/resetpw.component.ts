import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'resetpw.component.html'
})

export class ResetpwComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    resetpw() {
        this.loading = true;
        this.userService.resetpw(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Reset successful', true);
                    //this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    //this.loading = false;
                });
    }
}

