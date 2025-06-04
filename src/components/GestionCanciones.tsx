import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Artista, Cancion } from "../types/modelos";
import FiltrosBusqueda from "./Canciones/FiltrosBusqueda";
import ModalFormulario from "./Canciones/ModalFormulario";
import TablaCanciones from "./Canciones/TablaCanciones";
import Notificacion from "./Canciones/Notificacion";
import { useCanciones } from "../hook/useCanciones";
import { getArtistas } from "../services/artistaService";

const GestionCanciones: React.FC = () => {
  const {
    canciones,
    loading,
    error,
    createCancion,
    updateCancion,
    removeCancion,
    fetchCanciones,
  } = useCanciones();

  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cancionEditar, setCancionEditar] = useState<Cancion | null>(null);
  const [notificacion, setNotificacion] = useState({
    mensaje: "",
    tipo: "success" as "success" | "error",
    show: false,
  });

  const [cancionesFiltradas, setCancionesFiltradas] = useState<Cancion[]>([]);

  useEffect(() => {
    getArtistas()
      .then((res) => setArtistas(res.data))
      .catch(() => mostrarNotificacion("Error al cargar artistas", "error"));
  }, []);

  useEffect(() => {
    let resultado = canciones;
    if (busqueda) {
      resultado = resultado.filter(
        (c) =>
          c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          c.artista.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    if (generoFiltro) {
      resultado = resultado.filter((c) => c.genero === generoFiltro);
    }
    setCancionesFiltradas(resultado);
  }, [canciones, busqueda, generoFiltro]);

  const mostrarNotificacion = (mensaje: string, tipo: "success" | "error") =>
    setNotificacion({ mensaje, tipo, show: true });

  const handleSave = async (
    nuevaCancion: Omit<Cancion, "id" | "artista"> & { artistaId: number }
  ) => {
    try {
      if (cancionEditar) {
        await updateCancion(cancionEditar.id, nuevaCancion);
        mostrarNotificacion("Canción actualizada exitosamente", "success");
      } else {
        await createCancion(nuevaCancion);
        mostrarNotificacion("Canción registrada exitosamente", "success");
      }
      setShowModal(false);
      setCancionEditar(null);
    } catch {
      mostrarNotificacion("Error al guardar la canción", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta canción?")) {
      try {
        await removeCancion(id);
        mostrarNotificacion("Canción eliminada exitosamente", "success");
      } catch {
        mostrarNotificacion("Error al eliminar la canción", "error");
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Gestión de Canciones</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowModal(true);
            setCancionEditar(null);
          }}
        >
          + Nueva Canción
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <FiltrosBusqueda
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          generoFiltro={generoFiltro}
          setGeneroFiltro={setGeneroFiltro}
        />

        {loading ? (
          <p>Cargando canciones...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <>
            <small className="text-muted">
              Mostrando {cancionesFiltradas.length} de {canciones.length} canciones
            </small>

            <TablaCanciones
              canciones={cancionesFiltradas}
              onEdit={(c) => {
                setCancionEditar(c);
                setShowModal(true);
              }}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>

      <ModalFormulario
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setCancionEditar(null);
        }}
        cancion={cancionEditar}
        onSave={handleSave}
        artistas={artistas}
      />

      <Notificacion
        mensaje={notificacion.mensaje}
        tipo={notificacion.tipo}
        show={notificacion.show}
        onClose={() => setNotificacion((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default GestionCanciones;
