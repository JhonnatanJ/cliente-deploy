import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { BodyComponent } from './home/body/body.component';
import { FormsModule } from '@angular/forms';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { CompraComponent } from './pages/compra/compra.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { GenerosComponent } from './pages/generos/generos.component';
import { BookboxComponent } from './shared/bookbox/bookbox.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { VerlibroComponent } from './pages/verlibro/verlibro.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    BusquedaComponent,
    CompraComponent,
    NavbarComponent,
    NovedadesComponent,
    ContactoComponent,
    EmpresaComponent,
    GenerosComponent,
    BookboxComponent,
    CarouselComponent,
    VerlibroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
