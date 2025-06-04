import type { Artista, Cancion } from '../types/modelos';

export const artistasData: Artista[] = [
  { id: 1, nombre: "Juan Pérez", nacionalidad: "Argentina", fechaNacimiento: "1985-03-15" },
  { id: 2, nombre: "María García", nacionalidad: "España", fechaNacimiento: "1990-07-22" },
  { id: 3, nombre: "Carlos Rodríguez", nacionalidad: "México", fechaNacimiento: "1982-11-08" },
  { id: 4, nombre: "Ana Martínez", nacionalidad: "Colombia", fechaNacimiento: "1988-01-30" }
];

export const cancionesData: Cancion[] = [
  { id: 1, titulo: "Melodía del Alma", duracion: 3.5, genero: "Pop", artista: artistasData[0] },
  { id: 2, titulo: "Ritmo Nocturno", duracion: 4.2, genero: "Jazz", artista: artistasData[1] },
  { id: 3, titulo: "Fuego Interior", duracion: 5.1, genero: "Rock", artista: artistasData[2] },
  { id: 4, titulo: "Sueños de Libertad", duracion: 3.8, genero: "Pop", artista: artistasData[3] },
  { id: 5, titulo: "Viento del Sur", duracion: 4.7, genero: "Folk", artista: artistasData[0] }
];

export const generosMusicales = [
  "Rock", "Pop", "Jazz", "Folk", "Blues", "Reggae", "Hip Hop", "Electronic"
];
