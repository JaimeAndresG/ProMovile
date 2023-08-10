import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {


  KEY_ASIGNATURA = 'asignatura';
  asignaturas: any[] = [];
  asignatura : any;

  KEY_ASISTENCIA = 'asistencia';
  datos: any[] = [];
  dato : any;

  rut:string;
  usuario: any;
  usuarioLogin: any;
  cod_asistencia:any;
  asistencia: any; 
  codigo: any;

  asistencias: any[] =[];
  isAuthenticated = new BehaviorSubject(false);
constructor(private storage:StorageService, 
  private router: Router,
  private activateRoute: ActivatedRoute,
  private fireService: FirebaseService) { }

 ngOnInit(){
  this.rut = this.activateRoute.snapshot.paramMap.get('rut');
 //this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  //await this.cargarAsistencia();
  this.listarAsistencia();
 
  }
async cargarAsistencia(){
  this.asistencias = await this.storage.getDatoAsistencia(this.KEY_ASISTENCIA);
}

async presente(){
  /* var asistencia = this.asistencias.find(a => a.cod_asistencia == this.codigo)
  console.log(asistencia)
 var alumno = asistencia.alumnos.push(this.rut)
  console.log(alumno)
 */
  let indice = this.asistencias.findIndex(a => a.cod_asistencia == this.codigo);
  this.asistencias[indice].alumnos.push(this.rut);
  alert('Quedaste presente!')
  /* console.log(this.asistencias) */
  await this.storage.actualizarAsistencias(this.KEY_ASISTENCIA, this.asistencias);
}


///---------------------------------METODO FIREBASE-----------------------------------------

listarAsistencia(){
  this.fireService.getDatos('asistencias').subscribe(
    (data:any) => {
      this.asistencias = [];
      for(let u of data){
        let asignaturaJson = u.payload.doc.data();
        asignaturaJson['id'] = u.payload.doc.id;
        this.asistencias.push(asignaturaJson);
      }
      
     }
  );
}
presenteFire(){ 

  let docRef = this.asistencias.find(a => a.cod_asistencia == this.codigo);  
  docRef.alumnos.push(this.rut);
  console.log(docRef)
  this.fireService.actualizarAsisFire(docRef.id, docRef);  
  alert('Quedaste presente!')
}
logout(){
  this.isAuthenticated.next(false);
  this.router.navigate(['/login']);
  }

}
 

