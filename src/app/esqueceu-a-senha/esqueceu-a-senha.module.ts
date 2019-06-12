import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EsqueceuASenhaPage } from './esqueceu-a-senha.page';

const routes: Routes = [
  {
    path: '',
    component: EsqueceuASenhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EsqueceuASenhaPage]
})
export class EsqueceuASenhaPageModule {}
