import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
// biblioteca para request json
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage {
  // toast sucesso
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Seu pedido foi realizado com sucesso.',
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
  public carrinho: any;
  // ***** fim funcao alerta
  constructor(public alertController: AlertController,
    public http: Http,
    private storage: Storage,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
  ) {
    storage.get('idusuario').then((id) => {
      // url para consumir json              
      let urlr: string = "https://portaisdk.com.br/pedefacil/carrinho.php";
      let dataPostr = JSON.stringify({
        idusuario: id,
      });
      this.http.post(urlr, dataPostr)
        .map(res => res.json())
        .subscribe((data) => {
          // resposta -data- em json
          if (data == null || data == undefined) {
            // alerta caso o retorno seja invalido ou nulo
            var titulo = "Sem itens no carrinho";
            var mensagem = "Você não tem itens no carrinho. Clique em voltar e adicione itens ao carrinho";
            this.presentAlert(titulo, mensagem);
            this.carrinho = data;
          }
          else {
            // alocando os recomendados ao array padrao
            this.carrinho = data;
          }
        }, error => {
          console.log(error);
        });
    });
  }

  back() {
    this.navCtrl.navigateRoot('/realizar-pedido');
  }

  remove(item: String) {
    this.storage.get('idusuario').then((iduser) => {
      console.log(iduser)
      console.log(item)
      // url para consumir json              
      let url: string = "https://portaisdk.com.br/pedefacil/removeitem.php";
      let dataPost = JSON.stringify({
        idusuario: iduser,
        item: item,
      });
      this.http.post(url, dataPost)
        .map(res => res.json())
        .subscribe((data) => {
          // resposta -data- em json
          if (data == null || data == undefined) {
            // alerta caso o retorno seja invalido ou nulo
            var titulo = "Sem itens no carrinho";
            var mensagem = "Você não tem itens no carrinho. Clique em voltar e adicione itens ao carrinho";
            this.presentAlert(titulo, mensagem);
            this.carrinho = [];
          }
          else {
            this.carrinho = data;
          }
        }, error => {
          console.log(error);
        });
    });
  }
  finalizarpedido() {
    this.storage.get('idusuario').then((iduser) => {
      this.storage.get('idrestaurante').then((idrest) => {
        this.storage.get('nomerestaurante').then((nome) => {
          this.storage.get('photo').then((photo) => {
            // url para consumir json              
            let url: string = "https://portaisdk.com.br/pedefacil/finalizarpedido.php";
            let dataPost = JSON.stringify({
              idusuario: iduser,
              nome: nome,
              photo: photo,
              idrestaurante: idrest,
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
                  this.presentToast()
                  this.navCtrl.navigateRoot('tabs/pedidos');
                }
              }, error => {
                console.log(error);
              });
          });
        });
      });
    });
  }
}
