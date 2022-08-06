export interface Libro {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    number:           number;
    size:             number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Content {
    titulo:         string;
    descripcion:    string;
    stock:          number;
    precioUnitario: number;
    fechaRegistro:  Date;
    autores:        Autore[];
    generos:        Genero[];
    editoriales:    Editoriale[];
    cuenta:         Cuenta;
    imagen:         Imagen;
    isbn:           string;
}

export interface Autore {
    idAutor: number;
    nombre:  string;
}

export interface Cuenta {
    idCuenta:      number;
    email:         string;
    contrasena:    string;
    enabled:       boolean;
    fechaCreacion: Date;
    usuario:       Usuario;
    roles:         Role[];
}

export interface Role {
    idRol:  number;
    nombre: string;
}

export interface Usuario {
    ci:        string;
    nombres:   string;
    apellidos: string;
    telefono:  string;
}

export interface Editoriale {
    idEditorial: number;
    nombre:      string;
}

export interface Genero {
    idGenero: number;
    nombre:   string;
}

export interface Imagen {
    id:        number;
    nombre:    string;
    imagenUrl: string;
    imagenId:  string;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageSize:   number;
    pageNumber: number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}

export interface ClienteVenta{
    nombres: string;
    apellidos: string;
    cedula: string;
    celular: string;
    ciudad: string;
    direccion: string;
}
