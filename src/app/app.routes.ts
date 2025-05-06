import { Routes } from '@angular/router';
import { registradoGuard } from './core/guardias/registrado.guard';
import { ComponenteBaseComponent } from './layout/componente-base/componente-base.component';
import { ActividadesComponent } from './componentes/actividades/actividades.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { SitiosInteresComponent } from './componentes/sitios-interes/sitios-interes.component';
import { GestionComponent } from './componentes/gestion/gestion.component';
import { AsociadosComponent } from './componentes/gestion/asociados/asociados.component';
import { EventosComponent } from './componentes/gestion/eventos/eventos.component';
import { LoginComponent } from './shared/perfil/login/login.component';
import { RegistrarseComponent } from './shared/perfil/registrarse/registrarse.component';
import { EditarComponent } from './shared/perfil/editar/editar.component';

export const routes: Routes = [
    {
        path: '',
        component: ComponenteBaseComponent,
        children: [
            {
                path:'',
                component:InicioComponent
            },
            {
                path: 'actividades',
                canActivate:[registradoGuard],
                component: ActividadesComponent
            },
            {
                path:'lugares-interes',
                component: SitiosInteresComponent
            },
            {
                path: 'gestion',
                component: GestionComponent,
                children: [
                    {
                        path:'asociados',
                        component: AsociadosComponent
                    },
                    {
                        path: 'eventos',
                        component: EventosComponent
                    }
                ]
            },
            {
                path: 'login',
                component: LoginComponent,

            },
            {
                path: 'registrarse',
                component: RegistrarseComponent
            },
            {
                path: 'editar-perfil',
                canActivate: [registradoGuard],
                component: EditarComponent
            }
        ]
    },

];
