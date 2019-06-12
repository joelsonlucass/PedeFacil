// bibliotecas utilizadas
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from '@ionic/angular';
// biblioteca para request json
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-restaurantes',
  templateUrl: 'restaurantes.page.html',
  styleUrls: ['restaurantes.page.scss']
})
export class RestaurantesPage {
  // declarando array para resgatar input
  restaurantes: any = {}
  // funcao de alerta
  async presentAlert(titulo, mensagem) {
    const alert = await this.alertController.create({
      // titulo mensagem e na caixa de alerta
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
  // ***** fim funcao alerta
  // construtor
  constructor(public alertController: AlertController,
    public http: Http,
    private storage: Storage,
    public navCtrl: NavController
  ) {
    // url para consumir json              
    let url: string = "https://portaisdk.com.br/pedefacil/restaurantes.php";
    let dataPost = JSON.stringify({
    });
    this.http.post(url, dataPost)
      .map(res => res.json())
      .subscribe((data) => {
        // resposta -data- em json
        if (data == null || data == undefined) {
          // alerta caso o retorno seja invalido ou nulo
          var titulo = "Não foi possivel conectar com o servidor";
          var mensagem = "Serviço temporariamente indisponível. Verifique sua conexão com a internet.";
          this.presentAlert(titulo, mensagem);
        }
        else {
          // alocando os restaurantes ao array padrao
          this.restaurantes = data;
        }
      }, error => {
        console.log(error);
      });
  }
  // funcao de alerta para restaurantes em aprovacao
  public cardapio(status: String, id: String, photo: String, restaurante:String) {
    if (status == "disabled") {
      // mensagem de alerta restaurante indisponivel
      var titulo = "Restaurante em aprovação";
      var mensagem = "O restaurante está em aprovação com nosso sistema. Em breve estará disponivel.";
      this.presentAlert(titulo, mensagem);
    }
    else {
      // seta o id e a foto do restaurante e envia para o cardapio do mesmo
      this.storage.set('idrestaurante', id);
      this.storage.set('photo', photo);
      this.storage.set('nomerestaurante', restaurante);
      this.navCtrl.navigateRoot('/realizar-pedido');
    }
  }
}
