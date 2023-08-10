import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //vamos a crear las variables necesarias:

  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  personas: any[] = [];
  KEY_PERSONAS = 'personas';
  
  usuarioLogin : any;
  usuarios : any [] = [];
  isAuthenticated = new BehaviorSubject(false);
  is_logged: boolean =false;
  
  constructor(private alertController: AlertController,
     private router: Router, 
     private activateRoute: ActivatedRoute,
     private storage: StorageService,
     private fireService : FirebaseService) { }

  async ngOnInit() {
    var admin = {
      rut: '19.220.838-6',
      nom: 'Jaime',
      ape:'Gonzalez',
      correo: 'administrador@duoc.cl',
      semestre: '',
      fecha_nac: '1990-03-24',
      clave: 'admin123',
      tipo_usuario: 'administrador'
    };
    var docente = {
      rut: '8.481.156-4',
      nom: 'Sam',
      ape:'uuuuh',
      correo: 'dean@duocuc.cl',
      semestre: '',
      fecha_nac: '1990-03-24',
      clave: 'dean123',
      tipo_usuario: 'docente'
    };
    var alumno = {
      rut: '20.969.880-3',
      nom: 'Benjita',
      ape:'Queupil',
      correo: 'benja@duocuc.cl',
      semestre: '4',
      fecha_nac: '1990-03-24',
      clave: 'benja123',
      tipo_usuario: 'alumno'
    };
    await this.storage.agregar('personas', admin);
    await this.storage.agregar('personas', docente);
    await this.storage.agregar('personas', alumno);
    await this.cargarPersonas();
    this.listarUsuarios();

    }

  async cargarPersonas(){
    this.personas = await this.storage.getDatos(this.KEY_PERSONAS);
  }


  //método para ingresar a home:
/* async login(){
  
  var correoValidar = this.usuario.controls.correo.value;
  var claveValidar = this.usuario.controls.clave.value;
    
  var usuarioLogin = await this.storage.validarCorreoPass(correoValidar, claveValidar);
    //validar que ingrese los distintos tipos de usuarios
    if (usuarioLogin != undefined) {
     
      //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLogin
        }
      };

      //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
      
      this.router.navigate(['/tabs/perfil/'+usuarioLogin.rut], navigationExtras);

    } else {
      this.alertaNovalido();
    }
}    */

  //Alertas
  async alertaNovalido() {
    const alert = await this.alertController.create({
      subHeader: 'Importante Usuario!',
      message: 'Correo o Contraseña Incorrectos',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ///---------------------LOGIN FIREBASE--------------------------------------------------------------

  listarUsuarios(){
    this.fireService.getDatos('usuarios').subscribe(
      (data:any) => {
        this.usuarios = [];
        for(let u of data){
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.usuarios.push(usuarioJson);
        }
        /* console.log(this.usuarios) */
      }
    );
  
  }
  getAuth(){
    return this.isAuthenticated.value;
  }
  loginFire(){
    let correoValidar = this.usuario.controls.correo.value;
    let claveValidar = this.usuario.controls.clave.value;    
    let usuarioLogin = this.usuarios.find(u => u.correo == correoValidar && u.clave == claveValidar);
    
    if (usuarioLogin != undefined) {
      usuarioLogin.is_logged = true;
      this.fireService.actualizarLogin(usuarioLogin.id, usuarioLogin); 
      this.isAuthenticated.next(true)

      //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLogin
        }
      };
      


      //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
      this.router.navigate(['/tabs/perfil/'+usuarioLogin.rut], navigationExtras);
      
    } else {
      //this.alertaNovalido();
    }
  }
  
}
