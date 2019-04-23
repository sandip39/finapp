import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ChangepwComponent } from './changepw/index';
import { ResetpwComponent } from './resetpw/index';
import { SettingsComponent } from './settings/index';

import { AuthGuard } from './_guards/index';
import { PortfolioCreateComponent } from './portfoliocreate/index';
import { ViewScreenComponent } from './viewscreen/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'changepw', component: ChangepwComponent },
    { path: 'resetpw', component: ResetpwComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'portfolio', component: PortfolioCreateComponent },
    { path: 'viewscreen', component: ViewScreenComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
