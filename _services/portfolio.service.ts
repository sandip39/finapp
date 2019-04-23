import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { Portfolio } from '../_models/index';
 
@Injectable()
export class PortfolioService {
    constructor(private http: Http) { }
 
    create(portfolio: Portfolio) {
        return this.http.post('/users/portfolio', portfolio, this.jwt()).map((response: Response) => response.json());
    }
 
    update(portfolio: Portfolio) {
        return this.http.put('/users/portfolio', portfolio, this.jwt()).map((response: Response) => response.json());
    }
 
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
