import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [

      {
        path: 'perfil/:rut',
        loadChildren:() => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'administrar',
        loadChildren:() => import('../home/home.module').then(m => m.HomePageModule)
      },
      
      {
        path: 'escanear/:rut',
        loadChildren:() => import('../escanear/escanear.module').then(m => m.EscanearPageModule)
      },  
    
      {
        path: 'asistencia',
        loadChildren:() => import('../asistencia/asistencia.module').then(m => m.AsistenciaPageModule)
      },
    
      {
        path: 'clases/:rut',
        loadChildren:() => import('../clases/clases.module').then(m => m.ClasesPageModule)
      },
    
      {
        path: 'asignatura',
        loadChildren:() => import('../asignatura/asignatura.module').then(m => m.AsignaturaPageModule)
      }      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
