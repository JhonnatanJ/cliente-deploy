import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { Libro, Genero } from '../../interfaces/libro.interface';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  libros: Libro[] = [];
  generos: Genero[] = [];

  constructor(
    private libroService: LibroService,
    public compraService: CompraService
    ) { }

  ngOnInit(): void {

  }

  buscar(){    
    this.hayError = false;
    console.log(this.termino);
    
    this.libroService.buscarLibro(this.termino)
      .subscribe((libros) => {
        this.libros = libros;  

      }, (err) => {
          this.hayError = true;
          this.libros = [];
      })
  }

  shop(): boolean{
    try{
      let listaCompras = JSON.parse(sessionStorage.getItem("listaCompra")!);
      if(listaCompras.length > 0){
        console.log(true);
        return true;
        
      }
      else{
        console.log(false);
        return false
      }
    }
    catch{
      return false;
      
    }
    
  }
}
