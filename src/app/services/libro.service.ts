import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero, Libro, Content } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiLibrosUrl = 'http://localhost:8088/geolib/libros';

  private apiGenerosUrl = 'http://localhost:8088/geolib/generos';
  constructor(private http: HttpClient) { }

  buscarLibro( termino: string ): Observable<Libro[]> {

    const url = `${this.apiLibrosUrl}/nombre/${termino}`;

    return this.http.get<Libro[]>(url);

  }
  // ---------------------------------------------- VER LIBRO
  buscarLibroIsbn(isbn: string): Observable<Content>{
    const url = `${this.apiLibrosUrl}/id/${isbn}`;
    return this.http.get<Content>(url);
  }

  //----------------------------------------------- NOVEDADES
  buscarNovedades(): Observable<Libro> {
    const url = `${this.apiLibrosUrl}/paged?page=0&size=8&sort=fechaRegistro,desc`;
    return this.http.get<Libro>(url);
  }

  buscarNovedadesPaged(pagina:number): Observable<Libro> {
    const url= `${this.apiLibrosUrl}/paged?page=${pagina}&size=8&sort=fechaRegistro,desc`;
    return this.http.get<Libro>(url);
  }
//-------------------------------------------------- RECOMENDADOS
  buscarRecomendados(): Observable<Libro> {
    const url = `${this.apiLibrosUrl}/paged?page=0&size=8&sort=fechaRegistro,asc`;
    return this.http.get<Libro>(url);
  }

//-------------------------------------------------- GENEROS

  buscarGeneros(): Observable<Genero[]> {
    const url = `${this.apiGenerosUrl}/`;
    return this.http.get<Genero[]>(url);
  }

  buscarLibrosPorGenero(genero:string, pagina:number): Observable<Libro> {
    const url = `${this.apiLibrosUrl}/paged/genero/${genero}?page=${pagina}&size=8`;
    console.log('servicio' +genero+pagina+ this.http.get<Libro>(url));
    return this.http.get<Libro>(url);

  } 
}

