import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StorageService } from 'src/app/services/storage.service';


import { v4 } from 'uuid';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  elementType = NgxQrcodeElementTypes.CANVAS;
  value = '';  
  isModalOpen = false;

asistencia = new FormGroup({
  id: new FormControl(''),
  cod_asistencia: new FormControl(''),
  cod_clase: new FormControl(''),
  fecha: new FormControl(new Date()),
  alumnos :new FormControl ([])
  
  });
clases: any[] = [];
codclase: any;

capturaQR= '';
isDisabled : boolean = false;

entregarQR : any;
usuarioLogin : any;

personas: any[] =[];
persona: any;

KEY_ASIGNATURA = 'asignatura';
asignaturas: any[] = [];
asignatura : any;
rut:string;
usuario:any;

KEY_ASISTENCIA = 'asistencia';
isAuthenticated = new BehaviorSubject(false);

//----------------firebase asistencia----------------

asistenciasFire: any [] = [];

constructor(private storage : StorageService,
  private router:Router,
  private route:ActivatedRoute,
  private activateRoute:ActivatedRoute,
  private fireService: FirebaseService) { }

async ngOnInit() {
  this.rut = this.activateRoute.snapshot.paramMap.get('rut');
    
    await this.cargarAsignatura();
    await this.cargarPersonas();
    await this.cargarAsistencia();
    this.listarAsistencia();
    this.listarAsignatura(); 
  }
 //método para generar un código unico para el codigo QR:
 async cargarAsistencia(){
  this.personas = await this.storage.getDatos('asistencia');
}

async cargarAsignatura(){
  this.asignaturas = await this.storage.getDatoAsignaturaProfe(this.KEY_ASIGNATURA, this.rut);
}
async cargarPersonas(){
  this.personas = await this.storage.getDatos('personas');
}

/* async setOpen(isOpen: boolean, sigla) {
  this.isModalOpen = isOpen;
  if (!isOpen) {
    return
  }
  let variableLocalIndice = v4(); 
  this.isDisabled = true; 
  this.value = variableLocalIndice;

  this.asistencia.value.cod_asistencia = this.value;
  this.asistencia.value.cod_clase = sigla;

  var respuesta: boolean = await this.storage.agregarAsistencia(this.KEY_ASISTENCIA, this.asistencia.value);
  console.log(this.asistencia)
  if (respuesta) {
    alert('Asistencia Registrada');
    await this.cargarAsistencia();
  }

} */
////-----------------------------METODO FIREBASE-------------------------------------------------

agregarFire(){
  this.fireService.agregarAsistencia('clases', this.asistencia.value);  
}

async setOpen(isOpen: boolean, sigla) {
  this.isModalOpen = isOpen; 
  let variableLocalIndice = v4(); 
  this.isDisabled = true; 
  this.value = variableLocalIndice;
  this.asistencia.value.cod_asistencia = this.value;
  this.asistencia.value.cod_clase = sigla;

/*   var respuesta: boolean = await this.storage.agregarAsistencia(this.KEY_ASISTENCIA, this.asistencia.value);
 */
  this.fireService.agregar('asistencias', this.asistencia.value);
  alert('ASISTENCIA CREADA!!')
}
setClose(isOpen: boolean) {
  this.isModalOpen = isOpen;
  if (!isOpen) {
    return 
  }
}

listarAsignatura(){
  this.fireService.getDatos('asignaturas').subscribe(
    (data:any) => {
      this.asignaturas = [];
      for(let u of data){
        let asignaturaJson = u.payload.doc.data();
        asignaturaJson['id'] = u.payload.doc.id;
        this.asignaturas.push(asignaturaJson);
      }
    }
  );  
}

listarAsistencia(){
  this.fireService.getDatos('asistencia').subscribe(
    (data:any) => {
      this.asistenciasFire = [];
      for(let u of data){
        let asistenciaJson = u.payload.doc.data();
        asistenciaJson['id'] = u.payload.doc.id;
        this.asistenciasFire.push(asistenciaJson);
      }
    }
  );  
}

logout(){
  this.isAuthenticated.next(false);
  this.router.navigate(['/login']);
  }


}

