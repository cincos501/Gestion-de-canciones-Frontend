export interface Artista {
  id: number;
  nombre: string;
  nacionalidad: string;
  fechaNacimiento: string; // ISO string (ej. "1995-12-17T00:00:00")
}

export interface Cancion {
  id: number;
  titulo: string;
  duracion: number;
  genero: string;
  artistaId: number;
  artista: Artista;
}

