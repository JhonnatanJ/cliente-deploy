import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { ClienteVenta, Content } from '../../interfaces/libro.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Validaciones } from 'src/app/utils/Validaciones';
import { Reserva, Libro, DetalleReserva } from '../../interfaces/reserva.interface';
import { CompraService } from '../../services/compra.service';
import { switchAll } from 'rxjs';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  //VARIABLES PARA CONTROL DE CIUDADES CAPITALES
  capitales: string[] = ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Guaranda', 'Azogues', 
                         'Tulcán', 'Tulcan', 'Latacunga', 'Machala', 'Esmeraldas', 'Guayaquil', 
                         'Ibarra', 'Loja', 'Babahoyo', 'Portoviejo', 'Macas', 'Tena', 'Francisco de Orellana',
                         'Puyo', 'Santa Elena', 'Santo Domingo', 'Nueva Loja', 'Ambato', 'Zamora'];
  //VARIABLES PARA CONTROL DE VISTAS
  paso1Completo: boolean = false;
  paso2Completo: boolean = false;
  envio: boolean = false;

  carrito: boolean = false;
  
  //VARIABLES PARA MANEJO DE DATOS DE LIBROS
  listaCompra: string[] = []; 
  libros: Content[] = [];
  cantidad: number[] = [];
  subtotal: number[] = [];
  total: number = 0;
  totalEnvio: number = 0;

 //VARIABLES PARA FORMULARIO
  inputCantidad: boolean = true;

  datosCliente: ClienteVenta = {nombres:"", apellidos :"" ,cedula:"", celular:"", ciudad :"", direccion:""};
  datos: string[] = [];
  formCliente = new FormGroup({});
  formEnvio = new FormGroup({});
  
  constructor(
    private router:Router,
    private libroService: LibroService,
    private compraService: CompraService,
  ) {  }

  ngOnInit(): void {  
    if(JSON.parse(sessionStorage.getItem("cantidad")!) != null){
      this.cantidad = JSON.parse(sessionStorage.getItem("cantidad")!);
    }
    try{
      this.agregarCompras(); 
      this.carrito = true;
    }
    catch{
      this.carrito = false;
    }
    this.initForm();
  }
