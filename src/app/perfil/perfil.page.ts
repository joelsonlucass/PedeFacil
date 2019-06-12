// bibliotecas utilizadas
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  // declarando array para resgatar input
  public perfil: any;
  // toast error 
  async presentToast() {
    const toast = await this.toastCtrl.create({
      // mensagem e tempo de duracao do toast
      message: 'Não foi possivel conectar com o servidor.',
      duration: 2000
    });
    toast.present();
  }
  // toast sucesso
  async presentToastDeleteAcount() {
    const toast = await this.toastCtrl.create({
      // mensagem e tempo de duracao do toast
      message: 'Sua conta foi deletada com sucesso. Vamos trabalhar para melhorar o APP e ter você de volta conosco.',
      duration: 2000
    });
    toast.present();
  }
  // construtor
  constructor(private storage: Storage,
    public navCtrl: NavController,
    private toastCtrl: ToastController, ) {
    // resgata as informacoes do usuario do storage local 
    // *** UTILIZAMOS O STORAGE LOCAL PARA NAO CONSUMIR MUITAS VEZES O BANCO E USAR INTERNET
    storage.get('nomeusuario').then((nomeusuario) => {
      storage.get('cpf').then((cpfusuario) => {
        storage.get('telefone').then((telefoneusuario) => {
          storage.get('email').then((emailusuario) => {
            // caso as variaveis estejam conformes
            if (nomeusuario != null || nomeusuario != undefined || nomeusuario != "") {
              // seta a variavel no array json
              this.perfil = [
                {
                  nome: nomeusuario,
                  cpf: cpfusuario,
                  telefone: telefoneusuario,
                  email: emailusuario
                },
              ]
            }
            else {
              // usuario nao logado, mostra um toast com erro e envia para tela de login
              this.presentToast()
              this.navCtrl.navigateRoot('/login');
            }
          });
        });
      });
    });
  }
  // redireciona para tela de editar perfil
  editar() {
    this.navCtrl.navigateRoot('/editar-perfil');
  }
  // deleta usuario
  deletar() {
    this.storage.set('idusuario', "");
    this.storage.set('nomeusuario', "");
    this.storage.set('cpf', "");
    this.storage.set('telefone', "");
    this.storage.set('email', "");
    // toast com desculpas para o usuario deletado e redireciona para tela de login
    this.presentToastDeleteAcount()
    this.navCtrl.navigateRoot('/login');
  }
  // funcao sair
  sair() {
    // seta todas as variaveis do storage para vazio e redireciona para tela de login
    this.storage.set('idusuario', "");
    this.storage.set('nomeusuario', "");
    this.storage.set('cpf', "");
    this.storage.set('telefone', "");
    this.storage.set('email', "");
    this.navCtrl.navigateRoot('/login');
  }
  // ***** fim perfil
}
