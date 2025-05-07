import { Routes } from '@angular/router';
import { registradoGuard } from './core/guardias/registrado.guard';
import { ComponenteBaseComponent } from './layout/componente-base/componente-base.component';

export const routes: Routes = [
    {
        path: '',
        component: ComponenteBaseComponent,
        children: [
            {
                path:'',
                loadComponent: () => import('./componentes/inicio/inicio.component').then(m => m.InicioComponent)
            },
            {
                path: 'actividades',
                canActivate:[registradoGuard],
                loadComponent: () => import('./componentes/actividades/actividades.component').then(m => m.ActividadesComponent)
            },
            {
                path:'lugares-interes',
                loadComponent: () => import('./componentes/sitios-interes/sitios-interes.component').then(m => m.SitiosInteresComponent)
            },
            {
                path: 'gestion',
                loadComponent: () => import('./componentes/gestion/gestion.component').then(m => m.GestionComponent),
                children: [
                    {
                        path:'asociados',
                        loadComponent: () => import('./shared/perfil/editar/editar.component').then(m => m.EditarComponent)
                    },
                    {
                        path: 'eventos',
                        loadComponent: () => import('./shared/perfil/editar/editar.component').then(m => m.EditarComponent)
                    }
                ]
            },
            {
                path: 'login',
                loadComponent: () => import('./shared/perfil/login/login.component').then(m => m.LoginComponent)

            },
            {
                path: 'registrarse',
                loadComponent: () => import('./shared/perfil/registrarse/registrarse.component').then(m => m.RegistrarseComponent)
            },
            {
                path: 'editar-perfil',
                canActivate: [registradoGuard],
                loadComponent: () => import('./shared/perfil/editar/editar.component').then(m => m.EditarComponent)
            }
        ]
    },

];
