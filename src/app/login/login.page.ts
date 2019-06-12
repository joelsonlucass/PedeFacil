// bibliotecas utilizadas
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from '@ionic/angular';
// biblioteca para request json
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

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
  logindata: any = {}
  // construtor
  constructor(private routerRestaurantes: Router,
    public navCtrl: NavController,
    public alertController: AlertController,
    public http: Http,
    private storage: Storage
  ) { }
  // redireciona para esqueceu a senha
  esqueceusenha() {
    this.navCtrl.navigateRoot('/esqueceu-a-senha');
  }
  // redireciona para o cadastro
  cadastro() {
    this.navCtrl.navigateRoot('/cadastro');
  }
  // funcao de login
  login() {
    if (this.logindata.email != undefined && this.logindata.senha != undefined) {
      // url para consumir json
      let url: string = "https://portaisdk.com.br/pedefacil/login.php";
      let dataPost = JSON.stringify({
        email: this.logindata.email,
        pass: this.logindata.senha
      });
      this.http.post(url, dataPost)
        .map(res => res.json())
        .subscribe((data) => {
          // resposta -data- em json
          if (data == null || data == undefined) {
            // gerando alerta para erro
            var titulo = "Email ou senha inválidos";
            var mensagem = "Email ou senha estão inválidos. Verifique e tente novamente";
            this.presentAlert(titulo, mensagem);
          }
          else {
            //console.log(data)
            for (let user of data) {
              //console.log(user.idusuario)
              // set id usuario no storage local
              this.storage.set('idusuario', user.idusuario);
              this.storage.set('nomeusuario', user.nome);
              this.storage.set('cpf', user.cpf);
              this.storage.set('telefone', user.telefone);
              this.storage.set('email', user.email);
            }
            this.navCtrl.navigateRoot('/tabs/restaurantes');
          }
        }, error => {
          console.log(error);
        });
    }
    // campos vazios
    else {
      var titulo = "Campo Vazio";
      var mensagem = "Todos os campos devem ser preenchidos. Verifique e tente novamente";
      this.presentAlert(titulo, mensagem);
    }
  }
  // ***** fim login
}
