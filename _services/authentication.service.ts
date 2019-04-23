import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../_models/index';

@Injectable()
export class AuthenticationService {
    currentUser1: User;
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    /*private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);*/
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
	private http: Http,
	private router: Router,
	private jwtService: JwtService,
	private apiService: ApiService
     ) { }

    login(username: string, password: string) {
        return this.http.post('/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {

                    		/*store user details and jwt token in local storage to keep user logged in between page refreshes*/
                    		localStorage.setItem('currentUser', JSON.stringify(user));
				this.setAuth(user);
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        
	localStorage.removeItem('currentUser');
	// Remove JWT from localstorage
        this.jwtService.destroyToken();
	this.currentUserSubject.next(new User());
	this.isAuthenticatedSubject.next(false);
    }

    setAuth(user: User) {
	// Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    populate() {
	// If JWT detected, attempt to get & store user's info
    	if (this.jwtService.getToken()) {
		this.currentUser1 = JSON.parse(localStorage.getItem('currentUser'));
		//console.log(this.currentUser1);
		//console.log(this.jwtService.getToken());
		this.apiService.get('/users/'+this.currentUser1._id)
      		.subscribe(
        		data => this.setAuth(this.currentUser1),
        		err => this.logout()
      		);
    	} else {
      		// Remove any potential remnants of previous auth states
      		this.logout();
    	}	
    }
  
    purgeAuth() {
    	// Remove JWT from localstorage
    	this.jwtService.destroyToken();
    	// Set current user to an empty object
    	this.currentUserSubject.next(new User());
    	// Set auth status to false
    	this.isAuthenticatedSubject.next(false);
    }

}
