export type Usuario = {
    nombre:string,
    apellidos:string,
    telefono:string,
    dni:string,
    correo:string,
    direccion:string,
    contrasena:string
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
  lon: number
  lat: number
  informacion: string
  img: string
  direccion: string
  telefono: string
  valoracion: number
}
