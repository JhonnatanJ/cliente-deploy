import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { LibroService } from 'src/app/services/libro.service';
import { Libro, Genero, Content } from '../../interfaces/libro.interface';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  libros: Content[] = [];

  debouncer: Subject<string> = new Subject();

  constructor(
    private libroService: LibroService,
    public compraService: CompraService
    ) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        if(valor.length > 0){
          this.buscar();
        }
        else{
          this.hayError = false;
          this.libros = [];
        }
      })
  }

  buscar(){  
    console.log('desde buscar ' + this.termino) 
    if(this.termino.length>=3){
      this.libroService.buscarLibro(this.termino)
        .subscribe((libros) => {
          this.libros = libros;  
          this.hayError = false;
          if(this.libros.length < 1 && this.termino != ''){
            this.hayError = true;
            this.libros = [];
          }     
        }, (err) =>{
          this.hayError = true;
            this.libros = [];
        });
        
      console.log(this.libros);
      console.log(this.hayError);
    }
  }

  teclaPresionada(){
    this.debouncer.next(this.termino)
  }

  shop(): boolean{
    try{
      let listaCompras = JSON.parse(sessionStorage.getItem("listaCompra")!);
      if(listaCompras.length > 0){
        return true;
        
      }
      else{
        return false
      }
    }
    catch{
      return false;
      
    }
    
  }
}
