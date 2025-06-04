import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { Artista, Cancion } from '../../types/modelos';
import { generosMusicales } from '../../data/datosCanciones';

interface Props {
  show: boolean;
  onHide: () => void;
  cancion: Cancion | null;
  onSave: (cancion: Omit<Cancion, 'id' | 'artista'> & { artistaId: number }) => void;
  artistas: Artista[];
}

const ModalFormulario: React.FC<Props> = ({ show, onHide, cancion, onSave, artistas }) => {
  const [form, setForm] = useState({
    titulo: '',
    duracion: 0,
    genero: '',
    artistaId: 0
  });

  const [errores, setErrores] = useState({
    titulo: '',
    duracion: '',
    genero: '',
    artistaId: ''
  });

  useEffect(() => {
    if (cancion) {
      setForm({
        titulo: cancion.titulo,
        duracion: cancion.duracion,
        genero: cancion.genero,
        artistaId: cancion.artista.id
      });
    } else {
      setForm({ titulo: '', duracion: 0, genero: '', artistaId: 0 });
    }
    setErrores({ titulo: '', duracion: '', genero: '', artistaId: '' });
  }, [cancion]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'duracion' || name === 'artistaId' ? Number(value) : value
    }));
  };

  const validar = () => {
    const nuevosErrores = {
      titulo: '',
      duracion: '',
      genero: '',
      artistaId: ''
    };
    let valido = true;

    if (!form.titulo.trim()) {
      nuevosErrores.titulo = 'No se permiten canciones sin título.';
      valido = false;
    }

    if (form.duracion <= 0) {
      nuevosErrores.duracion = 'La duración debe ser mayor que 0.';
      valido = false;
    }

    if (!form.genero) {
      nuevosErrores.genero = 'Debe seleccionar un género.';
      valido = false;
    }

    if (!form.artistaId) {
      nuevosErrores.artistaId = 'Debe seleccionar un artista.';
      valido = false;
    }

    setErrores(nuevosErrores);
    return valido;
  };

  const handleSubmit = () => {
    if (validar()) {
      onSave({
        ...form,
        duracion: Number(form.duracion),
        artistaId: Number(form.artistaId)
      });
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{cancion ? 'Editar Canción' : 'Nueva Canción'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              isInvalid={!!errores.titulo}
              required
            />
            <Form.Control.Feedback type="invalid">{errores.titulo}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duración (minutos)</Form.Label>
            <Form.Control
              type="number"
              name="duracion"
              value={form.duracion}
              onChange={handleChange}
              isInvalid={!!errores.duracion}
              required
              min={0}
            />
            <Form.Control.Feedback type="invalid">{errores.duracion}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Género</Form.Label>
            <Form.Select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              isInvalid={!!errores.genero}
              required
            >
              <option value="">Seleccione un género</option>
              {generosMusicales.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.genero}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Artista</Form.Label>
            <Form.Select
              name="artistaId"
              value={form.artistaId}
              onChange={handleChange}
              isInvalid={!!errores.artistaId}
              required
            >
              <option value="">Seleccione un artista</option>
              {artistas.map((a) => (
                <option key={a.id} value={a.id}>{a.nombre}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.artistaId}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFormulario;
