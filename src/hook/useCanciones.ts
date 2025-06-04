import { useEffect, useState } from "react";
import type { Cancion } from "../types/modelos";
import {
  getCanciones,
  getCancion,
  postCancion,
  putCancion,
  deleteCancion
} from "../services/cancionService";

export function useCanciones() {
  const [canciones, setCanciones] = useState<Cancion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCanciones = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCanciones();
      setCanciones(response.data);
    } catch (err) {
      setError("Error al cargar las canciones.");
    } finally {
      setLoading(false);
    }
  };

  const createCancion = async (nueva: Omit<Cancion, "id" | "artista"> & { artistaId: number }) => {
    try {
      const response = await postCancion(nueva);
      setCanciones([...canciones, response.data]);
    } catch (err) {
      setError("Error al crear la canción.");
    }
  };

  const updateCancion = async (
    id: number,
    actualizada: Omit<Cancion, "id" | "artista"> & { artistaId: number }
  ) => {
    try {
      await putCancion(id, actualizada);
      await fetchCanciones();
    } catch (err) {
      setError("Error al actualizar la canción.");
    }
  };

  const removeCancion = async (id: number) => {
    try {
      await deleteCancion(id);
      setCanciones(canciones.filter(c => c.id !== id));
    } catch (err) {
      setError("Error al eliminar la canción.");
    }
  };

  useEffect(() => {
    fetchCanciones();
  }, []);

  return {
    canciones,
    loading,
    error,
    fetchCanciones,
    createCancion,
    updateCancion,
    removeCancion
  };
}
