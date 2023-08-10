import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  //Variable Para recuperar contraseña
  correo: string;
  isAuthenticated = new BehaviorSubject(false);
  constructor(private router: Router, private usuarioService: UsuarioService , private alertController: AlertController, private fireService: FirebaseService) { }

  ngOnInit() {
  }

  //Recuperar Contraseña
  recuperar(){
    var usuarioRecu = this.fireService.validarRecuperarPass(this.correo);

    //validar 
    if (usuarioRecu != undefined) {
      this.alertaRecuperarValid();
    }else{
      this.alertaRecuperarNovalid();
    }
  }

  

  async alertaRecuperarValid() {
    const alert = await this.alertController.create({
      header: 'Check Your Email!',
      subHeader: 'Correo Enviado Exitosamente !',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaRecuperarNovalid() {
    const alert = await this.alertController.create({
      header: 'Importante!!',
      subHeader: 'Debes Ingresar Un Correo Valido !',
      buttons: ['OK'],
    });

    await alert.present();
  }
logout(){
  this.isAuthenticated.next(false);
  this.router.navigate(['/login']);
  }
  

}
