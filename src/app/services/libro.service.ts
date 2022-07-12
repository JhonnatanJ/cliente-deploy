import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiUrl = 'http://localhost:8088/geolib/libros';

  constructor(private http: HttpClient) { }

  buscarLibro( termino: string ): Observable<Libro[]> {

    const url = `${this.apiUrl}/nombre/${termino}`;

    return this.http.get<Libro[]>(url);

  }

  buscarNovedades(): Observable<Libro> {
    const url = `${this.apiUrl}/paged?page=0&size=8&sort=fechaRegistro,desc`;
    return this.http.get<Libro>(url);
  }

  buscarNovedadesPaged(pagina:number): Observable<Libro> {
    const url= `${this.apiUrl}/paged?page=${pagina}&size=8&sort=fechaRegistro,desc`;
    return this.http.get<Libro>(url);
  }

  buscarRecomendados(): Observable<Libro> {
    const url = `${this.apiUrl}/paged?page=0&size=8&sort=fechaRegistro,asc`;
    return this.http.get<Libro>(url);
  }
}
