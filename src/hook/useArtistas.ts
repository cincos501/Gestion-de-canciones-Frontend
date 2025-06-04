import { useEffect, useState } from "react";
import {
  getArtistas,
  getArtista,
  postArtista,
  putArtista,
  deleteArtista
} from "../services/artistaService";
import type { Artista } from "../types/modelos";

export function useArtistas() {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArtistas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getArtistas();
      setArtistas(response.data);
    } catch (err) {
      setError("Error al cargar los artistas.");
    } finally {
      setLoading(false);
    }
  };

  const createArtista = async (nuevo: Artista) => {
    try {
      const response = await postArtista(nuevo);
      setArtistas([...artistas, response.data]);
    } catch (err) {
      setError("Error al crear el artista.");
    }
  };

  const updateArtista = async (id: number, actualizado: Artista) => {
    try {
      await putArtista(id, actualizado);
      setArtistas(artistas.map(a => (a.id === id ? actualizado : a)));
    } catch (err) {
      setError("Error al actualizar el artista.");
    }
  };

  const removeArtista = async (id: number) => {
    try {
      await deleteArtista(id);
      setArtistas(artistas.filter(a => a.id !== id));
    } catch (err) {
      setError("Error al eliminar el artista.");
    }
  };

  useEffect(() => {
    fetchArtistas();
  }, []);

  return {
    artistas,
    loading,
    error,
    fetchArtistas,
    createArtista,
    updateArtista,
    removeArtista
  };
}
