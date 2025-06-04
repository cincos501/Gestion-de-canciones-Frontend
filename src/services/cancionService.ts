import type { Cancion } from "../types/modelos";
import api from "./apiServices";

export const getCanciones = () => api.get<Cancion[]>("/Canciones");

export const getCancion = (id: number) => api.get<Cancion>(`/Canciones/${id}`);

export const postCancion = (cancion: Omit<Cancion, "id" | "artista"> & { artistaId: number }) =>
  api.post<Cancion>("/Canciones", cancion);


export const putCancion = (
  id: number,
  cancion: Omit<Cancion, "id" | "artista"> & { artistaId: number }
) => api.put(`/Canciones/${id}`, cancion);

export const deleteCancion = (id: number) => api.delete(`/Canciones/${id}`);
