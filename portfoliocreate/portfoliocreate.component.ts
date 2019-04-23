import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Stock} from '../_models/stock';
import {StockService} from '../_services/stock.service';
import {StockSymbolService} from '../_services/stocksymbol.service';


import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import { BsDatepickerModule } from 'ngx-bootstrap'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { User } from '../_models/index';



//@Component({ selector: 'app-data', templateUrl: './app/app.component.html' })
@Component({
    moduleId: module.id,
    templateUrl: 'portfoliocreate.component.html'
})

export class PortfolioCreateComponent implements OnInit {

    currentUser: User;
    portfolioForm: FormGroup;

    //1. Template Ref types 
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
    //2. Other Variables
    message: string;
    pname: string = '';
    stock: Stock;
    selstock: Stock;
    bsValue: Date = new Date();
    bsConfig: Partial<BsDatepickerConfig>;
    stocks: Array<Stock>;
    isNewRecord: boolean;
    statusMessage: string;

    asyncSelected: string;
    typeaheadLoading: boolean;
    typeaheadNoResults: boolean;
    dataSource: Observable<any>;
    stockSymbols: any[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' },
    {
      id: 3,
      name: 'Arizona',
      region: 'West'
    },
    { id: 4, name: 'Arkansas', region: 'South' },
    { id: 5, name: 'California', region: 'West' },
    { id: 6, name: 'Colorado', region: 'West' },
    { id: 7, name: 'Connecticut', region: 'Northeast' },
    { id: 8, name: 'Delaware', region: 'South' },
    { id: 9, name: 'Florida', region: 'South' },
    { id: 10, name: 'Georgia', region: 'South' },
    { id: 11, name: 'Hawaii', region: 'West' },
    { id: 12, name: 'Idaho', region: 'West' },
    { id: 13, name: 'Illinois', region: 'Midwest' },
    { id: 14, name: 'Indiana', region: 'Midwest' },
    { id: 15, name: 'Iowa', region: 'Midwest' },
    { id: 16, name: 'Kansas', region: 'Midwest' },
    { id: 17, name: 'Kentucky', region: 'South' },
    { id: 18, name: 'Louisiana', region: 'South' },
    { id: 19, name: 'Maine', region: 'Northeast' },
    { id: 21, name: 'Maryland', region: 'South' },
    { id: 22, name: 'Massachusetts', region: 'Northeast' },
    { id: 23, name: 'Michigan', region: 'Midwest' },
    { id: 24, name: 'Minnesota', region: 'Midwest' },
    { id: 25, name: 'Mississippi', region: 'South' },
    { id: 26, name: 'Missouri', region: 'Midwest' },
    { id: 27, name: 'Montana', region: 'West' },
    { id: 28, name: 'Nebraska', region: 'Midwest' },
    { id: 29, name: 'Nevada', region: 'West' },
    { id: 30, name: 'New Hampshire', region: 'Northeast' },
    { id: 31, name: 'New Jersey', region: 'Northeast' },
    { id: 32, name: 'New Mexico', region: 'West' },
    { id: 33, name: 'New York', region: 'Northeast' },
    { id: 34, name: 'North Dakota', region: 'Midwest' },
    { id: 35, name: 'North Carolina', region: 'South' },
    { id: 36, name: 'Ohio', region: 'Midwest' },
    { id: 37, name: 'Oklahoma', region: 'South' },
    { id: 38, name: 'Oregon', region: 'West' },
    { id: 39, name: 'Pennsylvania', region: 'Northeast' },
    { id: 40, name: 'Rhode Island', region: 'Northeast' },
    { id: 41, name: 'South Carolina', region: 'South' },
    { id: 42, name: 'South Dakota', region: 'Midwest' },
    { id: 43, name: 'Tennessee', region: 'South' },
    { id: 44, name: 'Texas', region: 'South' },
    { id: 45, name: 'Utah', region: 'West' },
    { id: 46, name: 'Vermont', region: 'Northeast' },
    { id: 47, name: 'Virginia', region: 'South' },
    { id: 48, name: 'Washington', region: 'South' },
    { id: 49, name: 'West Virginia', region: 'South' },
    { id: 50, name: 'Wisconsin', region: 'Midwest' },
    { id: 51, name: 'Wyoming', region: 'West' }
  ];

    