//-------------------------------------------------- FUNCIONES PARA COMPRAS - PASO 1
  agregarCompras(){
    let i: number = 0;
    this.listaCompra = JSON.parse(sessionStorage.getItem("listaCompra")!);
    this.listaCompra.forEach(isbn => {     
      this.libroService.buscarLibroIsbn(isbn)
        .subscribe(libro =>{          
          this.libros.push(libro);
          if(JSON.parse(sessionStorage.getItem("cantidad")!) == null || this.libros.length > this.cantidad.length){
            this.cantidad.push(1);
            sessionStorage.setItem("cantidad",JSON.stringify(this.cantidad));
          }          
          this.subtotal.push(this.cantidad[i]*libro.precioUnitario); 
          this.total = this.sumar();   
          i++; 
        })
    });
  }

  recalcular(cantidad: number, indice: number){
    if(cantidad < 1 || cantidad > this.libros[indice].stock || cantidad == null){
      this.inputCantidad = false;
    }
    else{
      this.inputCantidad = true;
      this.cantidad[indice] = cantidad;
    sessionStorage.setItem("cantidad",JSON.stringify(this.cantidad));
    this.subtotal[indice] = this.libros[indice].precioUnitario * this.cantidad[indice];
    console.log(this.subtotal)
    this.sumar();
    }    
  }

  sumar():number{    
    return this.total = this.subtotal.reduce((a, b) => a + b, 0);
  }

  borrar(indice: number){
    this.libros.splice(indice, 1);
    this.listaCompra.splice(indice,1);    
    sessionStorage.setItem("listaCompra",JSON.stringify(this.listaCompra));
    this.cantidad.splice(indice,1);
    sessionStorage.setItem("cantidad",JSON.stringify(this.cantidad));
    this.subtotal.splice(indice,1);
    this.total = this.sumar();
    if(this.listaCompra.length == 0){
      this.carrito = false;
    }
  }

  compraAceptada(){
    this.paso1Completo = true;
  }

  enviarDatos(){
    //CREAR RESERVA PARA ENVÍO A BD
    //datos de reserva
    let reserva: Reserva = {
      abono:0,
      cuenta:{idCuenta:1},
      usuario:{
        ci:this.datosCliente.cedula,
        nombres:this.datosCliente.nombres,
        apellidos:this.datosCliente.apellidos,
        telefono:this.datosCliente.celular,
      },
      detalleReservas:[],
    }
        
    let mensaje: string = "";
    mensaje = "♢CLIENTE"+"\n" + "Nombre:" + this.datosCliente.nombres+" "+this.datosCliente.apellidos+ "\n"+ 
                    "Cedula:"+ this.datosCliente.cedula+ "\n"+ "Celular:"+ this.datosCliente.celular+ "\n\n"+
                    "➸ENVIO"+"\n" + "Ciudad:"+this.datosCliente.ciudad+ "\n"+ "Dirección:"+ this.datosCliente.direccion+ "\n\n"+
                    "▤ LIBROS"+"\n";
    let i=0;
    for(let libro of this.libros){
      let dato = "||| libro: " + libro.isbn + "\n" + "cantidad: " + this.cantidad[i]+ "\n" +"titulo: " + libro.titulo + "\n" + 
                  "subtotal: $" + (libro.precioUnitario*this.cantidad[i]).toFixed(2) + "\n\n";
      mensaje += dato;

      //detalleReservas para envío a BD
      let detalleReserva: DetalleReserva = {
        cantidad:this.cantidad[i],
        libro:libro,
      }
      reserva.detalleReservas.push(detalleReserva);
      i +=1;
    }
    this.compraService.create(reserva).subscribe( resp =>{
      alert("COMPRA REGISTRADA");
    })
    if(this.envio){
      mensaje += "\t"+"$$$   TOTAL+ENVIO: $" + this.totalEnvio.toFixed(2);
    }else{
       mensaje += "\t"+"$$$   TOTAL: $" + this.total.toFixed(2);
    }   
    let urlMensaje = encodeURIComponent(mensaje);
        let url = 'https://wa.me/593985318085?text='+urlMensaje;
    this.listaCompra = []; 
    this.libros = [];
    this.cantidad = [];
    this.subtotal = [];
    this.total = 0;
    this.totalEnvio = 0;
    sessionStorage.clear();
    this.router.navigate(['']);    
    window.open(url, '_blank');
  }

  //-------------------------------------------------------- FUNCIONES PARA FORMULARIO - PASO 2

  mostrarLibros(){
    this.paso1Completo = false;
    this.paso2Completo = false;
  }
  agregarEnvio(){
    this.envio = true;
    this.initEnvioForm();
    this.calcularEnvio();

  }

  quitarEnvio(){
    this.envio = false;
    this.formEnvio = new FormGroup({});
    this.totalEnvio = this.total;
  }

  calcularEnvio(){
    if(this.formEnvio.get('ciudad')?.value != ''){
      this.totalEnvio = this.total;     
      let auxCiudad = this.capitalizada(this.formEnvio.get('ciudad')?.value);

      if(auxCiudad == 'Riobamba'){
        this.totalEnvio = this.totalEnvio + 2.00;
      }
      else{
        if(this.capitales.includes(auxCiudad)){
          this.totalEnvio = this.totalEnvio + 4.50;
        }
        else{
          this.totalEnvio = this.totalEnvio + 5;
        }
    }
    }
    else{
      this.totalEnvio = this.total;
    }
  }

  capitalizada = (texto: string) =>{

    let palabras = [];
 
    for(let palabra of texto.split(" ")){
     palabras.push(palabra[0].toUpperCase() + palabra.substring(1))
    }
    
    return palabras.join(" ")
 }

  //------------------------------------------------------ FORMULARIO -----------------------------------

  initForm(){
    this.formCliente = new FormGroup({
      nombres: new FormControl('',[Validators.required, Validators.maxLength(35), Validators.pattern("[a-zA-Z' ']+")]),
      apellidos: new FormControl('', [Validators.required, Validators.maxLength(35), Validators.pattern("[a-zA-Z' ']+")]),
      cedula: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[z0-9]+"), Validaciones.cedulaValida]),
      celular: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[z0-9]+")]),
    }) 
  }  

  get nombresControl(): FormControl{return this.formCliente.get('nombres') as FormControl;}
  get apellidosControl(): FormControl{return this.formCliente.get('apellidos') as FormControl;}
  get cedulaControl(): FormControl{return this.formCliente.get('cedula') as FormControl;}
  get celularControl(): FormControl{return this.formCliente.get('celular') as FormControl;}

  initEnvioForm(){
    this.formEnvio = new FormGroup({
      ciudad: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("[a-zA-Z' ']+")]),
      direccion: new FormControl('',[Validators.required, Validators.maxLength(100)]),
    })
  }

  get ciudadControl(): FormControl{return this.formEnvio.get('ciudad') as FormControl;}
  get direccionControl(): FormControl{ return this.formEnvio.get('direccion') as FormControl;}


  onSubmit(){
    if(this.formCliente.invalid){
      return;
    }
    else{   
      this.datosCliente.nombres = this.formCliente.get('nombres')?.value;
      this.datosCliente.apellidos = this.formCliente.get('apellidos')?.value;
      this.datosCliente.cedula = this.formCliente.get('cedula')?.value;
      this.datosCliente.celular = this.formCliente.get('celular')?.value;
      if(this.envio){
        this.datosCliente.ciudad = this.capitalizada(this.formEnvio.get('ciudad')?.value);
        this.datosCliente.direccion = this.formEnvio.get('direccion')?.value;
      }
      else{
        this.datosCliente.ciudad = "Riobamba";
        this.datosCliente.direccion = "Retiro en local";
      }
      
    }
    
  }
}
