// bibliotecas utilizadas
import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
// biblioteca para request json
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
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
  cadastrodata: any = {}
  // construtor
  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
    public http: Http, ) { }
  // funcao de voltar
  back() {
    this.navCtrl.navigateRoot('/login');
  }
  // funcao de cadastro
  cadastrar() {
    if (this.cadastrodata.nome != undefined && this.cadastrodata.telefone != undefined && this.cadastrodata.cpf != undefined && this.cadastrodata.email != undefined && this.cadastrodata.senha != undefined && this.cadastrodata.confirmsenha != undefined) {
      if (this.cadastrodata.senha == this.cadastrodata.confirmsenha) {
        // url para consumir json
        let url: string = "https://portaisdk.com.br/pedefacil/cadastro.php";
        let dataPost = JSON.stringify({
          // argumentos necessarios para o cadastro
          nome: this.cadastrodata.nome,
          telefone: this.cadastrodata.telefone,
          cpf: this.cadastrodata.cpf,
          email: this.cadastrodata.email,
          pass: this.cadastrodata.senha,
        });
        this.http.post(url, dataPost)
          .map(res => res.json())
          .subscribe((data) => {
            // resposta -data- em json
            if (data == null || data == undefined) {
              // gerando alerta para erro
              var titulo = "Não foi possivel cadastrar";
              var mensagem = "Não foi possivel cadastra. Verifique os dados e tente novamente";
              this.presentAlert(titulo, mensagem);
            }
            else {
              //console.log(data)
              for (let user of data) {

                // redireciona para o slider de apresentacao
                this.navCtrl.navigateRoot('/slider');
                console.log('sucesso')
                // seta as variaveis para o storage
                this.storage.set('idusuario', user.idusuario);
                this.storage.set('nomeusuario', this.cadastrodata.nome);
                this.storage.set('cpf', this.cadastrodata.cpf);
                this.storage.set('telefone', this.cadastrodata.telefone);
                this.storage.set('email', this.cadastrodata.email);

                //console.log(user.Resposta)
              }
            }
          }, error => {
            console.log(error);
          });
      }
      // senhas não conferem
      else {
        // mensagem de alerta para senhas diferentes
        var titulo = "Senha Inválida";
        var mensagem = "As senhas não conferem. Verifique e tente novamente";
        this.presentAlert(titulo, mensagem);
      }
    }
    // campos vazio
    else {
      // alerta para campos vazios
      var titulo = "Campo Vazio";
      var mensagem = "Todos os campos devem ser preenchidos. Verifique e tente novamente";
      this.presentAlert(titulo, mensagem);
    }
  }
  // ***** fim cadastro
}
