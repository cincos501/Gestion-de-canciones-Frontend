import React from 'react';
import type { Cancion } from '../../types/modelos';

interface Props {
  canciones: Cancion[];
  onEdit: (cancion: Cancion) => void;
  onDelete: (id: number) => void;
}

const TablaCanciones: React.FC<Props> = ({ canciones, onEdit, onDelete }) => {
  return (
    <div className="table-responsive mt-3">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Duración</th>
            <th>Género</th>
            <th>Artista</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {canciones.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted">No se encontraron canciones.</td>
            </tr>
          ) : (
            canciones.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.titulo}</td>
                <td>{c.duracion} min</td>
                <td>{c.genero}</td>
                <td>{c.artista.nombre}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(c)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaCanciones;
