import React from 'react';
import { generosMusicales } from '../../data/datosCanciones';

interface Props {
  busqueda: string;
  setBusqueda: (value: string) => void;
  generoFiltro: string;
  setGeneroFiltro: (value: string) => void;
}

const FiltrosBusqueda: React.FC<Props> = ({
  busqueda,
  setBusqueda,
  generoFiltro,
  setGeneroFiltro
}) => {
  return (
    <div className="row mb-3">
      <div className="col-md-6 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título o artista"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          value={generoFiltro}
          onChange={(e) => setGeneroFiltro(e.target.value)}
        >
          <option value="">Todos los géneros</option>
          {generosMusicales.map((genero) => (
            <option key={genero} value={genero}>{genero}</option>
          ))}
        </select>
      </div>
      <div className="col-md-2">
        <button className="btn btn-outline-secondary w-100" onClick={() => {
          setBusqueda('');
          setGeneroFiltro('');
        }}>
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default FiltrosBusqueda;
