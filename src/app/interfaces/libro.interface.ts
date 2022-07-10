export interface Libro {
    autores:        Autore[];
    generos:        Genero[];
    editoriales:    Editoriale[];
    cuenta:         Cuenta;
    stock:          string;
    precioUnitario: number;
    descripcion:    string;
    titulo:         string;
    fechaRegistro:  Date;
    isbn:           string;
}

export interface Autore {
    nombre:  string;
    idAutor: number;
}

export interface Cuenta {
    usuario:       Usuario;
    rol:           Rol;
    contrasena:    string;
    fechaCreacion: Date;
    email:         string;
    idCuenta:      number;
}

export interface Rol {
    nombre: string;
    idRol:  number;
}

export interface Usuario {
    ci:        string;
    nombres:   string;
    apellidos: string;
    telefono:  string;
}

export interface Editoriale {
    nombre:      string;
    idEditorial: number;
}

export interface Genero {
    nombre:   string;
    idGenero: number;
}
