// bibliotecas utilizadas
import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage {

  // construtor
  constructor(public navCtrl: NavController,) { }
  // redireciona para tela principal de restaurantes
  start() {
    this.navCtrl.navigateRoot('tabs/restaurantes');
  }

}
