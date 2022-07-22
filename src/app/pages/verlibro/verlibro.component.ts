import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from 'src/app/services/libro.service';
import { switchMap, tap  } from "rxjs/operators";
import { Content} from '../../interfaces/libro.interface';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-verlibro',
  templateUrl: './verlibro.component.html',
  styleUrls: ['./verlibro.component.css']
})
export class VerlibroComponent implements OnInit {

  libro!: Content;

  constructor(
      private activatedRoute: ActivatedRoute,
      private libroService: LibroService,
      private compraService: CompraService
      ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params
      .pipe(
        switchMap(({isbn}) => this.libroService.buscarLibroIsbn(isbn)),
      )
      .subscribe(libro =>{
        this.libro = libro
      });
  }

  agregarCompra(){
      this.compraService.agregarCompra(this.libro.isbn);
    }

}
