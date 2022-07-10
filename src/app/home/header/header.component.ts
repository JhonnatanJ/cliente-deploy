import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { Libro, Genero } from '../../interfaces/libro.interface';

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

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
  }

  buscar(){    
    this.hayError = false;
    console.log(this.termino);
    
    this.libroService.buscarLibro(this.termino)
      .subscribe((libros) => {
        this.libros = libros;  
        console.log(libros);

      }, (err) => {
          this.hayError = true;
          this.libros = [];
      })

  }

}
