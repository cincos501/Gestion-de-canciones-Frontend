import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { artistasData, cancionesData } from '../data/datosCanciones';
import type { Artista, Cancion } from '../types/modelos';
import FiltrosBusqueda from './Canciones/FiltrosBusqueda';
import ModalFormulario from './Canciones/ModalFormulario';
import TablaCanciones from './Canciones/TablaCanciones';
import Notificacion from './Canciones/Notificacion';

const GestionCanciones: React.FC = () => {
  const [canciones, setCanciones] = useState<Cancion[]>(cancionesData);
  const [artistas] = useState<Artista[]>(artistasData);
  const [cancionesFiltradas, setCancionesFiltradas] = useState<Cancion[]>(cancionesData);
  const [busqueda, setBusqueda] = useState('');
  const [generoFiltro, setGeneroFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [cancionEditar, setCancionEditar] = useState<Cancion | null>(null);
  const [notificacion, setNotificacion] = useState({
    mensaje: '', tipo: 'success' as 'success' | 'error', show: false
  });

  useEffect(() => {
    let resultado = canciones;
    if (busqueda) {
      resultado = resultado.filter(c =>
        c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.artista.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    if (generoFiltro) {
      resultado = resultado.filter(c => c.genero === generoFiltro);
    }
    setCancionesFiltradas(resultado);
  }, [canciones, busqueda, generoFiltro]);

  const mostrarNotificacion = (mensaje: string, tipo: 'success' | 'error') =>
    setNotificacion({ mensaje, tipo, show: true });

  const handleSave = (nuevaCancion: Omit<Cancion, 'id' | 'artista'> & { artistaId: number }) => {
    const artista = artistas.find(a => a.id === nuevaCancion.artistaId);
    if (!artista) return;
    if (cancionEditar) {
      setCanciones(prev =>
        prev.map(c =>
          c.id === cancionEditar.id
            ? { ...c, ...nuevaCancion, artista }
            : c
        )
      );
      mostrarNotificacion('Canción actualizada exitosamente', 'success');
    } else {
      const nueva: Cancion = {
        id: Math.max(...canciones.map(c => c.id)) + 1,
        ...nuevaCancion,
        artista
      };
      setCanciones(prev => [...prev, nueva]);
      mostrarNotificacion('Canción registrada exitosamente', 'success');
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta canción?')) {
      setCanciones(prev => prev.filter(c => c.id !== id));
      mostrarNotificacion('Canción eliminada exitosamente', 'success');
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Gestión de Canciones</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Nueva Canción</button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <FiltrosBusqueda
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          generoFiltro={generoFiltro}
          setGeneroFiltro={setGeneroFiltro}
        />

        <small className="text-muted">
          Mostrando {cancionesFiltradas.length} de {canciones.length} canciones
        </small>

        <TablaCanciones canciones={cancionesFiltradas} onEdit={c => { setCancionEditar(c); setShowModal(true); }} onDelete={handleDelete} />
      </div>

      <ModalFormulario
        show={showModal}
        onHide={() => { setShowModal(false); setCancionEditar(null); }}
        cancion={cancionEditar}
        onSave={handleSave}
        artistas={artistas}
      />

      <Notificacion
        mensaje={notificacion.mensaje}
        tipo={notificacion.tipo}
        show={notificacion.show}
        onClose={() => setNotificacion(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default GestionCanciones;
