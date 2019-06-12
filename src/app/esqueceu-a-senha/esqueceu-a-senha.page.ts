// bibliotecas utilizadas
import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
// biblioteca para request json
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-esqueceu-a-senha',
  templateUrl: './esqueceu-a-senha.page.html',
  styleUrls: ['./esqueceu-a-senha.page.scss'],
})
export class EsqueceuASenhaPage {
  // toast sucesso
  async presentToast() {
    const toast = await this.toastCtrl.create({
      // mensagem de sucesso e duracao do toast
      message: 'Um email para redefinição de sua senha foi enviado. Verifique sua caixa de entrada ou lixo eletronico.',
      duration: 2000
    });
    toast.present();
  }
  // ***** fim toast sucesso
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
  emaildata: any = {}
  // construtor
  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public http: Http, ) { }
  // funcao de voltar
  back() {
    this.navCtrl.navigateRoot('/login');
  }
  // funcao de enviar email para o usuario com a senha
  enviar() {
    if (this.emaildata.email != undefined) {
      // url para consumir json
      let url: string = "https://portaisdk.com.br/pedefacil/esqueceusenha.php";
      let dataPost = JSON.stringify({
        email: this.emaildata.email,
      });
      this.http.post(url, dataPost)
        .map(res => res.json())
        .subscribe((data) => {
          // resposta -data- em json
          if (data == null || data == undefined) {
            // gerando alerta para erro
            var titulo = "Email não cadastrado";
            var mensagem = "Email não cadastrado. Verifique e tente novamente";
            this.presentAlert(titulo, mensagem);
          }
          else {
              // resposta do json
              if (data.Resposta == "Sucesso") {
                // toast para sucesso
                this.presentToast()
                this.navCtrl.navigateRoot('/login');
              }
              else {
                // toast para erro
                this.presentToastError()
                this.navCtrl.navigateRoot('/login');
              }
              //console.log(user.Resposta)
          }
        }, error => {
          console.log(error);
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
  // ***** fim esqueceu a senha
}
