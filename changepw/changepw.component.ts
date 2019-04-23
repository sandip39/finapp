//import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index';

import { AlertService, UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.css'],
})


export class ChangepwComponent {

    currentUser: User;
    users: User[] = [];
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
	}

    cpass() {
        this.loading = true;
	this.currentUser.password = this.model.password;
        this.userService.update(this.currentUser)
            .subscribe(
                data => {
			console.log(this.currentUser);
                    this.alertService.success('Password changed', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
