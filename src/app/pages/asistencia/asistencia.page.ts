import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  isAuthenticated = new BehaviorSubject(false);
  constructor(private storage: StorageService,private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
    }
  
  


}
