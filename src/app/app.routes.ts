import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './auth/login/login.component';
import { PartidaComponent } from './partida/partida.component';
import { InformacionComponent } from './informacion/informacion.component';
import { RankingComponent } from './ranking/ranking.component';
import { AutoresComponent } from './autores/autores.component';
import { VersionesComponent } from './versiones/versiones.component';
import { PerfilUserComponent } from './perfil/perfil.module';

export const routes: Routes = [
    { path: '', component: LoginComponent },  // Ruta principal
    { path: 'perfil', component: PerfilUserComponent },
    { path: 'menu', component: MenuComponent }, // Ruta para el menú
    { path: 'login', component: LoginComponent }, // Ruta para login
    { path: 'partida', component: PartidaComponent }, // Ruta para partida
    { path: 'informacion', component: InformacionComponent }, // Ruta para información
    { path: 'ranking', component: RankingComponent }, // Ruta para ranking
    { path: 'autores', component: AutoresComponent }, // Ruta para autores
    { path: 'versiones', component: VersionesComponent }, // Ruta para versiones
    { path: 'menu', component: MenuComponent }, // Ruta para volver
    { path: '**', component: NotfoundComponent } // Ruta para no encontrados
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
