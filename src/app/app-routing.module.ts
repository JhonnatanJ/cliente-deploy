import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './home/body/body.component';
import { CompraComponent } from './pages/compra/compra.component';
import { GenerosComponent } from './pages/generos/generos.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';

const routes: Routes = [
    {
        path: '',
        component: BodyComponent,
        pathMatch: 'full'
    },
    {
        path: 'compras',
        component: CompraComponent
    },
    {
        path: 'generos',
        component: GenerosComponent
    },
    {
        path: 'novedades',
        component: NovedadesComponent
    },
    {
        path: 'contacto',
        component: ContactoComponent
    },
    {
        path: 'empresa',
        component: EmpresaComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}