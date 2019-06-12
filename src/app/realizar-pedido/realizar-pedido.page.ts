// bibliotecas utilizadas
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { NavController, NavParams } from '@ionic/angular';
// biblioteca para request json
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.page.html',
  styleUrls: ['./realizar-pedido.page.scss'],
})
export class RealizarPedidoPage {
  // toast de sucesso
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Item adicionado ao carrinho.',
      duration: 2000
    });
    toast.present();
  }
  // toast erro
  async presentToastError() {
    const toast = await this.toastCtrl.create({
      // mensagem de erro e duracao do toast
      message: 'Não foi possivel conectar ao servidor. Verifique sua internet e tente novamente.',
      duration: 2000
    });
    toast.present();
  }
  // ***** fim toast erro
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
  // declarando array para resgatar input
  public cardapios: any;
  public recomendados: any;
  public img: any;
  // construtor
  constructor(public alertController: AlertController,
    public http: Http,
    private storage: Storage,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
  ) {
    // setando a foto do restaurante
    storage.get('photo').then((photo) => {
      this.img = [
        { photo: photo }];
    });
    storage.get('idrestaurante').then((id) => {
      console.log(id)
      // url para consumir json              
      let urlr: string = "https://portaisdk.com.br/pedefacil/recomendados.php";
      let dataPostr = JSON.stringify({
        idrestaurante: id,
      });
      this.http.post(urlr, dataPostr)
        .map(res => res.json())
        .subscribe((data) => {
          // resposta -data- em json
          if (data == null || data == undefined) {
            // alerta caso o retorno seja invalido ou nulo
            var titulo = "Não há recomendações";
            var mensagem = "No momento não há recomendações pois ainda não houve pedidos no restaurante.";
            this.presentAlert(titulo, mensagem);
          }
          else {
            // alocando os recomendados ao array padrao
            this.recomendados = data;
          }
        }, error => {
          console.log(error);
        });
      // url para consumir json              
      let url: string = "https://portaisdk.com.br/pedefacil/cardapio.php";
      let dataPost = JSON.stringify({
        idrestaurante: id,
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
            this.cardapios = data;
          }
        }, error => {
          console.log(error);
        });
    });
  }
  add(item: String) {
    this.storage.get('idusuario').then((iduser) => {
      console.log(iduser)
      console.log(item)
      // url para consumir json              
      let url: string = "https://portaisdk.com.br/pedefacil/additem.php";
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
            var titulo = "Não foi possivel conectar com o servidor";
            var mensagem = "Serviço temporariamente indisponível. Verifique sua conexão com a internet.";
            this.presentAlert(titulo, mensagem);
          }
          else {
            this.presentToast()
          }
        }, error => {
          console.log(error);
        });
    });
  }
  // redireciona para o carrinho 
  carrinho() {
    this.navCtrl.navigateRoot('/carrinho');
  }
  // funcao voltar
  back() {
    this.navCtrl.navigateRoot('tabs/restaurantes');
  }
}
/*this.cardapios = [
      {
        tipo: 'Pratos Quentes',
        nome: 'Massa a Bolonhesa',
        desc: 'Massa italiana com molho a bolonhesa',
        qtd: '0',
      },
      {
        tipo: '',
        nome: 'Bife à Milanesa',
        desc: 'Com salada de batata ou creme de espinafre e fritas',
        qtd: '0',
      },
      {
        tipo: '',
        nome: 'Bife à Parmegiana',
        desc: 'Com arroz e fritas',
        qtd: '0',
      },
      {
        tipo: '',
        nome: 'Salmão Grelhado',
        desc: 'Com mix de batatas e aioli',
        qtd: '0',
      },
      {
        tipo: '',
        nome: 'Beringela a Parmegiana',
        desc: 'Com mussarela de bufala e fresh salad',
        qtd: '0',
      },
      {
        tipo: 'Bebidas',
        nome: 'Refrigerante',
        desc: 'Cola, Fanta ou Guaraná',
        qtd: '0',
      },
      {
        tipo: '',
        nome: 'Suco',
        desc: 'Suco de laranja natural',
        qtd: '0',
      },
      {
        tipo: 'Sobremesas',
        nome: 'Sorvete de Creme',
        desc: 'Sabor baunilha',
        qtd: '0',
      },
      {
        tipo: '',
        nome: 'Mousse',
        desc: 'Sabor Maracujá',
        qtd: '0',
      },
    ]
    storage.get('idrestaurante').then((id) => {
    });*/