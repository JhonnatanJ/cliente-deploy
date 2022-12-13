import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { LibroService } from 'src/app/services/libro.service';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  termino: string = '';

  debouncer: Subject<string> = new Subject();

  constructor(
    private libroService: LibroService,
    public compraService: CompraService
    ) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        if(valor.length > 0){
          this.buscar();
        }
      }
      )
  }

  buscar(){  
      this.libroService.busqueda$.emit(this.termino);
  }

  teclaPresionada(){
    this.debouncer.next(this.termino)
  }

  shop(): boolean{
    try{
      let listaCompras = JSON.parse(sessionStorage.getItem("listaCompra")!);
      if(listaCompras.length > 0){
        return true;
        
      }
      else{
        return false
      }
    }
    catch{
      return false;
      
    }
    
  }
}
