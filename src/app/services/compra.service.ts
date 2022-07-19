import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  listaCompra!: string[];

  constructor() { 

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

}
