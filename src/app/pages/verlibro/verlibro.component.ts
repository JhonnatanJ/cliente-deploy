import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from 'src/app/services/libro.service';
import { switchMap, tap  } from "rxjs/operators";
import { Content} from '../../interfaces/libro.interface';

@Component({
  selector: 'app-verlibro',
  templateUrl: './verlibro.component.html',
  styleUrls: ['./verlibro.component.css']
})
export class VerlibroComponent implements OnInit {

  libro!: Content;


  constructor(
      private activatedRoute: ActivatedRoute,
      private libroService: LibroService
      ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params
      .pipe(
        switchMap(({isbn}) => this.libroService.buscarLibroIsbn(isbn)),
        tap(console.log)
      )
      .subscribe(libro =>{
        this.libro = libro
      });
    
    
    
    // this.activatedRoute.params
    //   .subscribe(({isbn}) =>{
    //     console.log(isbn);

    //     this.libroService.buscarLibroIsbn(isbn)
    //       .subscribe(libro => {
    //         console.log(libro);
    //       });
    //   })
  }

}
