import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'splash_screen',
        children: [
          {
            path: '',
            loadChildren: '../splash_screen/splash_screen.module#SplashScreenPageModule'
          }
        ]
      },
      {
        path: 'restaurantes',
        children: [
          {
            path: '',
            loadChildren: '../restaurantes/restaurantes.module#RestaurantesPageModule'
          }
        ]
      },
      {
        path: 'pedidos',
        children: [
          {
            path: '',
            loadChildren: '../pedidos/pedidos.module#PedidosPageModule'
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: '../perfil/perfil.module#PerfilPageModule'
          }
        ]
      },
      {
        path: 'ajuda',
        children: [
          {
            path: '',
            loadChildren: '../ajuda/ajuda.module#AjudaPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/splash_screen',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/splash_screen',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
