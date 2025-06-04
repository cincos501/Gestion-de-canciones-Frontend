import type { Artista } from "../types/modelos";
import api from "./apiServices";

export const getArtistas = () => api.get<Artista[]>("/Artistas");

export const getArtista = (id: number) =>
  api.get<Artista>(`/Artistas/${id}`);

export const postArtista = (artista: Artista) =>
  api.post<Artista>("/Artistas", artista);

export const putArtista = (id: number, artista: Artista) =>
  api.put<Artista>(`/Artistas/${id}`, artista);

export const deleteArtista = (id: number) =>
  api.delete(`/Artistas/${id}`);
