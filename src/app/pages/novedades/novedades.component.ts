import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/libro.interface';
import { Content } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  pagina: number = 0;
  libros!: Libro;
  content: Content[] = [];  
  hayError:boolean = false;


  constructor(private LibroService: LibroService) { }

  ngOnInit(): void {
    this.PagedNovedades();
  }

  PagedNovedades(){
    this.hayError=false;
    this.LibroService.buscarNovedadesPaged(this.pagina)
      .subscribe((libros) => {
        this.libros = libros;
        console.log(libros);
      }, (err) => {
        this.hayError = true;
      })
  }

  cambiarPagina(num: number){
    this.pagina = this.pagina+num;
    this.PagedNovedades();
  }

}
