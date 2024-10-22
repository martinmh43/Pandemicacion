import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {path: '',component:MenuComponent},
    {path: '**', component:NotfoundComponent}
];
