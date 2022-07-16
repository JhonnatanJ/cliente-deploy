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
  hayError:boolean = false;


  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.PagedNovedades();
  }

  PagedNovedades(){
    this.hayError=false;
    this.libroService.buscarNovedadesPaged(this.pagina)
      .subscribe((libros) => {
        this.libros = libros;
      }, (err) => {
        this.hayError = true;
      })
  }

  cambiarPagina(num: number){
    this.pagina = this.pagina+num;
    this.PagedNovedades();
  }

}
