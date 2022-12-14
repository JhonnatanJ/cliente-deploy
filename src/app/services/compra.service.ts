import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

import { Reserva } from '../interfaces/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  listaCompra!: string[];

  private apiReservasUrl = 'http://localhost:8088/geolib/reservas';

  constructor(private http:HttpClient) { 

  }

  agregarCompra(isbn: string){
    try{
      this.actualizarLista();
      if(!this.listaCompra.includes(isbn)){
        this.listaCompra.push(isbn);
        sessionStorage.setItem("listaCompra",JSON.stringify(this.listaCompra));
      }
    }
    catch{
      sessionStorage.setItem("listaCompra",JSON.stringify([]));
      this.actualizarLista();
    }      
    
    if(!this.listaCompra.includes(isbn)){
      this.listaCompra.push(isbn);
      sessionStorage.setItem("listaCompra",JSON.stringify(this.listaCompra));
    }  
    
  }

  actualizarLista(){
    this.listaCompra = JSON.parse( sessionStorage.getItem("listaCompra")!);
  }


  //============================================================ CREACIÓN DE RESERVA
  create(reserva:Reserva):Observable<Reserva>{
    return this.http.post<Reserva>(this.apiReservasUrl,reserva);
   }
}
