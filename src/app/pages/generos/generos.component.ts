import { Component, OnInit } from '@angular/core';
import { Genero, Libro } from 'src/app/interfaces/libro.interface';
import { LibroService } from 'src/app/services/libro.service';
import { Content } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {

  pagina: number = 0;
  genero: string = '';
  libros!: Libro;
  generos: Genero[] = [];
  hayGeneros: boolean = false;
  hayLibros: boolean = false;

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.listarGeneros();
  }

  cambiarPagina(num: number){
    this.pagina = this.pagina+num;
    this.buscarLibros(this.genero);
  }

  listarGeneros(){
    this.hayGeneros = false;
    this.libroService.buscarGeneros()
      .subscribe((generos) => {
        this.generos = generos;
      },
      (err)=>{
        this.hayGeneros = true;
      })
  }

  buscarLibros(genero: string){
    this.libroService.buscarLibrosPorGenero(genero, this.pagina)
      .subscribe((libros) =>{
        this.genero = genero;
        this.libros = libros;
      },
      (err)=>{
        this.hayLibros= true;
      })
  }

}
