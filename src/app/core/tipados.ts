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