    //3. Constructor injected with the Service Dependency
    constructor(private serv: StockService, private symbolserv: StockSymbolService, private fb: FormBuilder) {
        this.stocks = new Array<Stock>();
        this.message = 'Portfolio';
	
	this.portfolioForm = this.fb.group({
        	'portfolioname': ['', Validators.required],
    	});
	this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue', showWeekNumbers: true });
        //this.dataSource = Observable.create((observer: any) => {
      		// Runs on every search
      	//	observer.next(this.selstock.stocksymbol);
    	//}).mergeMap((token: string) => this.getStatesAsObservable(token));

	this.dataSource = Observable.create((observer: any) => {
          this.symbolserv.getStockSymbols(this.selstock.stocksymbol).subscribe((result: any) => {
              observer.next(result);
          })
      });

    }

    getStatesAsObservable(token: string): Observable<any> {
    	let query = new RegExp(token, 'ig');
    	return Observable.of(
      		this.stockSymbols.filter((state: any) => {
        		return query.test(state.name);
      		})
    	);
    }

    changeTypeaheadLoading(e: boolean): void {
    	this.typeaheadLoading = e;
    }
 
    changeTypeaheadNoResults(e: boolean): void {
    	this.typeaheadNoResults = e;
    }
 
    typeaheadOnSelect(e: TypeaheadMatch): void {
    	console.log('Selected value: ', e.value);
    }




    //4. Load Portfolio
    ngOnInit() {
        //this.loadStock(this.portfolioname);
    }
 
    private loadStock(portfolioname) {
        this
            .serv
            .getPortfolio(portfolioname)
            .subscribe((response) => {
		this.stocks = response;
                //this.stocks = resp.json();
		//console.log("DDDDD");
                //console.log(this.stocks);    
            });
    }
    //5. Add Stock
 
    addStock() {
        this.selstock = new Stock;
	
	this.selstock._id = "";
	this.selstock.portfolioname = "";
	this.selstock.userid = "";
	this.selstock.serialnumber = 0;
	this.selstock.stocksymbol = "";
	this.selstock.numberofshares = 0;
	this.selstock.totalpurchaseprice = 0;
	this.selstock.purchasedate = "";

        this
            .stocks
            .push(this.selstock);
        this.isNewRecord = true;
	//console.log(this.stocks);
        //return this.editTemplate;
    }
 
    //6. Edit Stock
    editStock(stock: Stock) {
        this.selstock = stock;
    }
    //7. Load either Read-Only Template or EditTemplate
    loadTemplate(stock: Stock) {
        if (this.selstock && this.selstock._id == stock._id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
         
 
    }
    //8. Save Stock
    saveStock() {
	if(this.portfolioForm.get('portfolioname').value) {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.selstock.portfolioname = this.portfolioForm.value;
		this.selstock.userid = this.currentUser._id;
		//console.log(this.selstock);
        	if (this.isNewRecord) {
            		//add a new Stock
            		this.serv.addStock(this.selstock).subscribe((resp: Response) => {
                		//this.stock = resp.json(),
                    		this.statusMessage = 'Record Added Successfully.',
                    		this.loadStock(this.portfolioForm.value);
			//	console.log("KKKKK");
            		});
            		this.isNewRecord = false;
			 //console.log("LLLLL");
            		this.selstock = null;
 
        	} else {
            		//edit the record
            		this.serv.updateStock(this.selstock).subscribe((resp: Response) => {
                		this.statusMessage = 'Record Updated Successfully.',
                    		this.loadStock(this.portfolioForm.value);
            		});
            		this.selstock = null;
 
       		}
	}
	else {
                this.statusMessage = 'Please Enter Portfolio Name';
        }

		
    }
    //9. Cancel edit
    cancel() {
        this.selstock = null;
    }
    //10 Delete Stock
    deleteStock(stock: Stock) {
        this.serv.deleteStock(stock._id).subscribe((resp: Response) => {
            this.statusMessage = 'Record Deleted Successfully.',
                this.loadStock(this.portfolioForm.value);
        });
 
    }

    submitPortfolioForm() {
	//console.log(this.portfolioForm.get('portfolioname').value);
	if(this.portfolioForm.get('portfolioname').value) {
		//this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.loadStock(this.portfolioForm.value);
		this.statusMessage = 'Portfolio Loaded';
	}
	else {
		this.statusMessage = 'Please Enter Portfolio Name';
	}
	
    }    
    
    createPortfolio() {
        //console.log(this.portfolioForm.value);
    }
    
}

