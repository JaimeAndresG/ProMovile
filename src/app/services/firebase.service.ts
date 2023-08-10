import { Injectable } from '@angular/core';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  

  datos: any[] = [];
  usuarios: any [] =[];
  isAuthenticated = new BehaviorSubject(false);
  
  constructor(private firebase: AngularFirestore, private router: Router) { }

  //metodos del Crud usuario
  agregar(coleccion, value){

    try {
      this.firebase.collection(coleccion).add(value);
    } catch (error) {
      console.log('ERROR', error)      
    }
  }

  getDatos(coleccion){
    try {
      return this.firebase.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log('ERROR:', error)
      
    }
  }
    //-------------------------------------------
   /* getDatos2(colleccion){
    try {
      this.fire.collection(colleccion).snapshotChanges().subscribe(
        data => {
          this.datos = [];
          for(let d of data){
            this.datos.push(d.payload.doc.data());
          }
        }
      );
    } catch (error) {
      console.log('ERROR: ', error)
    }
  } */

  //--------------------------------------------

  getDato(coleccion, identificador){
    try {
     return this.firebase.collection(coleccion).doc(identificador).get();
    } catch (error) {
      console.log('ERROR: ', error)
      
    }
  }

  eliminar(coleccion, identificador){
    try {
      this.firebase.collection(coleccion).doc(identificador).delete();
    } catch (error) {
      console.log('ERROR', error)    
    }
  }

  modificar(coleccion, identificador, value){
    try {
      this.firebase.collection(coleccion).doc(identificador).set(value);
    } catch (error) {
      console.log('ERROR: ', error)
      
    }
  }

  /////---------------------Asistencia Firebase-------------------------------------------

  agregarAsistencia(coleccion, value){
    try {
      this.firebase.collection(coleccion).add(value);
      
    } catch (error) {
      console.log('ERROR', error)
      
    }
  }

  getDatoAsistenciaFire(identificador){
    try {
     return this.firebase.collection('asistencias').doc(identificador).get();
    } catch (error) {
      console.log('ERROR: ', error)
      
    }
  }
  actualizarAsisFire(id,indice){

    this.firebase.collection('asistencias').doc(id).set(indice);

  }
  
  ////----------------------LOGIN---------------------------------
getAuth(){
    return this.isAuthenticated.value;
  }

logout(){
  /* this.isAuthenticated.next(false); */
  this.router.navigate(['/login']);
  }

getDatosUsuarios(){
    try {
      return this.firebase.collection('usuarios').snapshotChanges();
    } catch (error) {
      console.log('ERROR:', error)
      
    }
  }

  actualizarLogin(id, value){
    this.firebase.collection('usuarios').doc(id).set(value)
  }

  validarRecuperarPass(correo){
    return this.usuarios.find(u => u.correo == correo);
  }

  
}
