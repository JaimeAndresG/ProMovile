import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
usuario: any = {};
usuarios: any[]= [];
  constructor(private activateRoute: ActivatedRoute, private router: Router, private usuarioService: UsuarioService, private fireService: FirebaseService) { }

  ngOnInit() {
    this.usuario =this.router.getCurrentNavigation().extras.state.usuario;
    this.listarFireUsuarios();

  }
  listarFireUsuarios(){
    this.fireService.getDatos('usuarios').subscribe(
      (data:any) => {
        this.usuarios = [];
        for(let u of data){
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.usuarios.push(usuarioJson);
        /*   if(this.usuario.rut == usuarioJson.rut && usuarioJson.is_logged == false){
            //redireccionar hacia el login.
            this.router.navigate(['/login']);
          }  */
        }
     
      }
    );
  
  }

}
