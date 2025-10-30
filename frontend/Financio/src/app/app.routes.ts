/*CONTIENE ARRAY DE RUTAS*/

import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Services } from './services/services';
import { Contact } from './contact/contact';
import { Login} from './Auth/login/login';
import { Dashboard } from './dashboard/dashboard';
import { Plans } from './plans/plans';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'plans', component: Plans }
];
