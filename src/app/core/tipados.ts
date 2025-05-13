export type Usuario = {
    nombre:string,
    apellidos:string,
    telefono:string,
    dni:string,
    email:string,
    calle:string,
    contrasena:string,
    esAdmin:boolean
}

export type MenuItem = {
  id:number,
  icon:string,
  name:string,
  ruta:string,
  admin:boolean
}

export type LugarInteres =  {
  id: number
  lugar: string
  longitud: number
  latitud: number
  informacion: string
  img: string
  direccion: string
  telefono: string
  valoracion: number
}

export type Info = {
  codigo:string,
  descripcion:string,
  img:string,
  titulo:string
}

export type Actividad = {
  codigo:string,
  asistentes:string[],
  descripcion:string,
  editando:boolean,
  reservable:boolean,
  titulo:string,
  tipo:string,
  img:string,
  fecha:string
}
