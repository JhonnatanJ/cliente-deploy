export interface Libro {
    content:          Content[];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    number:           number;
    size:             number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface Content {
    fechaRegistro:  Date;
    autores:        Autore[];
    generos:        Genero[];
    editoriales:    Editoriale[];
    cuenta:         Cuenta;
    isbn:           string;
    precioUnitario: number;
    stock:          number;
    descripcion:    string;
    titulo:         string;
}

export interface Autore {
    nombre:  string;
    idAutor: number;
}

export interface Cuenta {
    usuario:       Usuario;
    rol:           Rol;
    fechaCreacion: Date;
    idCuenta:      number;
    contrasena:    string;
    email:         string;
}

export interface Rol {
    nombre: string;
    idRol:  number;
}

export interface Usuario {
    ci:        string;
    telefono:  string;
    apellidos: string;
    nombres:   string;
}

export interface Editoriale {
    nombre:      string;
    idEditorial: number;
}

export interface Genero {
    nombre:   string;
    idGenero: number;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageSize:   number;
    pageNumber: number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
