import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [

    {path: '',component:LoginComponent},
    {path: 'Menu',component:MenuComponent},
    {path: '**', component:NotfoundComponent}
];
