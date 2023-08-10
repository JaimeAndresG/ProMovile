import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  perso = new FormGroup({
    id: new FormControl(''),
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[aA-zZ0-9-]+$/)]),
    ape: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^[aA-zZ0-9-]+$/)]),
    correo: new FormControl ('',[Validators.compose([Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc'-'duoc']+(\.cl)$/), Validators.email]),]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl(''),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('',[Validators.required]),
    is_logged: new FormControl(false)
  });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  verificar_password: string;
  today: any;
  personas: any[] = [];
  KEY_PERSONAS = 'personas';

  usuarios: any[] = [];
  standalone = {
    standalone : true
  };

  v_agregar: boolean = false;
  isAuthenticated = new BehaviorSubject(false);
  constructor(private usuarioService: UsuarioService, 
    private router: Router, 
    private alertController: AlertController, 
    private storage: StorageService, 
    private validaciones: ValidacionesService,
    private loadingCtrl:LoadingController,
    private fireService: FirebaseService) {}

 async ngOnInit() {
  await this.listarFire();
  //await this.cargarPersonas();
  this.getDate();
  
  }

  async cargarPersonas(){
    this.personas = await this.storage.getDatos(this.KEY_PERSONAS);  }


  getDate() { const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2); console.log(this.today); }

  //método del formulario
async registrar(){
    //validación de salida para buscar un rut válido.
    if (!this.validaciones.validarRut(this.perso.controls.rut.value)) {
     alert('Rut incorrecto!');
     return;
    }
   //validación de salida para verificar que persona tenga al menos 17 años.
    if (!this.validaciones.validarEdadMinima(17, this.perso.controls.fecha_nac.value)) {
     alert('Edad mínima 17 años!');
     return;
    }
 
    if (this.perso.controls.clave.value != this.verificar_password) {
       this.alertaContra();
       return;
    }
   
    if (this.perso.controls.semestre.value == '' && this.perso.controls.tipo_usuario.value == 'alumno'){
      this.alertaVacia();
      return;

    }

  
    if (this.perso.controls.rut.value == '' && this.perso.controls.tipo_usuario.value == 'alumno'){
      this.alertaVacia();
       return;

    }

  
    var respuesta: boolean = await this.storage.agregar(this.KEY_PERSONAS, this.perso.value);
    if (respuesta) {
      await this.alertaRegistrado();
      await this.cargarPersonas();
       
    }else{
      this.alertaExiste();
    }
  }

  




//// eliminar buscar , moficar , limpiar registro personas
async eliminarPersona(rut){ 
  await this.storage.eliminar(this.KEY_PERSONAS, rut);  
  await this.cargarPersonas();
} 

async buscarPersona(buscarcod){
  var personaEncontrada = await this.storage.getDato(this.KEY_PERSONAS, buscarcod);
  this.perso.setValue(personaEncontrada);
  this.verificar_password = personaEncontrada.clave;
  
}

async modificarPersona(){
  await this.storage.actualizar(this.KEY_PERSONAS, this.perso.value); 
  await this.cargando('Actualizando...');
  await this.limpiarPersona();   
  await this.cargarPersonas();
  
}

limpiarPersona(){   
this.perso.reset();
this.verificar_password = '';
}

  //alert
async alertaContra() {
  const alert = await this.alertController.create({
  header: 'ERROR...!',
  subHeader: 'Contraseñas No Coinciden!',
  buttons: ['OK'],
});

    await alert.present();
    return
  }

async alertaExiste() {
    const alert = await this.alertController.create({
      header: 'Importante!',
      subHeader: 'Usuario Ya existe!',
      buttons: ['OK'],
    });

    await alert.present();
  }

async alertaRegistrado() {
    const alert = await this.alertController.create({
      header: 'Felicidades!',
      subHeader: 'Usuario Registrado',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaVacia() {
    const alert = await this.alertController.create({
      header: 'ERROR!',
      subHeader: 'Falta uno o varios campos',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaRut() {
    const alert = await this.alertController.create({
      header: 'ERROR!',
      subHeader: 'El rut ya existe!',
      buttons: ['OK'],
    });

    await alert.present();
  }

async alertaEliminar(rut) {
    const alert = await this.alertController.create({
    header: 'Atención!',
    subHeader: '¿Estas Seguro de eliminar este usuario?',
    buttons: [
        {
          text: 'NO',
          role: 'NO',
          handler: () => {
            
          },
        },
        {
        text: 'SI',
        role: 'SI',
        handler:  () => {

          this.eliminarPersona(rut)
        
          },
        },
      ],
  });
    
  await alert.present();

  
} 
async cargando(mensaje){
  const loading = await this.loadingCtrl.create({
    message: mensaje,
    duration: 1000
  });
  loading.present();
}


//-------------------------METODO-FIREBASE----------------------

async agregarFire(){
     //validación de salida para buscar un rut válido.
     if (!this.validaciones.validarRut(this.perso.controls.rut.value)) {
      alert('RUT INCORRECTO!');
      return;
    
  }
    //validación de salida para verificar que persona tenga al menos 17 años.
  if (!this.validaciones.validarEdadMinima(17, this.perso.controls.fecha_nac.value)) {
      alert('EDAD MÍNIMA 17 AÑOS!');
      return;
  }
  
  if (this.perso.controls.clave.value != this.verificar_password) {
      this.alertaContra();
      return;
  }

  var usuEncontrado = this.obtenerUsuario(this.perso.value.rut)


  if (usuEncontrado == undefined) {
    this.fireService.agregar('usuarios', this.perso.value);
    alert('Usuario Registrado!!');
    await this.listarFire();
    this.perso.reset();
    this.verificar_password = '';

  }else{
    alert('YA EXISTE ESTE USUARIO !!');

  }

}

agregarOtro(){
  this.fireService.agregar('usuarios', this.perso.value);
  this.v_agregar = true;
    
}

listarFire(){
  this.fireService.getDatos('usuarios').subscribe(
    (data:any) => {
      this.usuarios = [];
      for(let u of data){
        let usuarioJson = u.payload.doc.data();
        usuarioJson['id'] = u.payload.doc.id;
        this.usuarios.push(usuarioJson);
      }
    }
  );

}

obtenerUsuario(rut) {
  return this.usuarios.find(usuario => usuario.rut == rut);
}

  async eliminarFire(id){
  const alert = this.alertController.create({
    header: 'Atención!',
    subHeader: '¿Estás Seguro de eliminar este usuario?',
    buttons: [
        {
          text: 'NO',
          role: 'NO',
          handler: () => {
            
          },
        },
        {
        text: 'SI',
        role: 'SI',
        handler:  () => {

          this.fireService.eliminar('usuarios', id);
        
          },
        },
      ],
  });
    
 (await alert).present();
  
}


buscarFire(id){
  let usuEncontrado = this.fireService.getDato('usuarios', id);
  usuEncontrado.subscribe(
    (response: any) => {
      let usu = response.data();
      usu['id'] = response.id;
      this.perso.setValue( usu );
      this.verificar_password = usu.clave
    }
  );
}

modificarFire(){
  let id = this.perso.controls.id.value;
  let usuModificado = {
    rut: this.perso.controls.rut.value,
    nom: this.perso.controls.nom.value,
    ape: this.perso.controls.ape.value,
    correo: this.perso.controls.correo.value,
    fecha_nac: this.perso.controls.fecha_nac.value,
    semestre: this.perso.controls.semestre.value,
    clave: this.perso.controls.clave.value,
    tipo_usuario: this.perso.controls.tipo_usuario.value
  
  }

  this.fireService.modificar('usuarios', id, usuModificado);
  alert('USUARIO MODIFICADO!!');
  this.perso.reset();

}
logout(){
  this.isAuthenticated.next(false);
  this.router.navigate(['/login']);
  }

   
}



