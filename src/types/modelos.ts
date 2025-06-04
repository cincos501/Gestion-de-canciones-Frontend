export interface Artista {
  id: number;
  nombre: string;
  nacionalidad: string;
  fechaNacimiento: string; 
}

export interface Cancion {
  id: number;
  titulo: string;
  duracion: number;
  genero: string;
  artista: Artista;
}

