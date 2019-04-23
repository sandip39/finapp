import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { Stock } from '../_models/index';
 
@Injectable()
export class StockService {
    constructor(private http: Http) { }
 
    addStock(stock: Stock) {
        return this.http.post('/users/stock', stock);
    }
 
    updateStock(stock: Stock) {
        return this.http.put('/users/stock', stock);
    }

    deleteStock(id: string) {
        return this.http.delete('/users/stock/' + id);
    }

    getPortfolio(portfolioname) {
        return this.http.get('/users/stock/' +  portfolioname.portfolioname).map((response: Response) => response.json());
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
