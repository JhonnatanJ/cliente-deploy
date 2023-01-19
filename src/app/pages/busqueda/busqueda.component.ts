import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../../home/header/header.component';
import { Libro, Content } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit, OnDestroy {

  pagina: number = 0;
  libros!: Libro;
  termino: string = '';
  terminoSubscription: Subscription | undefined;

  sinResultados: boolean = false;

  constructor(
    private libroService: LibroService
  ) { }

  ngOnInit(): void {    
    this.terminoSubscription = this.libroService.busqueda$.subscribe(
      (termino) => {
        this.termino = termino;
        if(this.termino.length>=3 && termino.indexOf('   ')===-1){
          this.sinResultados = false;
          this.busquedaTitulo();
        }        
      },
      (err) =>{
        console.log('error Término');
        this.sinResultados=true;
        this.termino = '';
      }      
    );    
  }

  ngOnDestroy(): void {
      this.libroService.busqueda$.emit('');
      this.terminoSubscription?.unsubscribe;
  }

  busquedaTitulo(){
    this.libroService.buscarLibrosPorTitulo(this.termino, this.pagina)
      .subscribe((libros) => {
        this.libros = libros;
        if(this.libros.content.length < 1 && this.termino != ''){
          console.log('error');
          this.sinResultados = true;
          this.libros.content = [];
        }
      }, 
      (err) =>{
        console.log('error');
        this.sinResultados = true;
        this.libros.content = [];
      });        
  }

  cambiarPagina(num: number){
    this.pagina = this.pagina+num;
    this.busquedaTitulo();
  }

}
