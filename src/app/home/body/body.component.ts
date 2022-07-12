import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  novedades: Libro[] = [];
  recomendados: Libro[] = [];
  hayError:boolean = false;

  constructor( private libroService: LibroService) { }

  ngOnInit(): void {
    this.buscarNovedades();
    this.buscarRecomendados();
  }

  buscarNovedades(){
    this.hayError=false;
    this.libroService.buscarNovedades()
      .subscribe((novedades) =>{
        this.novedades = novedades;
        console.log(novedades);
      }, (err) =>{
        this.hayError = true;
        this.novedades = [];
      })
  }

  buscarRecomendados(){
    this.hayError=false;
    this.libroService.buscarRecomendados()
      .subscribe((recomendados) =>{
        this.recomendados = recomendados;
        console.log(recomendados);
      },
      (err)=>{
        this.hayError = true;
        this.recomendados=[];
      })
  }

}
