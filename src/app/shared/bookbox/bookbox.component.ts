import { Component, Input, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/libro.interface';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-bookbox',
  templateUrl: './bookbox.component.html',
  styleUrls: ['./bookbox.component.css']
})
export class BookboxComponent implements OnInit {

  @Input() libros!: Libro;

  constructor(
    private compraService: CompraService
  ) { }

  ngOnInit(): void {
  }

  agregarCompra(isbn: string){
    this.compraService.agregarCompra(isbn);
  }
}
