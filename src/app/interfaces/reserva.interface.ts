export interface Reserva {
    idReserva?:       number;
    fechaCreacion?:   Date;
    fechaAbono?:      Date;
    valorTotal?:      number;
    abono:           number;
    saldo?:           number;
    cuenta:          Cuenta;
    usuario:         Usuario;
    detalleReservas: DetalleReserva[];
}

export interface Cuenta {
    idCuenta:      number;
    email?:         string;
    contrasena?:    string;
    enabled?:       boolean;
    fechaCreacion?: Date;
    usuario?:       Usuario;
    roles?:         Role[];
}

export interface Role {
    idRol:  number;
    nombre: string;
}

export interface Usuario {
    ci:        string;
    nombres:   string;
    apellidos: string;
    telefono?:  string;
}

export interface DetalleReserva {
    idDetalleReserva?: number;
    cantidad:         number;
    subtotal?:         number;
    libro:            Libro;
}

export interface Libro {
    titulo?:         string;
    descripcion?:    string;
    stock?:          number;
    precioUnitario?: number;
    fechaRegistro?:  Date;
    autores?:        Autores[];
    generos?:        Generos[];
    editoriales?:    Editoriales[];
    cuenta?:         Cuenta;
    imagen?:         Imagen;
    isbn:           string;
}

export interface Autores {
    idAutor: number;
    nombre:  string;
}

export interface Editoriales {
    idEditorial: number;
    nombre:      string;
}

export interface Generos {
    idGenero: number;
    nombre:   string;
}

export interface Imagen {
    id:        number;
    nombre:    string;
    imagenUrl: string;
    imagenId:  string;
}
