import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { TypeaheadModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, JwtService, ApiService, StockService, StockSymbolService,ViewService  } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ChangepwComponent } from './changepw/index';
import { ValidateequalDirective } from './_directives/validateequal.directive';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { ResetpwComponent } from './resetpw/resetpw.component';
import { SettingsComponent } from  './settings/index';
import { PortfolioCreateComponent } from  './portfoliocreate/index';
import { ViewScreenComponent } from  './viewscreen/index';
import {
  FooterComponent,
  HeaderComponent,
  SharedModule
 } from './shared';

import { jqxBarGaugeComponent } from '../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxbargauge';
import { jqxMenuComponent } from '../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { jqxCheckBoxComponent } from '../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxcheckbox';
import { jqxGridComponent } from '../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxDockPanelComponent } from '../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdockpanel';
import { jqxComboBoxComponent } from '../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { jqxTooltipComponent } from '../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxtooltip';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
	PasswordStrengthBarModule,
	SharedModule,
	BsDatepickerModule.forRoot(),
	TypeaheadModule.forRoot(),
	DateTimePickerModule,
	BrowserAnimationsModule,
        routing
    ],
    declarations: [
        AppComponent,
	FooterComponent,
	jqxBarGaugeComponent, 
	jqxMenuComponent, 
	jqxCheckBoxComponent, 
	jqxGridComponent,
	jqxDockPanelComponent,
 	jqxComboBoxComponent,	
	jqxTooltipComponent,
	HeaderComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ChangepwComponent,
        ValidateequalDirective,
        ResetpwComponent,
	SettingsComponent,
	ViewScreenComponent,
	PortfolioCreateComponent 
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
	ApiService,
	JwtService,
        AlertService,
        AuthenticationService,
        UserService,
	StockService,
	ViewService,
	StockSymbolService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
