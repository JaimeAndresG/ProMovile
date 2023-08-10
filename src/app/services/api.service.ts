import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //creamos la variable de la libreria de peticiones del tipo HTTP:
  constructor(private http: HttpClient) { }

  getDatosApi<T>(url : string){

    url = 'https://digimon-api.vercel.app/api/digimon'
    return this.http.get<T[]>(url);

  }



}
