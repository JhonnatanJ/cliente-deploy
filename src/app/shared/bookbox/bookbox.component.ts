import { Component, Input, OnInit } from '@angular/core';
import { Autore, Editoriale, Libro } from 'src/app/interfaces/libro.interface';

@Component({
  selector: 'app-bookbox',
  templateUrl: './bookbox.component.html',
  styleUrls: ['./bookbox.component.css']
})
export class BookboxComponent implements OnInit {

  @Input() hayError: boolean = false;
  @Input() libros: Libro[] = [];
  autores: Autore[] = [];
  editoriales: Editoriale[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
