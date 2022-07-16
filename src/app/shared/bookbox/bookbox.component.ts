import { Component, Input, OnInit } from '@angular/core';
import { Autore, Editoriale, Libro } from 'src/app/interfaces/libro.interface';
import { Content } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-bookbox',
  templateUrl: './bookbox.component.html',
  styleUrls: ['./bookbox.component.css']
})
export class BookboxComponent implements OnInit {

  @Input() libros!: Libro;
  contenido: Content[] = [];
  autores: Autore[] = [];
  editoriales: Editoriale[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.libros.content)
  }

}
