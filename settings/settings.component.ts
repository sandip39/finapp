import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';
import { UserService } from '../_services/index';


@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  user: User = new User();
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      emailaddress: '',
      firstname: '',
      lastname: ''      
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    (<any>Object).assign(this.user, this.authService.getCurrentUser());
    // Fill the form
    //console.log(this.user);
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    //this.authService.logout();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
    .update(this.user)
    .subscribe(
      updatedUser => this.router.navigateByUrl('/profile/' + this.user._id),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateUser(values: Object) {
    (<any>Object).assign(this.user, values);
  }

}
