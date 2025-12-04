  import { Routes } from '@angular/router';

  // Rutas públicas
  import { Home } from './home/home';
  import { Services } from './services/services';
  import { Plans } from './plans/plans';
  import { Contact } from './contact/contact';
  import { Login } from './Auth/login/login';
  import { Registrar } from './Auth/registrar/registrar';

  // Rutas protegidas
  import { MainLayout } from './main-layout/main-layout';
  import { Dashboard } from './dashboard/dashboard';
  import { Ingresos } from './components/ingresos/ingresos';
  import { Gastos } from './components/gastos/gastos';
  import { AuthGuard } from './components/guards/auth-guard';
  import { AdminGuard } from './components/guards/admin.guard';
  import { AdminUser } from './components/admin/adminUser';
import { SuperAdminGuard } from './components/guards/superadmin.guard';
import { GestorUsuarios } from './components/gestor-usuarios/gestor-usuarios';



  export const routes: Routes = [
    // 🌐 Rutas públicas
    { path: '', component: Home },           // Inicio público
    { path: 'services', component: Services },
    { path: 'plans', component: Plans },
    { path: 'contact', component: Contact },
    { path: 'login', component: Login },
    { path: 'registrar', component: Registrar },
    

    // 🔒 Rutas protegidas por login dentro del MainLayout
    {
      path: '',
      component: MainLayout,
      canActivate: [AuthGuard],
      children: [
        { path: 'dashboard', component: Dashboard },
        { path: 'ingresos', component: Ingresos },
        { path: 'gastos', component: Gastos },
        
        
        { 
          path: 'movimientos', 
          loadComponent: () => import('./components/movimientos/movimientos').then(m => m.Movimientos) 
        },
        { 
          path: 'caja', 
          loadComponent: () => import('./components/caja/caja').then(c => c.Caja) 
        },
        { 
          path: 'metas', 
          loadComponent: () => import('./components/metas/metas').then(m => m.Metas) 
        },

        { 
        path: 'exportar', 
        loadComponent: () => import('./exportar/exportar-datos').then(m => m.ExportarDatos) 
      },
        { path: 'gestor-usuarios', component: GestorUsuarios, canActivate: [SuperAdminGuard] }, //solo superadmin
        { path: 'usuarios', component: AdminUser, canActivate: [AdminGuard] }, // solo admin
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // redirige a dashboard por defecto
      ]
    },

    // ❌ Catch-all global
    { path: '**', redirectTo: '' } // redirige al inicio público
  ];
