import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Content } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  paso1Completo: boolean = false;
  paso2Completo: boolean = false;
  libros: Content[] = [];
  cantidad: number[] = [];
  subtotal: number[] = [];
  total: number = 0;
  listaCompra: string[] = []; 

  constructor(
    private libroService: LibroService,
  ) {  }

  ngOnInit(): void {  
    if(JSON.parse(sessionStorage.getItem("cantidad")!) != null){
      this.cantidad = JSON.parse(sessionStorage.getItem("cantidad")!);
    }
    this.agregarCompras();     
  }

  agregarCompras(){
    this.listaCompra = JSON.parse(sessionStorage.getItem("listaCompra")!);
    this.listaCompra.forEach(isbn => {
      let i: number = 0;
      this.libroService.buscarLibroIsbn(isbn)
        .subscribe(libro =>{          
          this.libros.push(libro);
          if(JSON.parse(sessionStorage.getItem("cantidad")!) == null || this.libros.length > this.cantidad.length){
            this.cantidad.push(1);
            sessionStorage.setItem("cantidad",JSON.stringify(this.cantidad));
          }          
          this.subtotal.push(this.cantidad[i]*libro.precioUnitario); 
          this.total = this.sumar();   
          i++; 
        })
    });
  }

  recalcular(cantidad: number, indice: number){
    this.cantidad[indice] = cantidad;
    sessionStorage.setItem("cantidad",JSON.stringify(this.cantidad));
    this.subtotal[indice] = this.libros[indice].precioUnitario * this.cantidad[indice];
    this.sumar();
  }

  sumar():number{    
    return this.total = this.subtotal.reduce((a, b) => a + b, 0);
  }

  borrar(indice: number){
    this.libros.splice(indice, 1);
    this.listaCompra.splice(indice,1);    
    sessionStorage.setItem("listaCompra",JSON.stringify(this.listaCompra));
    this.cantidad.splice(indice,1);
    sessionStorage.setItem("cantidad",JSON.stringify(this.cantidad));
    this.subtotal.splice(indice,1);
    this.total = this.sumar();
    console.log(this.libros)
  }

  compraAceptada(){
    this.paso1Completo = true;
  }
  mostrarLibros(){
    this.paso1Completo = false;
    this.paso2Completo = false;
  }
}
