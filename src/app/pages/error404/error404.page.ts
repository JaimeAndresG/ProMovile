import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  //Variable Auxiliar:
  
  dataDigimones: any [] = [];
  
  isAuthenticated = new BehaviorSubject(false);
  constructor(private router:Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) { 

    this.apiService.getDatosApi<[]>("").subscribe(data => {
      this.dataDigimones = data
      console.log(this.dataDigimones);

    })


  }

  ngOnInit() {

  }

  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
    }
}
