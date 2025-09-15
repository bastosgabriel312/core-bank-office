import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { AgencyPage } from './features/agencies/pages/agency/agency.page';
import { UserPage } from './features/users/pages/user/user.page';
import { authGuard } from './core/guards/auth-guard';
import { SearchAgenciesPage } from './features/agencies/pages/search-agencies/search-agencies.page';


export const routes: Routes = [
  { path: 'login', component: LoginPage, title: 'Login' },
  { path: 'public/agencies', component: SearchAgenciesPage, title: 'Agências' },
  { path: 'home', component: HomePage, title: 'Home', canMatch: [authGuard] },
  { path: 'agencies', component: AgencyPage, title: 'Agências', canMatch: [authGuard]  },
  { path: 'clients', component: UserPage, title: 'Clientes',  canMatch: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
