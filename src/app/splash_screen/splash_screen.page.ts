// bibliotecas utilizadas
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-splash_screen',
  templateUrl: 'splash_screen.page.html',
  styleUrls: ['splash_screen.page.scss']
})
export class SplashScreenPage {
  // construtor
  constructor(public navCtrl: NavController,
    private routerLogin: Router,
    private storage: Storage,
  ) {
    // resgatando a string do storage local
    storage.get('idusuario').then((id) => {
      if (id > 0) {
        // redireciona para a principal restaurantes caso esteja logado
        this.navCtrl.navigateRoot('/tabs/restaurantes');
      }
      else {
        // redireciona para o login caso esteja deslogado
        this.navCtrl.navigateRoot('/login');
      }
    });
  }
  // ***** fim splash screen
}
