// bibliotecas utilizadas
import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
// biblioteca para request json
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage {
  // declarando array para resgatar input
  editardata: any = {};
  public perfil: any;
  // toast de sucesso
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sua conta foi alterada com sucesso.',
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
  // construtor
  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private storage: Storage,
    public http: Http, ) {
      storage.get('nomeusuario').then((nomeusuario) => {
        this.perfil = [
          {
            nome: nomeusuario
          },
        ]
      });
    }
  // funcao voltar
  back() {
    this.navCtrl.navigateRoot('tabs/perfil');
  }
  //funcao editar
  editar() {
    if (this.editardata.email != undefined && this.editardata.senha != undefined && this.editardata.telefone != undefined) {
      this.storage.get('idusuario').then((iduser) => {
        console.log(iduser)
        // url para consumir json
        let url: string = "https://portaisdk.com.br/pedefacil/editarusuario.php";
        let dataPost = JSON.stringify({
          telefone: this.editardata.telefone,
          email: this.editardata.email,
          pass: this.editardata.senha,
          idusuario: iduser,
        });
        this.http.post(url, dataPost)
          .map(res => res.json())
          .subscribe((data) => {
            // resposta -data- em json
            if (data == null || data == undefined) {
              // gerando alerta para erro
              var titulo = "Não foi possivel conectar ao servidor";
              var mensagem = "Não foi possivel conectar ao servidor. Verifique sua conexão e tente novamente";
              this.presentAlert(titulo, mensagem);
            }
            else {
              // resposta do json
              for (let user of data) {
                
                if (user.idusuario != "") {
                  // toast para sucesso
                  this.storage.set('nomeusuario', user.nome);
                  this.storage.set('cpf', user.cpf);
                  this.storage.set('telefone', user.telefone);
                  this.storage.set('email', user.email);
                  this.storage.set('idusuario', user.idusuario);
                  this.presentToast()
                  this.navCtrl.navigateRoot('tabs/perfil');
                }
                else {
                  // toast para erro
                  this.presentToastError()
                  this.navCtrl.navigateRoot('tabs/perfil');
                }
              }
            }
          }, error => {
            //console.log(error);
            console.log("erro")
          });
      });
    }
    // campos vazios
    else {
      // alerta para campos vazios
      var titulo = "Campo Vazio";
      var mensagem = "Todos os campos devem ser preenchidos. Verifique e tente novamente";
      this.presentAlert(titulo, mensagem);
    }
  }

}
