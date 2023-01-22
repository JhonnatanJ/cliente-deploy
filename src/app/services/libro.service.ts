import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero, Libro, Content } from '../interfaces/libro.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
//http://localhost:8088 
//private apiLibrosUrl = 'https://api-geomundo.herokuapp.com/geolib/libros';
//private apiGenerosUrl = 'https://api-geomundo.herokuapp.com//generos';
  
  busqueda$ = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  //------------------------------------------------ BUSCAR LIBRO

  buscarLibro( termino: string ): Observable<Content[]> {
    const url = `${environment.apiLibrosUrl}/nombre/${termino}`;
    return this.http.get<Content[]>(url);
  }

  buscarLibroPaged(pagina:number): Observable<Libro> {
    const url= `${environment.apiLibrosUrl}/paged?page=${pagina}&size=8&sort=titulo,desc`;
    return this.http.get<Libro>(url);
  }

  buscarLibrosPorTitulo(titulo:string, pagina:number): Observable<Libro> {
    const url = `${environment.apiLibrosUrl}/paged/titulo/${titulo}?page=${pagina}&size=8`;
    console.log('servicio' +titulo+pagina+ this.http.get<Libro>(url));
    return this.http.get<Libro>(url);
  }
  // ---------------------------------------------- VER LIBRO
  buscarLibroIsbn(isbn: string): Observable<Content>{
    const url = `${environment.apiLibrosUrl}/id/${isbn}`;
    return this.http.get<Content>(url);
  }

  //----------------------------------------------- NOVEDADES
  buscarNovedades(): Observable<Libro> {
    const url = `${environment.apiLibrosUrl}/paged?page=0&size=8&sort=fechaStock,desc`;
    return this.http.get<Libro>(url);
  }

  buscarNovedadesPaged(pagina:number): Observable<Libro> {
    const url= `${environment.apiLibrosUrl}/paged?page=${pagina}&size=8&sort=fechaStock,desc`;
    return this.http.get<Libro>(url);
  }
//-------------------------------------------------- RECOMENDADOS
  buscarRecomendados(): Observable<Libro> {
    const url = `${environment.apiLibrosUrl}/paged?page=0&size=8&sort=fechaStock,asc`;
    return this.http.get<Libro>(url);
  }

//-------------------------------------------------- GENEROS

  buscarGeneros(): Observable<Genero[]> {
    const url = `${environment.apiGenerosUrl}/`;
    return this.http.get<Genero[]>(url);
  }

  buscarLibrosPorGenero(genero:string, pagina:number): Observable<Libro> {
    const url = `${environment.apiLibrosUrl}/paged/genero/${genero}?page=${pagina}&size=8`;
    console.log('servicio' +genero+pagina+ this.http.get<Libro>(url));
    return this.http.get<Libro>(url);
  } 

  // ------------------------------------------------------ COMPRAR
}

