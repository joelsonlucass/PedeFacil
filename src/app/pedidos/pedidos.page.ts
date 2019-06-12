// bibliotecas utilizadas
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
// biblioteca para request json
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-pedidos',
  templateUrl: 'pedidos.page.html',
  styleUrls: ['pedidos.page.scss']
})
export class PedidosPage {
  // declarando array para resgatar input
  public pedidos: any;
  // toast sucesso
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Seu pedido foi deletado com sucesso.',
      duration: 2000
    });
    toast.present();
  }
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
  constructor(private storage: Storage,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    public http: Http, ) {
    storage.get('idusuario').then((id) => {
      // url para consumir json              
      let url: string = "https://portaisdk.com.br/pedefacil/meuspedidos.php";
      let dataPost = JSON.stringify({
        idusuario: id,
      });
      this.http.post(url, dataPost)
        .map(res => res.json())
        .subscribe((data) => {
          // resposta -data- em json
          if (data == null || data == undefined) {
            // alerta caso o retorno seja invalido ou nulo
            var titulo = "Você não tem pedidos realizados";
            var mensagem = "Você não tem pedidos realizados. Faça agora seu pedido e participe das promoções.";
            this.presentAlert(titulo, mensagem);
            this.pedidos = [];
          }
          else {
            // alocando os restaurantes ao array padrao
            this.pedidos = data;
          }
        }, error => {
          console.log(error);
        });
    });
  }
  // funcao deletar
  deletar(item: String,hora:String) {
    this.storage.get('idusuario').then((id) => {
      // url para consumir json              
      let url: string = "https://portaisdk.com.br/pedefacil/deletarpedido.php";
      let dataPost = JSON.stringify({
        idusuario: id,
        descricao: item,
        hora: hora,
      });
      this.http.post(url, dataPost)
        .map(res => res.json())
        .subscribe((data) => {
          // resposta -data- em json
          if (data == null || data == undefined) {
            // alerta caso o retorno seja invalido ou nulo
            var titulo = "Você não tem pedidos realizados";
            var mensagem = "Você não tem pedidos realizados. Faça agora seu pedido e participe das promoções.";
            this.presentAlert(titulo, mensagem);
            this.pedidos = [];
          }
          else {
            // alocando os restaurantes ao array padrao
            this.pedidos = data;
          }
        }, error => {
          console.log(error);
        });
    });
    this.presentToast()
  }
}
/*
this.pedidos = [
      {
        nome: 'Restaurante Ponto do Sabor',
        desc: '2x Massa a Bolonhesa',
        hora: '10:45',
        dia: '10 de Maio',
      },
      {
        nome: 'Restaurante Ponto do Sabor',
        desc: '1x Fricassê de Frango',
        hora: '11:00',
        dia: '12 de Maio',
      },
      {
        nome: 'Restaurante Ponto do Sabor',
        desc: '2x Fricassê de Frango',
        hora: '11:02',
        dia: '17 de Maio',
      },
      {
        nome: 'Restaurante Ponto do Sabor',
        desc: '3x Bife a Parmegiana',
        hora: '10:49',
        dia: '18 de Maio',
      },
      {
        nome: 'Restaurante Ponto do Sabor',
        desc: '5x Massa a Bolonhesa',
        hora: '10:54',
        dia: '22 de Maio',
      },
    ]*/