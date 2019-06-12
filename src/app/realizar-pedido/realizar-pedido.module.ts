import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RealizarPedidoPage } from './realizar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: RealizarPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RealizarPedidoPage]
})
export class RealizarPedidoPageModule {}
